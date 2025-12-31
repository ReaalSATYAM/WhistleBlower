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
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Submit Complaint</h2>
        <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
          Total Files: {files.length}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* TITLE */}
        <div>
          <label className="block text-sm font-bold text-gray-700">Title</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="block text-sm font-bold text-gray-700">Description</label>
          <textarea
            required
            rows="4"
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* FILE UPLOAD */}
        <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg bg-gray-50 text-center">
          <label className="cursor-pointer inline-block">
            <div className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 font-bold transition">
              + Add Files
            </div>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <p className="text-xs text-gray-500 mt-2">
            Click multiple times to add more files (Images, Video, Audio)
          </p>
        </div>

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-bold text-gray-600 mb-2">Attached Evidence:</h4>
            <ul className="space-y-2">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white p-2 rounded shadow-sm"
                >
                  <span className="text-sm truncate max-w-[80%] text-gray-700">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700 font-bold px-2 text-lg"
                  >
                    &times;
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
          className="w-full py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition shadow-md"
        >
          {loading ? "Uploading..." : "Submit Report"}
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
