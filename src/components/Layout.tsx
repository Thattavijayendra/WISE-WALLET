import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="md:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-6">
          {title && (
            <h1 className="text-2xl font-semibold text-white mb-6">{title}</h1>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;