import { Check, Star } from "lucide-react";

const plans = [
  { 
    name: "Starter",
    price: "29.99",
    description: "Perfect for individuals and small teams",
    features: [
      "up to 5 team members",
      "10GB storage",
      "Basic Analytics",
      "Email Support",
      "API access",
      "Mobile app",
    ],
    mostPopular: false,
  },
  {
    name: "Standard",
    price: "79.25",
    description: "Best for growing businesses",
    features: [
      "up to 25 team members",
      "100GB storage",
      "advance search features",
      "Priority Support",
      "Mobile app",
      "API access",
    ],
    mostPopular: true,
  },   
  {
    name: "Enterprise",
    price: "199.50",
    description: "For large Organization",
    features: [
      "All in Standard",
      "Unlimited team members",
      "Unlimited search",
      "Unlimited storage",
      "API access",
      "Advance security",
      "smarter response"
    ],
    mostPopular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-16 sm:py-20 px-10 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
              Simple, Transparent
            </span>
            <br />
            <span className="bg-gradient-to-b from-blue-500/20 to-cyan-300 bg-clip-text text-transparent">
              Pricing Plans
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-6">
          {plans.map((plan, key) => (
            <div 
              key={key} 
              className={`relative bg-slate-900/50 backdrop-blur-sm border rounded-xl sm:rounded-2xl p-6 sm:p-8 transition-all duration-300 overflow-visible group flex flex-col justify-between h-full ${
                plan.mostPopular 
                  ? "border-blue-500 shadow-2xl shadow-blue-500/20 lg:scale-105" 
                  : "border-slate-800 hover:border-slate-700"
              }`}
            > 

              {plan.mostPopular && (
                <div className="absolute -top-2 sm:-top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="flex items-center space-x-1 px-3 sm:px-4 py-1 sm:py-1.5 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full text-xs sm:text-sm font-semibold shadow-lg text-white">
                    <Star className="w-3 h-3 sm:w-3 sm:h-3 fill-white" />  
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div>
                <div className="text-center mb-6 sm:mb-8"> 
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400 ml-1 sm:ml-2 text-sm sm:text-base"> / month</span>
                  </div>
                </div>

                {/* 🛠️ FIXED: Added a flex column layout for standard list alignment */}
                <ul className="space-y-4 mb-6 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3 text-gray-300 text-sm sm:text-base">
                      {/* Check Wrapper Icon with styling */}
                      <div className="flex-shrink-0 mt-0.5">
                        <Check className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional: Add a call to action button to make it look clean */}
              <button className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                plan.mostPopular 
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:opacity-90" 
                  : "bg-slate-800 text-gray-200 hover:bg-slate-700"
              }`}>
                Get Started
              </button>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}