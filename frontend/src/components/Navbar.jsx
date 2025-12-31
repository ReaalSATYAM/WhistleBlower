import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">Disclosure Hub</h1>

      <div className="space-x-6 text-sm">
        <Link to="/" className="hover:text-gray-300">
          Main
        </Link>

        <Link to="/status" className="hover:text-gray-300">
          Submission Progress
        </Link>
      </div>
    </nav>
  );
}
