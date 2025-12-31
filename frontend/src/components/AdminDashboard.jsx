import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [realReports, setRealReports] = useState([]);
  const [aiResults, setAiResults] = useState({});
  const [processingFile, setProcessingFile] = useState(null);

  /* ---------------- HELPERS ---------------- */

  const normalizeStatus = (status) =>
    (status || "Pending").toLowerCase();

  const getStatusStyles = (status) => {
    switch (normalizeStatus(status)) {
      case "accepted":
        return "bg-green-50 border-green-500";
      case "rejected":
        return "bg-red-50 border-red-500";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getEvidenceType = (filename) => {
    const ext = filename.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "image";
    if (["mp4", "webm", "ogg", "mov"].includes(ext)) return "video";
    if (["mp3", "wav"].includes(ext)) return "audio";
    return null;
  };

  const fetchReports = () => {
    fetch("http://localhost:5000/api/reports")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((r) => ({
          ...r,
          status: normalizeStatus(r.status),
        }));
        setRealReports(normalized);
      })
      .catch((err) =>
        console.error("Failed to fetch reports", err)
      );
  };

  useEffect(() => {
    const savedRole = localStorage.getItem("adminRole");
    if (!savedRole) {
      navigate("/admin");
      return;
    }
    setRole(savedRole);
    fetchReports();
  }, [navigate]);

  /* ---------------- STATUS UPDATE ---------------- */

  const handleUpdateStatus = async (status) => {
    if (!selectedReport) return;

    const note = prompt(
      `Enter note for ${status}:`,
      status === "Accepted"
        ? "Evidence verified."
        : "Insufficient or unreliable evidence."
    );

    if (!note) return;

    try {
      await fetch("http://localhost:5000/api/update-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reportId: selectedReport.id,
          status: status.toLowerCase(),
          note,
        }),
      });

      // Update UI instantly
      setRealReports((prev) =>
        prev.map((r) =>
          r.id === selectedReport.id
            ? { ...r, status: status.toLowerCase() }
            : r
        )
      );

      setSelectedReport(null);
    } catch (err) {
      console.error("Status update failed", err);
      alert("Failed to update status");
    }
  };

  /* ---------------- AI PROCESSING ---------------- */

  const processEvidence = async (filename) => {
    const type = getEvidenceType(filename);
    if (!type) return alert("Unsupported file type");

    setProcessingFile(filename);

    try {
      const fileUrl = `http://localhost:5000/uploads/${filename}`;
      const blob = await fetch(fileUrl).then((res) => res.blob());

      const formData = new FormData();
      formData.append("file", blob, filename);
      formData.append("type", type);

      const res = await fetch("http://localhost:5001/check-evidence", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      setAiResults((prev) => ({
        ...prev,
        [filename]: data.analysis,
      }));
    } catch (err) {
      console.error(err);
      alert("AI processing failed");
    } finally {
      setProcessingFile(null);
    }
  };

  /* ---------------- RENDER HELPERS ---------------- */

  const renderEvidenceItem = (filename) => {
    const fileUrl = `http://localhost:5000/uploads/${filename}`;
    const ext = filename.split(".").pop().toLowerCase();

    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext))
      return <img src={fileUrl} alt="Proof" className="w-full rounded shadow" />;

    if (["mp4", "webm", "ogg", "mov"].includes(ext))
      return <video controls src={fileUrl} className="w-full rounded shadow" />;

    if (["mp3", "wav"].includes(ext))
      return <audio controls src={fileUrl} className="w-full mt-2" />;

    return <a href={fileUrl}>Open File</a>;
  };

  const getEvidenceArray = (report) =>
    Array.isArray(report.evidence)
      ? report.evidence
      : report.evidence
      ? [report.evidence]
      : [];

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <h2 className="text-3xl font-bold mb-8">{role} Dashboard</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {realReports.map((report) => (
          <div
            key={report.id}
            className={`border-l-4 p-6 rounded shadow ${getStatusStyles(report.status)}`}
          >
            <h3 className="font-bold">{report.title}</h3>
            <p className="text-gray-600">{report.description}</p>

            <p className="mt-2 text-sm font-bold">
              Status: <span className="capitalize">{report.status}</span>
            </p>

            <button
              onClick={() => setSelectedReport(report)}
              className="mt-3 bg-blue-700 text-white px-4 py-2 rounded"
            >
              Review Evidence
            </button>
          </div>
        ))}
      </div>


      {/* -------- MODAL -------- */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4">
          <div
            className={`w-full max-w-4xl rounded shadow-lg p-6 overflow-y-auto max-h-[90vh] ${getStatusStyles(
              selectedReport.status
            )}`}
          >
            <h3 className="font-bold mb-4">
              Report ID: {selectedReport.id}
            </h3>

            {getEvidenceArray(selectedReport).map((file, idx) => (
              <div key={idx} className="border p-4 mb-4 rounded bg-white">
                {renderEvidenceItem(file)}

                <button
                  onClick={() => processEvidence(file)}
                  disabled={processingFile === file}
                  className="mt-3 bg-purple-700 text-white px-4 py-2 rounded"
                >
                  {processingFile === file
                    ? "Processing..."
                    : "Process Evidence"}
                </button>

                {aiResults[file] && (
                  <div className="mt-4 border-l-4 border-purple-600 p-4 bg-slate-50 rounded">
                    <p className="font-bold">
                      AI Verdict:{" "}
                      <span
                        className={
                          aiResults[file].final_verdict === "FAKE"
                            ? "text-red-600"
                            : aiResults[file].final_verdict === "SUSPICIOUS"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }
                      >
                        {aiResults[file].final_verdict}
                      </span>
                    </p>

                    <p className="text-sm text-gray-600">
                      Confidence: {aiResults[file].confidence ?? "N/A"}
                    </p>

                    <details className="mt-2 bg-gray-100 p-2 rounded text-xs">
                      <summary className="cursor-pointer font-bold">Raw Analysis</summary>
                      <pre>{JSON.stringify(aiResults[file], null, 2)}</pre>
                    </details>
                  </div>
                )}
              </div>
            ))}

            <div className="mt-6 flex justify-end gap-3 border-t pt-4">
              <button
                onClick={() => handleUpdateStatus("Accepted")}
                className="px-6 py-2 bg-green-600 text-white rounded font-bold"
              >
                Accept
              </button>

              <button
                onClick={() => handleUpdateStatus("Rejected")}
                className="px-6 py-2 bg-red-600 text-white rounded font-bold"
              >
                Reject
              </button>

              <button
                onClick={() => setSelectedReport(null)}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
