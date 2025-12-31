import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple verification
    if (password === "admin123") {
      // Save a generic role
      localStorage.setItem("adminRole", "Vigilance Department"); 
      navigate("/admin/dashboard");
    } else {
      alert("Invalid Access Code");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-8 border-blue-900">
        <h2 className="text-3xl font-extrabold text-blue-900 text-center mb-2">Official Login</h2>
        <p className="text-center text-slate-500 mb-8">Government Vigilance Portal</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-slate-700 font-bold mb-2">Secure Password</label>
            <input 
              type="password"
              className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 outline-none"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-lg transition duration-300 shadow-lg"
          >
            Access Dashboard
          </button>
        </form>
        <p className="text-xs text-center text-slate-400 mt-6">Restricted Area • IP Logged</p>
      </div>
    </div>
  );
};

export default AdminLogin;
