import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // ⚡ Added Link for fast router navigation transitions
import { Search, History, LogOut, Globe, Volume2, AlertTriangle, CreditCard, User, Sparkles, Upload, Shield, Clock } from "lucide-react";

export default function Dashboard({ onLogout }) { // ⚡ Destructured onLogout from App props
  const navigate = useNavigate(); 
  
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("search"); 
  const [searchKeyword, setSearchKeyword] = useState("");
  const [dictionaryData, setDictionaryData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState("");
  const [uploadStatus, setUploadStatus] = useState({ message: "", type: "" });

  useEffect(() => {
    const savedUser = localStorage.getItem("shuri_user");
    const token = localStorage.getItem("shuri_token");

    if (!savedUser || !token) {
      localStorage.clear(); 
      if (onLogout) onLogout(); // Reset auth state in App tracking layer
      navigate("/auth", { replace: true }); 
      return;
    }

    try {
      const parsedUser = JSON.parse(savedUser);
      if (!parsedUser.plan) parsedUser.plan = "Standard"; 
      
      setUser(parsedUser);
      setSearchHistory(parsedUser.searchHistory || []);
    } catch (e) {
      console.error("Failed to parse user session metadata:", e);
      localStorage.clear();
      if (onLogout) onLogout();
      navigate("/auth", { replace: true });
    }
  }, [navigate, onLogout]);

  const handleDictionarySearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;

    setIsLoading(true);
    setSearchError("");
    setDictionaryData(null);

    try {
      const apiResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchKeyword.trim().toLowerCase()}`);
      if (!apiResponse.ok) throw new Error("Word declaration not identified within indexing records.");

      const data = await apiResponse.json();
      setDictionaryData(data[0]);

      const token = localStorage.getItem("shuri_token");
      const backendResponse = await fetch("http://localhost:5000/api/dictionary/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ word: searchKeyword.trim() })
      });

      if (backendResponse.ok) {
        const updateData = await backendResponse.json();
        setSearchHistory(updateData.updatedHistory);
        const updatedUserMetadata = { ...user, searchHistory: updateData.updatedHistory };
        localStorage.setItem("shuri_user", JSON.stringify(updatedUserMetadata));
        setUser(updatedUserMetadata);
      }
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setUploadStatus({ message: "Image is too large. Keep it under 2MB.", type: "error" });
      return;
    }

    setUploadStatus({ message: "Encoding profile file vector...", type: "info" });

    const reader = new FileReader();
    reader.readAsDataURL(file); 
    reader.onloadend = async () => {
      const base64ImageString = reader.result;

      try {
        const token = localStorage.getItem("shuri_token");
        const response = await fetch("http://localhost:5000/api/dictionary/profile-picture", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ profilePicture: base64ImageString })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.msg || "Failed to update profile canvas.");

        const updatedUserMetadata = { ...user, profilePicture: base64ImageString };
        localStorage.setItem("shuri_user", JSON.stringify(updatedUserMetadata));
        setUser(updatedUserMetadata);
        
        setUploadStatus({ message: "Profile image synchronized successfully! ✨", type: "success" });
      } catch (err) {
        setUploadStatus({ message: err.message, type: "error" });
      }
    };
  };

  const playPronunciation = () => {
    if (!dictionaryData || !dictionaryData.phonetics) return;
    const phoneticWithAudio = dictionaryData.phonetics.find(p => p.audio !== "");
    if (phoneticWithAudio) {
      const audio = new Audio(phoneticWithAudio.audio);
      audio.play();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    if (onLogout) onLogout(); // Inform parent app memory has cleared
    navigate("/auth", { replace: true });
  };

  const getPlanBadgeColor = (plan) => {
    switch (plan?.toLowerCase()) {
      case "starter": return "bg-slate-800 border-slate-700 text-slate-400";
      case "enterprise": return "bg-purple-500/10 border-purple-500/20 text-purple-400";
      default: return "bg-cyan-500/10 border-cyan-500/20 text-cyan-400";
    }
  };

  if (!user) {
    return (
      <div className="h-[calc(100vh-4rem)] bg-slate-950 flex items-center justify-center text-slate-400 font-medium">
        Hydrating Dashboard System...
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row font-sans antialiased text-slate-100 min-h-[calc(100vh-4rem)]">
      
      {/* 🎛️ SIDEBAR CONTROL COMPONENT */}
      <aside className="w-full md:w-64 bg-slate-900/20 md:bg-slate-900/40 backdrop-blur-md border-b md:border-b-0 md:border-r border-slate-900 p-5 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-800/60 pb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white shadow-lg">S</div>
            <span className="text-base font-bold tracking-wide text-white">Shuri<span className="text-cyan-400">AI</span> Studio</span>
          </div>

          <nav className="space-y-1">
            {/* ⚡ NEW LINK: Navigates back onto the home marketing presentation screen */}
            <Link 
              to="/" 
              className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 transition-all cursor-pointer mb-2 border border-transparent"
            >
              <Globe className="w-4 h-4 text-orange-500" />
              <span>View Landing Page</span>
            </Link>

            <button 
              onClick={() => setActiveTab("search")}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "search" ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-cyan-400 shadow-sm" : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"}`}
            >
              <Search className="w-4 h-4" />
              <span>Search Workspace</span>
            </button>

            <button 
              onClick={() => setActiveTab("account")}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "account" ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-cyan-400 shadow-sm" : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"}`}
            >
              <User className="w-4 h-4" />
              <span>Account Profile</span>
            </button>

            <button 
              onClick={() => setActiveTab("plans")}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${activeTab === "plans" ? "bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 text-cyan-400 shadow-sm" : "border border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/50"}`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Subscription Plan</span>
            </button>
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center space-x-3 truncate">
            <img src={user.profilePicture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} alt="Avatar" className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 shrink-0 object-cover" />
            <div className="flex flex-col text-left truncate">
              <span className="text-xs font-bold text-slate-200 truncate leading-tight">{user.name}</span>
              <span className={`mt-0.5 inline-block text-[9px] font-extrabold tracking-widest uppercase border rounded px-1 max-w-max ${getPlanBadgeColor(user.plan)}`}>{user.plan}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="text-slate-500 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-900/60 transition-colors cursor-pointer">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 🖼️ WORKSPACE CONTAINER VIEW SHELLS */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-5xl w-full mx-auto">
        
        {activeTab === "search" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
            <div className="lg:col-span-2 space-y-5">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 shadow-xl backdrop-blur-md">
                <form onSubmit={handleDictionarySearch} className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      placeholder="Query definition maps across real-time APIs..."
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950/60 border border-slate-800/80 rounded-lg text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 text-xs transition-all"
                    />
                  </div>
                  <button type="submit" disabled={isLoading} className="px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs font-semibold rounded-lg hover:opacity-95 shadow-md active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer">
                    {isLoading ? "Searching..." : "Search"}
                  </button>
                </form>
              </div>

              {searchError && (
                <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-lg flex items-center space-x-2 text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{searchError}</span>
                </div>
              )}

              {dictionaryData ? (
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 sm:p-6 shadow-xl space-y-5 backdrop-blur-md">
                  <div className="flex justify-between items-start border-b border-slate-800/40 pb-3">
                    <div>
                      <h1 className="text-2xl font-extrabold text-white tracking-tight capitalize">{dictionaryData.word}</h1>
                      {dictionaryData.phonetic && <p className="text-cyan-400 font-medium text-xs tracking-wide mt-0.5">{dictionaryData.phonetic}</p>}
                    </div>
                    {dictionaryData.phonetics?.some(p => p.audio) && (
                      <button onClick={playPronunciation} className="p-2.5 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 text-blue-400 rounded-lg active:scale-95 transition-all cursor-pointer">
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {dictionaryData.meanings.map((meaning, index) => (
                    <div key={index} className="space-y-2">
                      <span className="inline-block px-2 py-0.5 bg-slate-950 border border-slate-800 text-[9px] font-extrabold text-slate-400 uppercase tracking-widest rounded">{meaning.partOfSpeech}</span>
                      <ul className="space-y-2 pl-1 text-slate-300">
                        {meaning.definitions.slice(0, 2).map((def, defIndex) => (
                          <li key={defIndex} className="flex items-start space-x-2 text-xs leading-relaxed">
                            <span className="w-1 h-1 rounded-full bg-cyan-500 mt-1.5 shrink-0" />
                            <div>
                              <p className="text-slate-200">{def.definition}</p>
                              {def.example && <p className="text-slate-500 italic mt-0.5">Example: "{def.example}"</p>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                !searchError && (
                  <div className="border border-dashed border-slate-800/80 rounded-xl p-10 text-center text-slate-600 bg-slate-900/10">
                    <Globe className="w-6 h-6 mx-auto text-slate-800 mb-2" />
                    <p className="text-xs tracking-wide max-w-xs mx-auto">Enter a keyword search phrase up top to fire language queries.</p>
                  </div>
                )
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 shadow-xl backdrop-blur-md space-y-3">
                <h3 className="text-[10px] font-bold text-slate-400 flex items-center space-x-2 uppercase tracking-wider border-b border-slate-800/60 pb-2">
                  <History className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Search Log History</span>
                </h3>
                <div className="space-y-1.5 max-h-[300px] overflow-y-auto pr-1">
                  {searchHistory && searchHistory.length > 0 ? (
                    searchHistory.slice().reverse().map((item, index) => (
                      <button key={index} onClick={() => setSearchKeyword(item.word)} className="w-full text-left bg-slate-950/30 hover:bg-slate-950/90 border border-slate-900 hover:border-slate-800/60 px-3 py-2 rounded-lg flex items-center justify-between transition-all group cursor-pointer">
                        <span className="text-xs font-medium text-slate-400 group-hover:text-cyan-400 capitalize truncate pr-2">{item.word}</span>
                        <Clock className="w-3 h-3 text-slate-700 group-hover:text-slate-500 transition-colors shrink-0" />
                      </button>
                    ))
                  ) : (
                    <p className="text-[11px] text-slate-600 text-center py-4">History stack evaluation evaluates empty.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "account" && (
          <div className="max-w-xl bg-slate-900/40 border border-slate-800/80 rounded-xl p-5 sm:p-6 shadow-xl backdrop-blur-md space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Account Identity Center</h2>
              <p className="text-xs text-slate-400 mt-0.5">Manage profile parameters and upload cloud avatar objects vectors.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-slate-800/50 pb-6">
              <div className="relative group">
                <img src={user.profilePicture || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"} alt="User Big Avatar" className="w-20 h-20 rounded-xl bg-slate-950 border-2 border-slate-800 object-cover shadow-2xl transition-all duration-200 group-hover:opacity-80" />
                <label className="absolute inset-0 flex items-center justify-center bg-slate-950/40 opacity-0 group-hover:opacity-100 rounded-xl cursor-pointer transition-all duration-200">
                  <Upload className="w-4 h-4 text-white" />
                  <input type="file" accept="image/*" onChange={handleProfileImageUpload} className="hidden" />
                </label>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <h4 className="text-base font-bold text-white leading-none">{user.name}</h4>
                <p className="text-xs text-slate-400">{user.email}</p>
                <div className="inline-flex items-center space-x-1 bg-slate-950 border border-slate-800 rounded-md px-2 py-0.5 text-[10px] text-slate-300 font-medium">
                  <Shield className="w-3 h-3 text-blue-500" />
                  <span>Verified Identity Member</span>
                </div>
              </div>
            </div>

            {uploadStatus.message && (
              <div className={`p-3 rounded-lg border text-[11px] font-semibold ${uploadStatus.type === "success" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : uploadStatus.type === "error" ? "bg-rose-500/10 border-rose-500/20 text-rose-400" : "bg-blue-500/10 border-blue-500/20 text-blue-400"}`}>
                {uploadStatus.message}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
              <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-lg">
                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Account Creation ID</span>
                <span className="text-xs font-mono text-slate-300">{user.id || user._id}</span>
              </div>
              <div className="p-3 bg-slate-950/40 border border-slate-800/60 rounded-lg">
                <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Index Cache Length</span>
                <span className="text-xs font-medium text-slate-300">{searchHistory?.length || 0} Total Logs</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "plans" && (
          <div className="space-y-5 animate-in fade-in duration-200 text-left">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">Enterprise Tiers & Plans</h2>
              <p className="text-xs text-slate-400 mt-0.5">Review processing performance and update core API mapping capabilities.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`border rounded-xl p-5 bg-slate-900/20 backdrop-blur-md flex flex-col justify-between ${user.plan?.toLowerCase() === "starter" ? "border-slate-700" : "border-slate-800/60"}`}>
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Starter Tier</span>
                  <h3 className="text-2xl font-black text-white">$0 <span className="text-xs font-medium text-slate-500">/mo</span></h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Basic structural lookup tracking capabilities.</p>
                </div>
                <button disabled className={`w-full py-2 mt-6 text-xs font-bold rounded-lg border ${user.plan?.toLowerCase() === "starter" ? "bg-slate-800 text-slate-400 border-transparent" : "border-slate-800 text-slate-300"}`}>
                  {user.plan?.toLowerCase() === "starter" ? "Active" : "Upgrade"}
                </button>
              </div>

              <div className={`border rounded-xl p-5 bg-slate-900/40 backdrop-blur-md relative flex flex-col justify-between ${user.plan?.toLowerCase() === "standard" ? "border-cyan-500/40 ring-1 ring-cyan-500/20" : "border-slate-800/60"}`}>
                {user.plan?.toLowerCase() === "standard" && <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-bold tracking-wider uppercase rounded">Current Tier</div>}
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Standard Pro</span>
                  </span>
                  <h3 className="text-2xl font-black text-white">$19 <span className="text-xs font-medium text-slate-500">/mo</span></h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Unlimited query analysis metrics with persistent backup.</p>
                </div>
                <button disabled={user.plan?.toLowerCase() === "standard"} className={`w-full py-2 mt-6 text-xs font-bold rounded-lg transition-all ${user.plan?.toLowerCase() === "standard" ? "bg-cyan-500/10 border border-cyan-500/20 text-cyan-400" : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm active:scale-95 cursor-pointer"}`}>
                  {user.plan?.toLowerCase() === "standard" ? "Active" : "Upgrade"}
                </button>
              </div>

              <div className={`border rounded-xl p-5 bg-slate-900/20 backdrop-blur-md flex flex-col justify-between ${user.plan?.toLowerCase() === "enterprise" ? "border-purple-500/40" : "border-slate-800/60"}`}>
                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">Enterprise</span>
                  <h3 className="text-2xl font-black text-white">$99 <span className="text-xs font-medium text-slate-500">/mo</span></h3>
                  <p className="text-xs text-slate-400 leading-relaxed">Low-latency language indexing vectors with deep system optimization.</p>
                </div>
                <button disabled className={`w-full py-2 mt-6 text-xs font-bold rounded-lg border ${user.plan?.toLowerCase() === "enterprise" ? "bg-purple-500/10 text-purple-400 border-transparent" : "border-slate-800 text-slate-300"}`}>
                  {user.plan?.toLowerCase() === "enterprise" ? "Active" : "Upgrade"}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}