import Navbar from "../components/Navbar";
import { useState } from "react";
import { checkSubmission } from "../api/api";

export default function Status() {
  const [id, setId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (!id.trim()) return alert("Enter an ID");

    setLoading(true);
    setResult(null);

    try {
      const res = await checkSubmission(id.trim());
      const data = res.data;

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
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
          <div className="bg-slate-900 p-8 text-center border-b border-slate-800">
            <h2 className="text-3xl font-bold text-white tracking-tight">Track Your Report</h2>
            <p className="text-slate-400 mt-2 text-sm">Enter your unique tracking ID provided during submission.</p>
          </div>

          <div className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Report ID</label>
              <input
                type="text"
                placeholder="e.g. 5f4d3c2b..."
                onChange={(e) => setId(e.target.value)}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 font-medium text-slate-900 text-lg"
              />
            </div>

            <button 
              onClick={check} 
              disabled={loading}
              className="w-full bg-teal-600 text-white font-bold py-4 rounded-xl hover:bg-teal-500 transition-all shadow-lg shadow-teal-600/20 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Check Status"}
            </button>

            {result && (
              <div className={`mt-8 border-l-4 p-6 rounded-r-xl shadow-sm animate-fade-in transition-all ${
                result.status === "Accepted" ? "bg-emerald-50 border-emerald-500" :
                result.status === "Rejected" ? "bg-rose-50 border-rose-500" :
                "bg-amber-50 border-amber-500"
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">Current Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                     result.status === "Accepted" ? "bg-emerald-100 text-emerald-800" :
                     result.status === "Rejected" ? "bg-rose-100 text-rose-800" :
                     "bg-amber-100 text-amber-800"
                  }`}>
                    {result.status}
                  </span>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-slate-900">{result.dept}</h3>
                  <p className="text-xs text-slate-500">Submitted on: {result.date}</p>
                </div>
                
                <div className="bg-white/60 p-4 rounded-lg border border-black/5 text-slate-700 italic text-sm">
                  <span className="font-semibold text-slate-900 not-italic block mb-1">Admin Note:</span>
                  " {result.note} "
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}