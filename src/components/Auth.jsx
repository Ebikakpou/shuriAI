import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2 } from "lucide-react";

const API_URL = "https://shuriai-backend.onrender.com";

export default function Auth() {
  // 🧭 Core Screen State Trackers
  const [isLogin, setIsLogin] = useState(true);
  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  
  // 📦 Input Data States
  const [verificationCode, setVerificationCode] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // 🔔 Custom Embedded Alert States (Replaces default browser alert windows)
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // Can be 'success' or 'error'

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ⚡ Concept Utility: Automatically shows an embedded toast and manages state
  const triggerNotification = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
  };

  // ==========================================
  // 🚀 SUBMIT FLOW: REGISTRATION & LOGIN
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    triggerNotification("", ""); // Clear out old notifications instantly

    try {
      const response = await fetch (`https://shuriai-backend.onrender.com/api/auth/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Something went wrong!");
      }

      if (isLogin) {
        triggerNotification(`Welcome back, ${data.user.name}! Loading app... 👋`, "success");
        
        // Save auth metadata tokens inside browser storage container arrays
        localStorage.setItem("shuri_token", data.token);
        localStorage.setItem("shuri_user", JSON.stringify(data.user));
        
        // ⏳ CONCEPT: Automatic Page Transition Delay
        setTimeout(() => {
          window.location.href = "/"; // Route to dashboard layout
        }, 2000);
      } else {
        triggerNotification(data.msg, "success");
        
        // ⏳ CONCEPT: Automatically slide layout view panels after notification pause
        setTimeout(() => {
          setAlertMessage(""); // Wipe current notification bar
          setShowVerificationScreen(true); // Bring up 6-digit code validation container
        }, 2500);
      }

    } catch (error) {
      triggerNotification(error.message, "error");
    }
  };

  // ==========================================
  // 🛡️ SUBMIT FLOW: EMAIL CODE ACTIVATION
  // ==========================================
  const handleVerifyCodeSubmit = async (e) => {
    e.preventDefault();
    triggerNotification("", "");

    try {
      const response = await fetch("https://shuriai-backend.onrender.com/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Verification failed.");
      }

      triggerNotification("Account verified successfully! 🎉 Preparing Login...", "success");

      // ⏳ CONCEPT: Auto shift them straight back to standard Login panel layout view
      setTimeout(() => {
        setAlertMessage("");
        setShowVerificationScreen(false);
        setIsLogin(true); 
      }, 2500);

    } catch (error) {
      triggerNotification(error.message, "error");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Glowing geometric structural decorations */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        
        {/* Brand App Identity Headers */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-lg shadow-lg">S</div>
            <span className="text-2xl font-bold text-white tracking-wide">Shuri<span className="text-cyan-400">AI</span></span>
          </div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {showVerificationScreen ? "Verify your email" : isLogin ? "Welcome back" : "Create your account"}
          </h2>
        </div>

        {/* Premium Core Authentication Glass Card Container */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          {/* 🔥 EMBEDDED IN-APP DYNAMIC ALERT ELEMENT */}
          {alertMessage && (
            <div className={`mb-5 p-3.5 rounded-xl border flex items-start space-x-3 text-sm animate-in fade-in slide-in-from-top-2 duration-200 ${
              alertType === "success" 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                : "bg-rose-500/10 border-rose-500/30 text-rose-400"
            }`}>
              {alertType === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
              <span>{alertMessage}</span>
            </div>
          )}
          
          {/* SCREEN PANEL VIEW A: 6-DIGIT CODE TOKEN CAPTURE */}
          {showVerificationScreen ? (
            <form onSubmit={handleVerifyCodeSubmit} className="space-y-5">
              <p className="text-sm text-gray-400 text-center">
                We sent a 6-digit confirmation code to <b className="text-cyan-400">{formData.email}</b>. Enter it below to unlock access.
              </p>
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Verification Code</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    maxLength="6"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-center font-bold tracking-widest text-lg focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm rounded-xl flex items-center justify-center space-x-2 active:scale-[0.99] transition-all cursor-pointer">
                <span>Verify & Activate</span>
              </button>
            </form>
          ) : (
            
            /* SCREEN PANEL VIEW B: STANDARD SIGNUP & LOGIN FORMS */
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"><User className="w-4 h-4" /></div>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"><Mail className="w-4 h-4" /></div>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"><Lock className="w-4 h-4" /></div>
                  <input type="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all" />
                </div>
              </div>

              <button type="submit" className="w-full mt-2 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg active:scale-[0.99] transition-all cursor-pointer">
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Toggle Button Footer Panel (Hidden completely when on verification screen) */}
          {!showVerificationScreen && (
            <div className="mt-6 pt-5 border-t border-slate-800/60 text-center text-sm">
              <span className="text-gray-400">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-cyan-400 font-medium hover:underline focus:outline-none cursor-pointer">
                {isLogin ? "Sign up free" : "Log in here"}
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}