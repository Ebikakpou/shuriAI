import React, { useState } from "react";
import { Mail, Lock, User, ArrowRight, ShieldCheck } from "lucide-react";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerificationScreen, setShowVerificationScreen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Main Registration/Login submission flow
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";
    const targetUrl = `http://localhost:5000/api/auth/gradient`; // fallback router address mapping

    try {
      const response = await fetch(`http://localhost:5000/api/auth/${isLogin ? "login" : "signup"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Something went wrong!");
      }

      if (isLogin) {
        alert(`Welcome back, ${data.user.name}! 👋`);
        localStorage.setItem("shuri_token", data.token);
        localStorage.setItem("shuri_user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        // Successful signup flags code screen visibility configuration instantly
        alert("CHECK YOUR EMAIL FOR VERIFICATION! ✉️");
        setShowVerificationScreen(true);
      }

    } catch (error) {
      alert(`⚠️ Issue: ${error.message}`);
    }
  };

  // 🔥 Handler for verifying the 6-digit email token code
  const handleVerifyCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Verification failed.");
      }

      alert("Account verified successfully! 🎉 Shifting you to Login...");
      setShowVerificationScreen(false);
      setIsLogin(true); // Flip them to login panel view layout

    } catch (error) {
      alert(`⚠️ Code Issue: ${error.message}`);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-lg shadow-lg">S</div>
            <span className="text-2xl font-bold text-white tracking-wide">Shuri<span className="text-cyan-400">AI</span></span>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {showVerificationScreen ? "Verify your email" : isLogin ? "Welcome back" : "Create your account"}
          </h2>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
          
          {/* 🔥 DYNAMIC SCREEN 1: VERIFICATION SCREEN INPUT PANELS */}
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
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-center font-bold tracking-widest text-lg focus:outline-none focus:border-cyan-500 transition-all"
                  />
                </div>
              </div>
              <button type="submit" className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm rounded-xl flex items-center justify-center space-x-2 cursor-pointer">
                <span>Verify & Activate</span>
              </button>
            </form>
          ) : (
            
            /* DYNAMIC SCREEN 2: STANDARD REGISTRATION/LOGIN FORMS */
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"><User className="w-4 h-4" /></div>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="John Doe" className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"><Mail className="w-4 h-4" /></div>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} placeholder="you@example.com" className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider">Password</label>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500"><Lock className="w-4 h-4" /></div>
                  <input type="password" name="password" required value={formData.password} onChange={handleInputChange} placeholder="••••••••" className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 transition-all" />
                </div>
              </div>

              <button type="submit" className="w-full mt-2 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg hover:opacity-95 transition-all cursor-pointer">
                <span>{isLogin ? "Sign In" : "Create Account"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

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