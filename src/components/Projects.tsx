import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ExternalLink, X, ShieldAlert, Terminal, ArrowRight, ShieldCheck, Database } from "lucide-react";

// GitHub Icon
const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


interface ProjectDetails {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  tags: string[];
  features: string[];
  github: string;
  demoUrl?: string;
  svgGraphic: React.ReactNode;
  deepDive: {
    architecture: string;
    challenges: string[];
    decisions: string;
  };
}

export const Projects: React.FC = () => {
  const { theme } = useTheme();
  const [activeProject, setActiveProject] = useState<ProjectDetails | null>(null);

  const projectsData: ProjectDetails[] = [
    {
      title: "Java-Blockchain Engine",
      subtitle: "Bitcoin-Style UTXO Core Engine",
      tagline: "Cryptographic consensus engine built in Java from the ground up.",
      description:
        "Built a modular, low-level Bitcoin-style UTXO ledger featuring full cryptographic wallets, fee-prioritized mempool structures, and dynamic mining difficulty adjustments.",
      tags: ["Java", "BouncyCastle", "GSON", "ECDSA secp192v1", "P2P Sockets", "SHA-256"],
      features: [
        "UTXO accounting model preventing double-spending via coin state validation",
        "Key-pair generation and transaction signing using ECDSA (BouncyCastle)",
        "Fee-prioritized memory pool matching top-miner payout strategies",
        "Dynamic Proof of Work (PoW) difficulty adjusting target leading zeros",
      ],
      github: "https://github.com/Gaurav77Kumar/BlockChain",
      svgGraphic: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-teal">
          <rect width="200" height="120" rx="12" fill="currentColor" fillOpacity="0.03" />
          <circle cx="50" cy="60" r="16" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="60" r="16" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
          <circle cx="150" cy="60" r="16" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
          <line x1="66" y1="60" x2="84" y2="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
          <line x1="116" y1="60" x2="134" y2="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" />
          <path d="M50 40 L100 25 L150 40" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <path d="M50 80 L100 95 L150 80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
          <text x="50" y="63" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor">B0</text>
          <text x="100" y="63" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor">B1</text>
          <text x="150" y="63" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor">B2</text>
        </svg>
      ),
      deepDive: {
        architecture:
          "The engine implements a 4-layered architecture: Cryptography (ECDSA/SHA256), Transaction Logic (UTXO input/output validation, unlocking scripts), Mempool Queue (Priority fees), and Consensus Protocol (PoW & difficulty checks). Node synchronization runs via asynchronous P2P socket brokers broadcasts.",
        challenges: [
          "Double-spend validation in multithreaded environments: Resolved by using concurrent hashes to map unspent outputs.",
          "Preventing transaction malformation: Implemented cryptographic verification checkups on transaction hashes before queuing.",
        ],
        decisions:
          "Chose ECDSA prime192v1 over standard secp256k1 for optimal resource consumption, balancing signature verification speed and cryptographic security on low-memory devices.",
      },
    },
    {
      title: "FileShare Secure Cloud",
      subtitle: "Full-Stack Security Platform",
      tagline: "End-to-end encrypted sharing platform with download analytics.",
      description:
        "Engineered a secure cloud-sharing service supporting JWT authentication, double-encrypted files hosted on Cloudinary, dynamic link expiration, and analytics mapping.",
      tags: ["React 19", "Node.js", "MongoDB", "Cloudinary", "JWT Cookie", "OTP verification", "Bcrypt.js"],
      features: [
        "JWT-based security claims backed by multi-level Cookie storage",
        "Direct API chunk stream piping to Cloudinary CDNs with storage bounds",
        "Download limit controllers, password locks, and auto-expiring hashes",
        "Visual QR Code generation for offline scanning and download hooks",
      ],
      github: "https://github.com/Gaurav77Kumar/Fille-Sharing",
      svgGraphic: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-purple">
          <rect width="200" height="120" rx="12" fill="currentColor" fillOpacity="0.03" />
          <rect x="70" y="35" width="60" height="50" rx="6" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
          <path d="M90 60 L100 50 L110 60 M100 50 L100 75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="42" r="3" fill="currentColor" />
          <line x1="50" y1="95" x2="150" y2="95" stroke="currentColor" strokeWidth="0.8" opacity="0.3" />
          <text x="100" y="105" fontSize="7" fontFamily="monospace" textAnchor="middle" fill="currentColor">CLOUDINARY_CDN</text>
        </svg>
      ),
      deepDive: {
        architecture:
          "Utilizes an Express backend serving as a streaming proxy to filter and pipe files to Cloudinary. Frontend utilizes React 19 to handle chunk loads directly. MongoDB acts as a transaction record and access-rights validator store.",
        challenges: [
          "Large file memory bottlenecks: Bypassed server-side buffer overflows by utilizing Multer streams to pipe directly to Cloudinary API targets.",
          "Preventing unauthorized downloads: Implemented route tokens verified on each download request, blocking links after expiry.",
        ],
        decisions:
          "Opted for JWT verification cookies with HTTP-only flags to block Cross-Site Scripting (XSS) extraction vectors, alongside standard Bcrypt.js password salts.",
      },
    },
    {
      title: "Yogya-Setu AI Platform",
      subtitle: "AI Internship Semantic Matcher",
      tagline: "AI-driven placement platform matching resumes to opportunities.",
      description:
        "Orchestrated a semantic translation and ranking engine powered by Python ML microservices, MiniLM-L12 encoders, and job application tracking.",
      tags: ["React.js", "Node.js", "Python", "MiniLM-L12", "Vector Search", "Express", "OTP Module"],
      features: [
        "Semantic matching matching resumes to job details with cosine similarity",
        "Python Flask microservice hosting vector transformers for similarity metrics",
        "Two-factor verification via Nodemailer email OTP verification modules",
        "Unified dashboard tracking active applicant statuses and review flows",
      ],
      github: "https://github.com/Gaurav77Kumar/Yogya-Setu",
      svgGraphic: (
        <svg viewBox="0 0 200 120" className="w-full h-full text-teal">
          <rect width="200" height="120" rx="12" fill="currentColor" fillOpacity="0.03" />
          {/* Neural Net grid */}
          <circle cx="60" cy="40" r="4" fill="currentColor" />
          <circle cx="60" cy="80" r="4" fill="currentColor" />
          <circle cx="100" cy="60" r="4" fill="currentColor" />
          <circle cx="140" cy="40" r="4" fill="currentColor" />
          <circle cx="140" cy="80" r="4" fill="currentColor" />
          
          <line x1="64" y1="40" x2="96" y2="60" stroke="currentColor" strokeWidth="0.8" />
          <line x1="64" y1="80" x2="96" y2="60" stroke="currentColor" strokeWidth="0.8" />
          <line x1="104" y1="60" x2="136" y2="40" stroke="currentColor" strokeWidth="0.8" />
          <line x1="104" y1="60" x2="136" y2="80" stroke="currentColor" strokeWidth="0.8" />
          <line x1="60" y1="44" x2="60" y2="76" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          <line x1="140" y1="44" x2="140" y2="76" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
          
          <text x="100" y="48" fontSize="8" fontFamily="monospace" textAnchor="middle" fill="currentColor">AI MATCH</text>
        </svg>
      ),
      deepDive: {
        architecture:
          "Split into a Node/Express backend representing the business controller and client authentication endpoints, and a python backend running SentenceTransformers. Communication between layers runs via REST endpoints.",
        challenges: [
          "Text embedding translation delays: Standardized on MiniLM-L12 encoders, reducing embedding processing time under 150ms per resume.",
          "Application tracking sync: Designed a decoupled database listener to automatically alert applicants on status change.",
        ],
        decisions:
          "Chose MiniLM-L12 model to run efficiently on standard CPU-bound instances, avoiding the high cost and overhead of dedicated GPU nodes while retaining 92% of the matching accuracy of larger models.",
      },
    },
  ];

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-800 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-teal mx-auto rounded-full" />
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-2xl border flex flex-col justify-between overflow-hidden hover-lift h-full ${
                theme === "dark"
                  ? "bg-navy/40 border-white/5"
                  : "bg-white border-black/5 shadow-sm"
              }`}
            >
              <div>
                {/* SVG Vector Visual */}
                <div className="p-6 pb-2 flex items-center justify-center bg-slate-100/40 dark:bg-navy/80 h-44 relative overflow-hidden">
                  {project.svgGraphic}
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-mono text-purple dark:text-teal font-semibold block mb-1">
                    {project.subtitle}
                  </span>
                  <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-white mb-3">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-500 dark:text-slate-400 font-sans list-disc list-inside">
                    {project.features.slice(0, 2).map((feature, fIdx) => (
                      <li key={fIdx} className="truncate">
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.slice(0, 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-white/5 text-slate-400">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Links */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-navy/20">
                <div className="flex space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-teal hover:bg-teal/10 transition-all"
                    title="View GitHub Source"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-teal hover:bg-teal/10 transition-all"
                      title="Live Demo"
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveProject(project)}
                  className="inline-flex items-center space-x-1 text-xs font-poppins font-bold text-purple hover:text-teal hover:underline transition-all"
                >
                  <span>Deep-Dive Technical</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tech Deep-Dive Modal Overlay */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className={`w-full max-w-2xl rounded-2xl border max-h-[85vh] overflow-y-auto ${
                theme === "dark"
                  ? "bg-navy-dark border-white/10 text-slate-200"
                  : "bg-white border-black/10 text-slate-800"
              }`}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between sticky top-0 bg-white/90 dark:bg-navy-dark/90 backdrop-blur-md z-10">
                <div>
                  <span className="text-xs font-mono text-purple dark:text-teal font-semibold">
                    {activeProject.subtitle}
                  </span>
                  <h3 className="font-poppins font-bold text-2xl mt-0.5">
                    {activeProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveProject(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="font-poppins font-bold text-sm text-slate-400 uppercase tracking-wide mb-2 flex items-center space-x-2">
                    <Terminal size={14} className="text-teal" />
                    <span>System Architecture Overview</span>
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                    {activeProject.deepDive.architecture}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-poppins font-bold text-sm text-slate-400 uppercase tracking-wide mb-2.5 flex items-center space-x-2">
                      <ShieldCheck size={14} className="text-purple" />
                      <span>Security & Optimization Decisions</span>
                    </h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                      {activeProject.deepDive.decisions}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-poppins font-bold text-sm text-slate-400 uppercase tracking-wide mb-2.5 flex items-center space-x-2">
                      <ShieldAlert size={14} className="text-red-500" />
                      <span>Engineering Challenges Solved</span>
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                      {activeProject.deepDive.challenges.map((challenge, idx) => {
                        const parts = challenge.split(":");
                        return (
                          <li key={idx} className="flex items-start space-x-2 font-sans">
                            <span className="text-teal font-bold select-none">✔</span>
                            <span>
                              <strong>{parts[0]}:</strong>{parts[1]}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Full Tech tags */}
                <div>
                  <h4 className="font-poppins font-bold text-sm text-slate-400 uppercase tracking-wide mb-2.5 flex items-center space-x-2">
                    <Database size={14} className="text-teal" />
                    <span>Complete Dependencies Stack</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-teal"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-200 dark:border-white/10 flex justify-between bg-slate-50/50 dark:bg-navy/20">
                <a
                  href={activeProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 text-sm font-poppins font-semibold transition-all"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>View Repository</span>
                </a>

                {activeProject.demoUrl && (
                  <a
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-teal text-slate-900 text-sm font-poppins font-bold hover:bg-teal-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-teal/10"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
