import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react"
import SyntaxHighlighter from "react-syntax-highlighter";
import { codeExamples, floatingCards } from "../data/codeExamples";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

//import { motion } from "framer-motion"


export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState("App.jsx");

  useEffect(() => {
    function handleMouseMove(event) {
      setMousePosition({ x: event.clientX, y: event.clientY });
      
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => {      window.removeEventListener("mousemove", handleMouseMove);
    }  }, []);

    const currentFloatingCard = floatingCards[activeTab];

  return (
    <section className=" relative min-h-screen flex items-center justify-center pt-6 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-30 style={{
         background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.5), transparent)`,
          }} z-0" />

          <div className="absolute top-20 right-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-cyan-500/10 rounded-full blur-3xl
           animate-pulse" />
           <div className="absolute bottom-28 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-cyan-500/10 rounded-full 
           blur-3xl animate-pulse delay-1000" />

          <div className="max-w-7xl mx-auto text-center relative w-full"> 
          <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center relative">
            <div>
              <div className ="inline-flex items-center space-x-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-500/20
               rounded-full mb-4 sm:mb-6 animate-in slide-in-from-bottom duration-700">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-xs sm:text-sm text-blue-300"> Introducing Shuri AI</span>
              </div>
              <h1 className=" text-5xl sm:text-3xl md:text-4xl 
               lg:text-5xl font-semibold mb-4 sm:mb-6 animate-in  slide-in-from-bottom duration-700 delay-100 leading-tight"> 

                <span>The </span><span className="text-blue-500 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text block mb-1 sm:mb-2">Dictionary</span>
                <span> You can trust</span>
                <span> Shuri </span><span className="text-orange-500">AI</span>
              </h1>
                <p className="text-md sm:text-base lg:text-lg text-gray-400 max-w-2xl mx-auto lg:mx-0 mb-6 sm:mb-8 animate-in slide-in-from-bottom duration-700 delay-200 leading-relaxed">
                  Discover accurate definitions, synonyms, and context. The ultimate tool to elevate your vocabulary and perfect your writing skills.
                </p>
                
                <div className=" flex flex-col sm:flex-row items-center justify-center lg:justify-smart gap-3 sm:gap-4 mb-8 sm:mb-12 
                animate-in slide-in-from-bottom duration-700 delay-300">
                  <a href="/auth"><button className="group w-full h-18 sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-b from-blue-600  to-blue-400 
                  rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-102 flex items-center justify-center space-x-2">
                    <span> Get Started</span>
                    <ArrowRight className="w-4 h-4  sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300"/>
                  </button></a>
                </div>
            </div>

           <div className="relative order-2 w-full">
              <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10">
                  <div className="bg-gradient-to-br from gray-900/20 to-gray-800/20 backdrop-blur-sm round-lg 
                  overflow-hidden h-[280px] sm:w-[full] lg:h-[450px] border border-white/5 rounded-lg">
                    {/* IDE HEADER HERE  */}
                    <div className="flex items-center justify-between px-3 
                    sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
                      <div className="flex items-center space-x-1  sm:space-x-2">
                          <div className="flex items-center space-x-1  sm:space-x-2">
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-orange-500" />
                            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                         </div>
                      <span className="text-xs sm:text-sm text-gray-300"> Shuri AI </span>
                      </div>
                      <ChevronDown className="w-3 h-3 sm:w-4 text-gray-400" />
                    </div>

                    <div className="relative h-full p-3 sm:p-4">
                      {/* file tabs here */}
                      <div className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-3 overflow-x-auto">
                         <button onClick={() => setActiveTab("App.jsx")}
                          className={`px-3 py-2 backdrop-blur-sm text-sx sm:text-sm rounded-t-lg border ${
                            activeTab === "App.jsx" ? "bg-blue-500/10 text-white-300 border-blue-400/20" : 
                            "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-gray-300"
                          } transition-200 duration-200 whitespace-nowrap`}>
                          App.jsx
                        </button>
                        <button onClick={() => setActiveTab("Hero.jsx")}
                          className={`px-3 py-2 backdrop-blur-sm text-sx sm:text-sm rounded-t-lg border ${
                            activeTab === "Hero.jsx" ? "bg-blue-500/10 text-white-300 border-blue-400/20" : 
                            "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-gray-300"
                          } transition-200 duration-200 whitespace-nowrap`}>
                          Hero.jsx
                        </button>
                         <button onClick={() => setActiveTab("Navbar.jsx")}
                          className={`px-3 py-2 backdrop-blur-sm text-sx sm:text-sm rounded-t-lg border ${
                            activeTab === "Navbar.jsx" ? "bg-blue-500/10 text-white-300 border-blue-400/20" : 
                            "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-gray-300"
                          } transition-200 duration-200 whitespace-nowrap`}>
                          Navbar.jsx
                        </button>
                      </div>
                      {/* code content here */}
                      <div className="relative overflow-hidden flex-grow">
                        <SyntaxHighlighter language="JavaScript" style={nightOwl} customStyle={{
                          margin: 0,
                          borderRadius: "8px",
                          fontSize: "11px",
                          lineHeight: "1.4",
                          height: "100%",
                          overflowX: "auto",
                          textAlign: "left",
                          border: "1px solid #3c3c3c",}}>
                          {codeExamples[activeTab]}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  </div>
                    {/* floating cards here */}
                    <div className={`hidden lg:block absolute bottom-4 right-4 
                      transform translate-x-8 translate-y-8 w-72
                      bg-blue-500/40 rounded-tl-lg
                         rounded-tr-lg p-4 border border-blue-500/40"
                          ${currentFloatingCard.icon} backdrop-blur-xl rounded-lg shadow-lg`}>

                        <div className="flex items-center space-x-2 mb-2" >
                          <div className={`w-6 h-6 ${currentFloatingCard.iconColor} flex items-center justify-center text-sm font-bold`}>{currentFloatingCard.icon}</div>
                          <span className={`text-sm font-medium ${currentFloatingCard.textColor}`}>{currentFloatingCard.title}</span>
                        </div>

                        <div className={`text-sm text-left ${currentFloatingCard.contentColor}`}>{currentFloatingCard.content}</div>
                    </div>
              </div>
           </div>
          </div>
          </div>
    </section> 
  );
}