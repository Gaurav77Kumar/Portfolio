import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ShieldCheck, Cpu, Code2, Award, Zap } from "lucide-react";

export const About: React.FC = () => {
  const { theme } = useTheme();

  const stats = [
    { label: "DSA Problems Solved", value: "200+", icon: <Code2 className="text-teal h-5 w-5" /> },
    { label: "Hackathon Wins", value: "1st Place", icon: <Award className="text-purple h-5 w-5" /> },
    { label: "Blockchain Commits", value: "150+", icon: <ShieldCheck className="text-success h-5 w-5" /> },
    { label: "Core Projects Completed", value: "8+", icon: <Cpu className="text-teal h-5 w-5" /> },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-purple/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-800 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-16 h-1 bg-teal mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 border border-dashed border-teal/30 rounded-full"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 border border-dashed border-purple/35 rounded-full"
              />

              <svg
                viewBox="0 0 100 100"
                className="w-[85%] h-[85%] text-slate-700 dark:text-slate-300 relative z-10"
              >
                <line x1="50" y1="15" x2="80" y2="35" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                <line x1="80" y1="35" x2="80" y2="65" stroke="currentColor" strokeWidth="0.3" />
                <line x1="80" y1="65" x2="50" y2="85" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                <line x1="50" y1="85" x2="20" y2="65" stroke="currentColor" strokeWidth="0.3" />
                <line x1="20" y1="65" x2="20" y2="35" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2,2" />
                <line x1="20" y1="35" x2="50" y2="15" stroke="currentColor" strokeWidth="0.3" />
                <line x1="50" y1="15" x2="50" y2="85" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
                <line x1="20" y1="35" x2="80" y2="65" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />
                <line x1="80" y1="35" x2="20" y2="65" stroke="currentColor" strokeWidth="0.2" opacity="0.5" />

                <motion.circle
                  cx="50"
                  cy="50"
                  r="12"
                  fill="url(#coreGradient)"
                  animate={{ r: [10, 13, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />

                <circle cx="50" cy="15" r="3" fill="#00d4ff" className="glow-teal" />
                <circle cx="80" cy="35" r="3" fill="#6c63ff" />
                <circle cx="80" cy="65" r="3" fill="#00d4ff" />
                <circle cx="50" cy="85" r="3" fill="#00e676" />
                <circle cx="20" cy="65" r="3" fill="#6c63ff" />
                <circle cx="20" cy="35" r="3" fill="#00d4ff" />

                <defs>
                  <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#00d4ff" />
                    <stop offset="60%" stopColor="#6c63ff" />
                    <stop offset="100%" stopColor="#0a0e1a" />
                  </radialGradient>
                </defs>
              </svg>

              <div className="absolute top-2 right-2 text-xs font-mono text-teal/40">SHA-256</div>
              <div className="absolute bottom-2 left-2 text-xs font-mono text-purple/40">ECDSA</div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="font-poppins font-bold text-2xl mb-4 text-slate-800 dark:text-white">
                Designing Secure, Cryptographic, and Smart Solutions
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                As a software engineer, I bridge the gap between low-level architectural stability and high-level
                dynamic application integration. My passion lies in constructing **decentralized architectures**,
                optimizing **REST/P2P data flows**, and incorporating modern **semantic vector AI models** to create
                frictionless, production-grade applications.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-teal/10 p-1.5 rounded-lg text-teal">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-slate-700 dark:text-slate-200">Cryptographic Systems</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Engineered Bitcoin-style transaction verification chains using UTXO ledgers, ECDSA (BouncyCastle) secp192v1 key cryptography, dynamic Proof-of-Work adjustments, and fee-prioritized mempool controls.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-purple/10 p-1.5 rounded-lg text-purple">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-slate-700 dark:text-slate-200">Full-Stack Development</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Crafting highly scalable web apps using React.js/Next.js, Node.js, Express, and MongoDB. Strong focus on RESTful design, microservices division, secure JWT-cookie auth, OTP mechanisms, and optimized asset delivery via Cloudinary.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="mt-1 bg-success/10 p-1.5 rounded-lg text-success">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h4 className="font-poppins font-bold text-slate-700 dark:text-slate-200">AI/ML Orchestration</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Integrating semantic match APIs utilizing MiniLM-L12 embeddings to perform vector-similarity similarity calculations. Powering resume ranking logic, indexing models, and contextual recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex items-center space-x-4 transition-all ${theme === "dark"
                        ? "bg-navy/40 border-white/5 hover:bg-navy/60"
                        : "bg-white border-black/5 hover:shadow-md"
                      }`}
                  >
                    <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="font-poppins font-extrabold text-2xl text-slate-800 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-slate-400 dark:text-slate-400 uppercase tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
