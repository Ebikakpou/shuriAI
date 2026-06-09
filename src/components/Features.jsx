import SyntaxHighlighter from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/esm/styles/hljs";

const features = [
  {
    title: "Accurate Definition",
    description: "Search for all kinds of words and get accurate meaning. Uncover the exact meaning of any word instantly with AI-driven lookups that break down complex terminology with absolute precision.",
    codeSnipet: `import { ShuriAI } from "@shuri/ai";

async function getDefinition(word) {
  const dictionary = new ShuriAI({ apiKey: "shuri_prod_99x" });
  
  // Fetches accurate definitions and uncovers hidden ambiguity
  const response = await dictionary.define(word);
  return response.meaning;
}`,
    imagePosition: "left",
  },
  {
    title: "Synonyms Options",
    description: "You're not just getting the definition alone, you're getting the synonyms of the word you search.Expand your vocabulary on the fly with a smart selection of alternative word choices tailored to diversify your expression and polish your prose.",
    codeSnipet: `import { useDictionary } from "./hooks";

export default function SynonymsList({ word }) {
  // Elevates vocabulary by fetching alternative word choices
  const { synonyms, loading } = useDictionary(word);

  if (loading) return <p>Finding alternatives...</p>;
  return (
    <ul>
      {synonyms.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}`,
    imagePosition: "left",
  }, 
  {
    title: "Get More Context",
    description: "Our AI also gives you contextual background of the word you search. Go beyond simple definitions by analyzing exactly how a word lives in a sentence, ensuring your tone always hits the mark.",
    codeSnipet: `const shuri = require("@shuri/ai-context");

// Analyzes surrounding text to find the perfect phrasing
const passage = "The financial banks were closed today.";
const wordContext = await shuri.analyze({
  text: passage,
  targetWord: "banks"
});

console.log(wordContext.domain); // Output: "Finance/Economics"`,
    imagePosition: "left",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Your trusted dictionary
            </span>
            <br />
            <span className="bg-gradient-to-b from-blue-500/20 to-cyan-300 bg-clip-text text-transparent">
              AI Powered
            </span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-20 lg:space-y-32">
          {features.map((feature, key) => (
            <div
              key={key}
              className={`flex flex-col lg:flex-row items-center gap-8 sm:gap-12 ${
                key % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* 1. Code Section Container */}
              <div className="w-full lg:w-1/2 min-w-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-purple-500/20
                  rounded-xl sm:rounded-2xl transition-all duration-500" /> 
                  
                  <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 
                  rounded-xl sm:rounded-2xl p-4 sm:p-6 overflow-hidden group-hover:border-blue-600/50 transition-all duration-300">
                    
                    {/* IDE Interface */}
                    <div className="bg-gray-950 rounded-lg p-3 sm:p-4 font-mono text-sm">
                      <div className="flex items-center space-x-1 sm:space-x-2 mb-3 sm:mb-4">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-500" />
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-orange-500" />
                          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                        </div>
                        <span className="text-gray-400 ml-2 sm:ml-4 text-xs sm:text-sm">
                          {feature.title === "Synonyms Options" ? "SynonymsList.jsx" : feature.title === "Get More Context" ? "context.js" : "api.js"}
                        </span>
                      </div>
                      
                      <div>
                        <SyntaxHighlighter
                          language="javascript"
                          style={nightOwl}
                          wrapLines={true}
                          lineProps={{ style: { whiteSpace: 'pre-wrap', overflowWrap: 'break-word' } }}
                          customStyle={{
                            margin: 0,
                            background: "transparent",
                            borderRadius: "8px",
                            fontSize: "0.75rem",
                            lineHeight: "1.5",
                            height: "100%",
                            textAlign: "left",
                            
                          }}
                        >
                          {feature.codeSnipet}
                        </SyntaxHighlighter>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* 2. Text Section Container */}
              <div className="w-full lg:w-1/2">
                <div className="max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                  <h3 className="text-4xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}