
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BarChart, Sparkles } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  const links = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/quiz', label: 'Career Quiz', icon: BookOpen },
    { path: '/results', label: 'Results', icon: BarChart },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center transform group-hover:rotate-3 transition-all duration-300 shadow-md">
            <Sparkles className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">Future Forge</span>
            <span className="text-xs text-gray-500 -mt-1">Shape your tomorrow</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 py-2 border-b-2 transition-all duration-200 ${
                  isActive
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-indigo-500'
                }`}
              >
                <link.icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="md:hidden">
          {/* Mobile menu button - simplified for now */}
          <button className="p-2 rounded-md text-gray-500 hover:text-indigo-500 hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
