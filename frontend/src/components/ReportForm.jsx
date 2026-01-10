import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ReportForm = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ---------------- FILE HANDLERS ---------------- */

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
    e.target.value = null;
  };

  const removeFile = (indexToRemove) => {
    setFiles((prevFiles) =>
      prevFiles.filter((_, index) => index !== indexToRemove)
    );
  };

  /* ---------------- SUBMIT ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      return alert("Please select at least one proof.");
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    // All reports go to common department now
    formData.append("dept", "Vigilance Department");

    files.forEach((file) => {
      formData.append("evidence", file);
    });

    try {
      const response = await fetch("http://localhost:5000/api/report", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        alert(`Submitted Successfully! Track ID: ${data.reportId}`);
        navigate("/");
      } else {
        alert("Submission failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Check console.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div id="report" className="max-w-3xl mx-auto -mt-10 mb-20 relative z-20 px-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 p-8 md:p-12">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Submit Complaint</h2>
            <p className="text-slate-500 mt-2 text-sm">Your identity is protected by end-to-end encryption.</p>
          </div>
          <span className={`px-4 py-2 rounded-lg text-sm font-semibold border ${files.length > 0 ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
            {files.length} Evidence File{files.length !== 1 && 's'} Attached
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* TITLE */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Report Subject</label>
            <input
              type="text"
              required
              placeholder="E.g., Financial Misconduct in Dept X"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Detailed Description</label>
            <textarea
              required
              rows="6"
              placeholder="Provide as much detail as possible..."
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* FILE UPLOAD */}
          <div className="space-y-2">
             <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider">Evidence Upload</label>
            <div className={`border-2 border-dashed p-8 rounded-xl text-center transition-all ${files.length > 0 ? 'border-teal-300 bg-teal-50/30' : 'border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-slate-400'}`}>
              <label className="cursor-pointer flex flex-col items-center justify-center gap-3">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="space-y-1">
                  <span className="text-teal-600 font-semibold hover:text-teal-700">Click to upload files</span>
                  <span className="text-slate-500"> or drag and drop</span>
                </div>
                <p className="text-xs text-slate-400">
                  Documents, Images, Audio, or Video
                </p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* FILE LIST */}
          {files.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <ul className="divide-y divide-slate-100">
                {files.map((file, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="w-8 h-8 rounded bg-teal-100 flex items-center justify-center flex-shrink-0 text-teal-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                      </div>
                      <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-slate-400 hover:text-red-500 p-2 transition-colors rounded-full hover:bg-red-50"
                      title="Remove file"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-teal-600 text-white font-bold text-lg rounded-xl hover:bg-teal-500 active:transform active:scale-[0.99] transition-all shadow-lg shadow-teal-600/20 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Encrypting & Uploading...
              </span>
            ) : "Submit Secure Report"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
