import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaGamepad, FaUsers, FaTrophy, FaChartLine, FaSignOutAlt } from 'react-icons/fa';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-slate-700">
          L4G Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink 
            to="/" 
            className={({ isActive }) => `flex items-center p-2 rounded hover:bg-slate-700 ${isActive ? 'bg-slate-700' : ''}`}
          >
            <FaChartLine className="mr-3" /> Dashboard
          </NavLink>
          <NavLink 
            to="/games" 
            className={({ isActive }) => `flex items-center p-2 rounded hover:bg-slate-700 ${isActive ? 'bg-slate-700' : ''}`}
          >
            <FaGamepad className="mr-3" /> Games
          </NavLink>
          <NavLink 
            to="/users" 
            className={({ isActive }) => `flex items-center p-2 rounded hover:bg-slate-700 ${isActive ? 'bg-slate-700' : ''}`}
          >
            <FaUsers className="mr-3" /> Users
          </NavLink>
          <NavLink 
            to="/tournaments" 
            className={({ isActive }) => `flex items-center p-2 rounded hover:bg-slate-700 ${isActive ? 'bg-slate-700' : ''}`}
          >
            <FaTrophy className="mr-3" /> Tournaments
          </NavLink>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button className="flex items-center w-full p-2 text-left hover:bg-slate-700 rounded text-red-400">
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Admin User</span>
            <div className="w-8 h-8 bg-slate-500 rounded-full"></div>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
