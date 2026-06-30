import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const API_URL = "https://shuriai-backend.onrender.com";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const triggerNotification = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    triggerNotification("", "");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/${isLogin ? "login" : "signup"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Something went wrong.");
      }

      if (isLogin) {
        localStorage.setItem("shuri_token", data.token);
        localStorage.setItem("shuri_user", JSON.stringify(data.user));

        triggerNotification(
          `Welcome back, ${data.user.name}!`,
          "success"
        );

        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        triggerNotification(
          "Account created successfully! Please log in.",
          "success"
        );

        setFormData({
          name: "",
          email: "",
          password: "",
        });

        setTimeout(() => {
          setAlertMessage("");
          setIsLogin(true);
        }, 2000);
      }
    } catch (error) {
      triggerNotification(error.message, "error");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md z-10">

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white text-lg shadow-lg">
              S
            </div>

            <span className="text-2xl font-bold text-white tracking-wide">
              Shuri<span className="text-cyan-400">AI</span>
            </span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            {isLogin ? "Welcome back" : "Create your account"}
          </h2>
        </div>

        {/* Card */}
        <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl">

          {/* Alerts */}
          {alertMessage && (
            <div
              className={`mb-5 p-3.5 rounded-xl border flex items-start space-x-3 text-sm ${
                alertType === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : "bg-rose-500/10 border-rose-500/30 text-rose-400"
              }`}
            >
              {alertType === "success" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              )}

              <span>{alertMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                    <User className="w-4 h-4" />
                  </div>

                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Email Address
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>

                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>

                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium text-sm rounded-xl flex items-center justify-center space-x-2 shadow-lg active:scale-[0.99] transition-all"
            >
              <span>
                {isLogin ? "Sign In" : "Create Account"}
              </span>

              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-slate-800/60 text-center text-sm">
            <span className="text-gray-400">
              {isLogin
                ? "Don't have an account?"
                : "Already have an account?"}
            </span>{" "}

            <button
              onClick={() => {
                setAlertMessage("");
                setIsLogin(!isLogin);
              }}
              className="text-cyan-400 font-medium hover:underline"
            >
              {isLogin ? "Sign up free" : "Log in here"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}