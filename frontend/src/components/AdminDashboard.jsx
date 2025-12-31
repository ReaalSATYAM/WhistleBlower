import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  /* ------------ STATE ------------ */
  const [adminDept, setAdminDept] = useState("");
  const [reports, setReports] = useState([]);
  const [activeReport, setActiveReport] = useState(null);

  const [analysisCache, setAnalysisCache] = useState({});
  const [busyFile, setBusyFile] = useState(null);

  /* ------------ HELPERS ------------ */

  const normalizeStatus = (value) =>
    value ? value.toLowerCase() : "pending";

  const detectMediaType = (file) => {
    const suffix = file.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(suffix)) return "image";
    if (["mp4", "webm", "ogg", "mov"].includes(suffix)) return "video";
    if (["mp3", "wav"].includes(suffix)) return "audio";
    return null;
  };

  const extractEvidenceList = (item) => {
    if (!item || !item.evidence) return [];
    return Array.isArray(item.evidence)
      ? item.evidence
      : [item.evidence];
  };

  /* ------------ DATA FETCH ------------ */

  const loadReports = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/reports");
      const payload = await response.json();

      const cleaned = payload.map((entry) => ({
        ...entry,
        status: normalizeStatus(entry.status),
      }));

      setReports(cleaned);
    } catch (error) {
      console.error("Unable to load reports", error);
    }
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("adminRole");
    if (!storedRole) {
      navigate("/admin");
      return;
    }

    setAdminDept(storedRole);
    loadReports();
  }, [navigate]);

  /* ------------ STATUS HANDLING ------------ */

  const updateReportState = async (newState) => {
    if (!activeReport) return;

    const comment = prompt(
      `Add remark for ${newState}:`,
      newState === "Accepted"
        ? "Evidence verified."
        : "Evidence insufficient."
    );

    if (!comment) return;

    try {
      await fetch("http://localhost:5000/api/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId: activeReport.id,
          status: newState,
          note: comment,
        }),
      });

      setActiveReport(null);
      loadReports();
    } catch {
      alert("Status update failed");
    }
  };

  /* ------------ AI ANALYSIS ------------ */

  const runAnalysis = async (fileName) => {
    const category = detectMediaType(fileName);
    if (!category) return alert("Unsupported file format");

    setBusyFile(fileName);

    try {
      const sourceUrl = `http://localhost:5000/uploads/${fileName}`;
      const fileBlob = await fetch(sourceUrl).then((r) => r.blob());

      const payload = new FormData();
      payload.append("file", fileBlob, fileName);
      payload.append("type", category);

      const response = await fetch(
        "http://localhost:5001/check-evidence",
        { method: "POST", body: payload }
      );

      const result = await response.json();

      setAnalysisCache((prev) => ({
        ...prev,
        [fileName]: result.analysis,
      }));
    } catch {
      alert("AI verification failed");
    } finally {
      setBusyFile(null);
    }
  };

  /* ------------ MEDIA RENDER ------------ */

  const renderMedia = (fileName) => {
    const link = `http://localhost:5000/uploads/${fileName}`;
    const extension = fileName.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension))
      return <img src={link} alt="Evidence" className="w-full rounded shadow" />;

    if (["mp4", "webm", "ogg", "mov"].includes(extension))
      return (
        <video controls className="w-full rounded bg-black">
          <source src={link} type={`video/${extension}`} />
        </video>
      );

    if (["mp3", "wav"].includes(extension))
      return <audio controls src={link} className="w-full mt-2" />;

    return (
      <a
        href={link}
        target="_blank"
        rel="noreferrer"
        className="text-blue-700 underline"
      >
        View Document
      </a>
    );
  };

  /* ------------ UI ------------ */

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-blue-900 text-white p-6 flex-col">
        <h1 className="text-2xl font-bold mb-10">Govt. Vigilance</h1>
        <button
          className="mt-auto text-red-300"
          onClick={() => navigate("/admin")}
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-8">
          {adminDept} Dashboard
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports
            .filter((r) => r.dept === adminDept)
            .map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-6 rounded-xl shadow border-l-4 border-blue-600"
              >
                <div className="flex justify-between mb-2">
                  <h3 className="font-bold">{entry.title}</h3>
                  <span className="text-xs bg-yellow-100 px-2 py-1 rounded font-bold">
                    {entry.status}
                  </span>
                </div>

                <p className="text-slate-600 mb-4">
                  {entry.description}
                </p>

                <button
                  className="bg-blue-900 text-white px-4 py-2 rounded text-sm"
                  onClick={() => setActiveReport(entry)}
                >
                  Review Evidence
                </button>
              </div>
            ))}
        </div>
      </main>

      {/* Modal */}
      {activeReport && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl flex flex-col max-h-[90vh]">
            <header className="bg-slate-900 text-white p-4 flex justify-between">
              <h3 className="font-bold">
                Report ID: {activeReport.id}
              </h3>
              <button onClick={() => setActiveReport(null)}>×</button>
            </header>

            <section className="p-6 overflow-y-auto bg-slate-100 flex-1">
              {extractEvidenceList(activeReport).map((file, index) => (
                <div key={index} className="bg-white p-4 rounded shadow mb-6">
                  {renderMedia(file)}

                  <button
                    onClick={() => runAnalysis(file)}
                    disabled={busyFile === file}
                    className="mt-4 bg-purple-700 text-white px-4 py-2 rounded"
                  >
                    {busyFile === file ? "Processing…" : "Process Evidence"}
                  </button>

                  {analysisCache[file] && (
                    <div className="mt-4 border-l-4 border-purple-600 bg-slate-50 p-4 rounded">
                      <p className="font-bold">
                        AI Verdict:{" "}
                        <span
                          className={
                            analysisCache[file].final_verdict === "FAKE"
                              ? "text-red-600"
                              : analysisCache[file].final_verdict ===
                                "SUSPICIOUS"
                              ? "text-yellow-600"
                              : "text-green-600"
                          }
                        >
                          {analysisCache[file].final_verdict}
                        </span>
                      </p>
                      <p className="text-sm">
                        Confidence:{" "}
                        {analysisCache[file].confidence ?? "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </section>

            <footer className="p-4 border-t flex justify-end gap-3">
              <button
                onClick={() => updateReportState("Accepted")}
                className="bg-green-600 text-white px-6 py-2 rounded font-bold"
              >
                Accept
              </button>
              <button
                onClick={() => updateReportState("Rejected")}
                className="bg-red-600 text-white px-6 py-2 rounded font-bold"
              >
                Reject
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
