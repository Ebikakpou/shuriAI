import { Menu } from "lucide-react";
import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
    const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-slate-950/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14 sm:h-16 md:h-20 ">
                <div className="flex items-center space-x-2 group cursor-pointer">
                    <div>
                        <img src="/public/shuri.png" alt="codeflow" className="h-6 w-6 sm:h-8 
                        sm:w-8 md:h-10 md:w-10 rounded-full" />
                    </div>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold">
                        <span className="text-white"> Shuri</span>
                        <strong><span className="text-orange-500">AI</span></strong>
                    </span>
                </div>

                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                        <a href="#home" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors 
                        duration-300">Home</a>
                        <a href="#features" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors 
                        duration-300">Features</a>
                        <a href="#pricing" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors
                         duration-300">Pricing</a>
                        <a href="#testimonials" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors 
                        duration-300">Testimonials</a>
                        <a href="/auth" className="text-sm sm:text-base text-gray-300 hover:text-orange-500 transition-colors 
                        duration-300">Get Started</a>
                    </div>
                    <button className="md:hidden p-2 text-gray-300 hover:text-orange-500 
                    focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500
                     transition-colors duration-300" onClick={() => setMobileMenuIsOpen((prev) => !prev)}>
                        {mobileMenuIsOpen ? (
                            <X className="w-5 h-5 sm:h-6 sm:w-6" />
                        ): (
                            <Menu className="w-5 h-5 sm:h-6 sm:w-6" />
                        )}
                    </button>
                </div>
            </div>
            {mobileMenuIsOpen && (
                <div className="md:hidden bg-slate-950/90 backdrop-blur-sm absolute
                 top-full left-0 w-full py-2 shadow-lg transition-all duration-300 border-t
                  border-gray-700 border-slate-800/50 animate-in slide-in-from-top duration-300 ">
                    <div className="py-4 px-4 sm:py-6 space-y-3 sm:space-y-4">
                        <a href="#home" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors
                         duration-300" onClick={() => setMobileMenuIsOpen(false)}>Home</a>
                        <a href="#features" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors 
                        duration-300" onClick={() => setMobileMenuIsOpen(false)}>Features</a>
                        <a href="#pricing" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors 
                        duration-300" onClick={() => setMobileMenuIsOpen(false)}>Pricing</a>
                        <a href="#testimonials" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors 
                        duration-300" onClick={() => setMobileMenuIsOpen(false)}>Testimonials</a>
                        <a href="#get-started" className="block px-4 py-2 text-sm text-gray-300 hover:text-orange-500 transition-colors
                         duration-300 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-sm font-medium 
                         hover:opacity-90 transition-all" onClick={() => setMobileMenuIsOpen(false)}>Get Started</a>
                    </div>
                </div>)}
    </nav>
  );
}