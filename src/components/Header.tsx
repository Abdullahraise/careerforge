
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, BarChart, Sparkles, Menu, X } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const links = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/quiz', label: 'Career Quiz', icon: BookOpen },
    { path: '/results', label: 'Results', icon: BarChart },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg flex items-center justify-center transform group-hover:rotate-3 transition-all duration-300 shadow-md">
            <Sparkles className="text-white" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-transparent">Future Forge</span>
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
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-purple-500'
                }`}
              >
                <link.icon size={18} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <button 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          className="p-2 rounded-md text-gray-500 hover:text-purple-500 hover:bg-gray-100 focus:outline-none md:hidden"
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 w-full bg-white border-b border-indigo-100 shadow-lg animate-slide-down">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 p-3 rounded-md transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-50 text-purple-600'
                        : 'text-gray-600 hover:text-purple-500 hover:bg-purple-50'
                    }`}
                  >
                    <link.icon size={20} />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
