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
      <aside className="hidden md:flex w-64 bg-slate-900 text-white p-6 flex-col border-r border-slate-800">
        <h1 className="text-2xl font-bold mb-10 tracking-tight">Govt. Vigilance</h1>
        <button
          className="mt-auto px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm font-semibold transition-colors"
          onClick={() => navigate("/admin")}
        >
          Logout
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-8 text-slate-800">
          {adminDept} Dashboard
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {reports
            .filter((r) => r.dept === adminDept)
            .map((entry) => (
              <div
                key={entry.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 border-l-4 border-l-teal-500 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between mb-3">
                  <h3 className="font-bold text-lg text-slate-900">{entry.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-wide ${
                    entry.status === "accepted" ? "bg-emerald-100 text-emerald-700" :
                    entry.status === "rejected" ? "bg-rose-100 text-rose-700" :
                    "bg-amber-100 text-amber-700"
                  }`}>
                    {entry.status}
                  </span>
                </div>

                <p className="text-slate-600 mb-6 line-clamp-2">
                  {entry.description}
                </p>

                <button
                  className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
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
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white max-w-4xl w-full rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            <header className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Case Review</h3>
                <p className="text-slate-400 text-xs font-mono">ID: {activeReport.id}</p>
              </div>
              <button 
                onClick={() => setActiveReport(null)}
                className="text-slate-400 hover:text-white transition-colors text-2xl"
              >
                &times;
              </button>
            </header>

            <section className="p-8 overflow-y-auto bg-slate-50 flex-1">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Evidence Files</h4>
              {extractEvidenceList(activeReport).map((file, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
                  <div className="mb-4">
                    {renderMedia(file)}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => runAnalysis(file)}
                      disabled={busyFile === file}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-purple-700 disabled:opacity-50"
                    >
                      {busyFile === file ? "Processing AI Analysis..." : "Run AI Deepfake Check"}
                    </button>

                    {analysisCache[file] && (
                      <div className="flex-1 min-w-[200px] border-l-4 border-purple-500 bg-purple-50 p-3 rounded text-sm">
                        <p className="font-bold text-purple-900">
                          AI Verdict:{" "}
                          <span
                            className={
                              analysisCache[file].final_verdict === "FAKE"
                                ? "text-red-600"
                                : analysisCache[file].final_verdict === "SUSPICIOUS"
                                ? "text-amber-600"
                                : "text-emerald-600"
                            }
                          >
                            {analysisCache[file].final_verdict}
                          </span>
                        </p>
                        <p className="text-purple-700 text-xs">
                          Confidence Score: {analysisCache[file].confidence ?? "N/A"}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </section>

            <footer className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-white">
              <button
                onClick={() => updateReportState("Rejected")}
                className="px-6 py-2 rounded-lg font-bold border border-rose-200 text-rose-600 hover:bg-rose-50 transition-colors"
              >
                Reject Case
              </button>
              <button
                onClick={() => updateReportState("Accepted")}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-500 shadow-lg shadow-teal-500/20 transition-colors"
              >
                Verify & Accept
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
