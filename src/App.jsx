import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Auth from "./components/Auth"; // 👈 1. Imported your Auth component
import "./index.css";
import { Routes, Route } from "react-router-dom";

// 2. Created a clean sub-component for your home landing page layout
function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Pricing />
      <Testimonials />
    </>
  );
}

function App() {
  return ( 
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Persistent global header component */}
      <Navbar />
      
      {/* 3. Implemented Route Switching Logic */}
      <Routes>
        {/* Displays the full landing experience at: http://localhost:5173/ */}
        <Route path="/" element={<Home />} />
        
        {/* Displays the premium login/signup screen at: http://localhost:5173/auth */}
        <Route path="/auth" element={<Auth />} />
      </Routes>

      {/* Persistent global footer component */}
      <Footer />
    </div>
  );
}

export default App;