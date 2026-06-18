import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  badge: React.ReactNode;
}

export const Certifications: React.FC = () => {
  const { theme } = useTheme();

  const certificationsList: Certification[] = [
    {
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      date: "2025",
      credentialId: "POSTMAN-API-2025-A8F",
      verifyUrl: "https://badgr.com",
      badge: (
        <svg viewBox="0 0 44 44" className="w-12 h-12 text-amber-500">
          <circle cx="22" cy="22" r="20" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
          <path
            d="M22 8 C16 8, 12 12, 12 18 C12 25, 22 36, 22 36 C22 36, 32 25, 32 18 C32 12, 28 8, 22 8 Z"
            fill="currentColor"
            fillOpacity="0.15"
            stroke="currentColor"
            strokeWidth="1.2"
          />
          <circle cx="22" cy="18" r="4" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Introduction to IoT and Embedded Systems",
      issuer: "Coursera (UC Irvine)",
      date: "2024",
      credentialId: "COURSERA-IOT-UCI-91A2",
      verifyUrl: "https://coursera.org",
      badge: (
        <svg viewBox="0 0 44 44" className="w-12 h-12 text-blue-500">
          <circle cx="22" cy="22" r="20" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="1" />
          <path
            d="M14 16 L22 11 L30 16 L30 28 L22 33 L14 28 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="2,2"
          />
          <path d="M18 18 L22 15 L26 18 L26 26 L22 29 L18 26 Z" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1" />
          <circle cx="22" cy="22" r="2" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <section id="certifications" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-800 dark:text-white mb-4">
            Professional Certifications
          </h2>
          <div className="w-16 h-1 bg-teal mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certificationsList.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className={`p-6 rounded-2xl border flex items-start space-x-5 hover-lift ${
                theme === "dark"
                  ? "bg-navy/40 border-white/5"
                  : "bg-white border-black/5 shadow-sm"
              }`}
            >
              <div className="flex-shrink-0">{cert.badge}</div>

              <div className="flex-grow">
                <span className="text-[10px] font-mono font-bold text-teal uppercase tracking-wider block mb-1">
                  {cert.issuer}
                </span>
                <h3 className="font-poppins font-bold text-lg text-slate-800 dark:text-white leading-snug mb-2">
                  {cert.title}
                </h3>
                
                <div className="text-xs font-mono text-slate-400 dark:text-slate-500">
                  <div>Issued: {cert.date}</div>
                  <div className="mt-0.5">Credential ID: {cert.credentialId}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
