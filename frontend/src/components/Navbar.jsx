import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center shadow-lg group-hover:bg-teal-400 transition-colors">
            <span className="text-white font-bold text-lg">D</span>
          </div>
          <h1 className="font-bold text-xl text-slate-100 tracking-tight">Disclosure Hub</h1>
        </Link>

        <div className="space-x-8 text-sm font-medium">
          <Link to="/" className="text-slate-300 hover:text-white transition-colors">
            Main
          </Link>

          <Link to="/status" className="text-slate-300 hover:text-white transition-colors">
            Submission Progress
          </Link>
        </div>
      </div>
    </nav>
  );
}
