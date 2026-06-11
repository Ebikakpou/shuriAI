import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar({ isAuthenticated }) { // ⚡ Destructured isAuthenticated to watch live sessions
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/90 backdrop-blur-sm border-b border-slate-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          
          {/* Logo identity Brand elements */}
          <Link to="/" className="flex items-center space-x-2 group cursor-pointer">
            <div>
              <img 
                src="/shuri.png" 
                alt="codeflow" 
                className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full object-cover" 
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=80" }}
              />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold">
              <span className="text-white"> Shuri</span>
              <strong><span className="text-orange-500">AI</span></strong>
            </span>
          </Link>

          {/* 🖥️ DESKTOP NAVIGATION WRAPPER MAP */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to="/" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors duration-300">Home</Link>
            <a href="#features" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors duration-300">Features</a>
            <a href="#pricing" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors duration-300">Pricing</a>
            <a href="#testimonials" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors duration-300">Testimonials</a>
            
            {/* ⚡ PROMPT CONDITIONAL ELEMENT BUTTON */}
            {isAuthenticated ? (
              <Link to="/dashboard" className="text-sm sm:text-base font-semibold px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white hover:opacity-90 transition-all shadow-md">
                Dashboard
              </Link>
            ) : (
              <Link to="/auth" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors duration-300 font-medium">
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile responsive toggle control block */}
          <button 
            className="md:hidden p-2 text-gray-300 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-300" 
            onClick={() => setMobileMenuIsOpen((prev) => !prev)}
          >
            {mobileMenuIsOpen ? <X className="w-5 h-5 sm:h-6 sm:w-6" /> : <Menu className="w-5 h-5 sm:h-6 sm:w-6" />}
          </button>
        </div>
      </div>

      {/* 📱 MOBILE RESPONSIVE NAV BLOCK */}
      {mobileMenuIsOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-md absolute top-full left-0 w-full py-2 shadow-lg transition-all border-t border-slate-900 animate-in slide-in-from-top duration-300">
          <div className="py-4 px-4 sm:py-6 space-y-3 sm:space-y-4 text-left">
            <Link to="/" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors duration-300" onClick={() => setMobileMenuIsOpen(false)}>Home</Link>
            <a href="#features" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors duration-300" onClick={() => setMobileMenuIsOpen(false)}>Features</a>
            <a href="#pricing" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors duration-300" onClick={() => setMobileMenuIsOpen(false)}>Pricing</a>
            <a href="#testimonials" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors duration-300" onClick={() => setMobileMenuIsOpen(false)}>Testimonials</a>
            
            {/* ⚡ MOBILE PROMPT CONDITIONAL ELEMENT BUTTON */}
            {isAuthenticated ? (
              <Link 
                to="/dashboard" 
                className="block text-center mx-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-sm font-semibold text-white hover:opacity-90 transition-all shadow-md" 
                onClick={() => setMobileMenuIsOpen(false)}
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link 
                to="/auth" 
                className="block text-center mx-4 py-2 bg-slate-900 border border-slate-800 text-gray-300 hover:text-orange-500 rounded-lg text-sm font-medium transition-all" 
                onClick={() => setMobileMenuIsOpen(false)}
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}