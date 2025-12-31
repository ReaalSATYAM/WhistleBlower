import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Status() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!id.trim()) return alert("Enter an ID");

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`http://localhost:5000/api/status/${id.trim()}`);
      const data = await res.json();

      if (data.found && data.status && data.dept) {
        setResult({
          status: data.status,
          dept: data.dept,
          date: data.createdAt
            ? new Date(data.createdAt).toLocaleDateString()
            : "N/A",
          note: data.note || "No note added"
        });
      } else {
        alert("Report ID not found.");
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to server.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 flex flex-col items-center py-16 px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-blue-900 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Track Your Report</h2>
          </div>

          <div className="p-8">
            <input
              type="text"
              placeholder="Enter Report ID"
              onChange={(e) => setId(e.target.value)}
              className="w-full p-4 border-2 border-slate-200 rounded-xl mb-4 text-lg"
            />

            <button 
              onClick={check} 
              disabled={loading}
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700"
            >
              {loading ? "Checking..." : "Check Status"}
            </button>

            {result && (
              <div className={`mt-8 border-l-4 p-6 rounded-r-xl shadow-sm animate-fade-in ${
                result.status === "Accepted" ? "bg-green-50 border-green-500" :
                result.status === "Rejected" ? "bg-red-50 border-red-500" :
                "bg-yellow-50 border-yellow-500"
              }`}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-500 text-xs font-bold uppercase">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                     result.status === "Accepted" ? "bg-green-200 text-green-800" :
                     result.status === "Rejected" ? "bg-red-200 text-red-800" :
                     "bg-yellow-200 text-yellow-800"
                  }`}>
                    {result.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{result.dept}</h3>
                <div className="bg-white p-3 rounded border border-slate-200 text-slate-700 italic text-sm mt-3">
                  "Admin Note: {result.note}"
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}