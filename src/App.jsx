import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Auth from "./components/Auth"; 
import Dashboard from "./components/Dashboard"; 
import "./index.css";

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

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("shuri_token"); 
  });

  useEffect(() => {
    const handleAuthCheck = () => {
      setIsAuthenticated(!!localStorage.getItem("shuri_token"));
    };

    window.addEventListener("storage", handleAuthCheck);
    return () => window.removeEventListener("storage", handleAuthCheck);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between">
      
      <Routes>
        {/*  PATH 1: ROOT LANDING PAGE VIEW (Dynamic Session State passed to Navbar) */}
        <Route path="/" element={
          <>
            {/*  Passing isAuthenticated allows the marketing Navbar to adapt to logged-in sessions */}
            <Navbar isAuthenticated={isAuthenticated} />
            <Home />
            <Footer />
          </>
        } />

        {/* PATH 2: AUTHENTICATION PORTAL */}
        <Route path="/auth" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : (
            <div className="flex-1 flex items-center justify-center">
              <Auth onAuthSuccess={() => setIsAuthenticated(true)} />
            </div>
          )
        } />

        {/*  PATH 3: CORE ACCESSIBLE DASHBOARD CONTROL INTERFACE WORKSPACE */}
        <Route path="/dashboard" element={
          isAuthenticated ? (
            <Dashboard onLogout={() => setIsAuthenticated(false)} />
          ) : (
            <Navigate to="/auth" replace />
          )
        } />

        {/* PATH 4: FALLBACK PROTECTION ENGINE */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} />
      </Routes>

    </div>
  );
}