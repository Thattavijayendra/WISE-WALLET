import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, PieChart, PlusCircle, Settings, Award, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  const navLinks = [
    { path: '/dashboard', icon: <Home size={24} />, label: 'Home' },
    { path: '/stats', icon: <PieChart size={24} />, label: 'Stats' },
    { path: '/add-expense', icon: <PlusCircle size={24} />, label: 'Add' },
    { path: '/categories', icon: <Settings size={24} />, label: 'Categories' },
    { path: '/achievements', icon: <Award size={24} />, label: 'Rewards' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-emerald-400">VIJAY's WALLET</span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-gray-900 bg-opacity-95">
          <div className="flex flex-col h-full">
            <div className="p-4 flex justify-between items-center border-b border-gray-700">
              <span className="text-xl font-bold text-emerald-400">WISE WALLET</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white focus:outline-none"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center p-3 rounded-lg ${
                    isActive(link.path)
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              ))}
              <button
                onClick={handleSignOut}
                className="flex items-center p-3 text-gray-300 hover:bg-gray-700 rounded-lg mt-auto"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-gray-800">
        <div className="flex flex-col flex-grow">
          <div className="flex items-center justify-center h-16 border-b border-gray-700">
            <span className="text-xl font-bold text-emerald-400">WISE WALLET</span>
          </div>
          <div className="flex flex-col flex-grow p-4 overflow-y-auto">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center p-3 rounded-lg ${
                    isActive(link.path)
                      ? 'bg-emerald-500 text-white'
                      : 'text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {link.icon}
                  <span className="ml-3">{link.label}</span>
                </Link>
              ))}
            </div>
            <div className="mt-auto">
              {currentUser && (
                <div className="flex flex-col p-4 border-t border-gray-700 mt-4">
                  <span className="text-sm text-gray-400">Signed in as:</span>
                  <span className="text-white truncate">{currentUser.displayName || currentUser.email}</span>
                  <button
                    onClick={handleSignOut}
                    className="mt-2 text-sm text-gray-400 hover:text-white"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main content area - add padding for sidebar on desktop */}
      <div className="md:pl-64">
        {/* Your page content goes here */}
      </div>
    </>
  );
};

export default Navbar;