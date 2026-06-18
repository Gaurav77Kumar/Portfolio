import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

interface SkillCard {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  title: string;
  skills: SkillCard[];
}

export const Skills: React.FC = () => {
  const { theme } = useTheme();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null); // Track hovered cards as "catIndex-skillIndex"

  const logos = {
    java: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M2 17.5c2.5 1.5 6 1.5 8.5 0s3.5-3 3.5-4.5h-2c0 1-.7 2-2 2.5s-3 .5-4.5 0-2.5-1.5-3.5-2v4z" />
        <path d="M6 10.5c.5-.5 1-1.5 1-2.5V5H5v3c0 .5-.2 1-.5 1.5v1z" />
        <path d="M10 9.5c.5-.5.8-1.2.8-2V4.5H8.5V7.5c0 .5-.2 1-.5 1.5v.5z" />
        <path d="M13 11.5c.5-.5.8-1.2.8-2V5.5H11.5V9.5c0 .5-.2 1-.5 1.5v.5z" />
      </svg>
    ),
    javascript: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2A10 10 0 1 0 22 12 10 10 0 0 0 12 2zm6.2 13.9a2.7 2.7 0 0 1-1.6.8 4 4 0 0 1-1.8.2 5.5 5.5 0 0 1-2.4-.6l.9-1.8a3.3 3.3 0 0 0 1.5.5c.6 0 1-.2 1-.5s-.2-.4-.8-.6c-1-.4-2-.8-2-2a2 2 0 0 1 1-1.7 4.2 4.2 0 0 1 2.2-.5 4.5 4.5 0 0 1 1.7.3l-.8 1.8a2.5 2.5 0 0 0-1-.2c-.5 0-.8.2-.8.4s.3.3.8.5c1.1.4 1.8.9 1.8 2a2.3 2.3 0 0 1-1.1 1.9zm-7.6-.8a2.6 2.6 0 0 1-1.5.6 2 2 0 0 1-2.2-2.1V9.4h2V13c0 .5.2.7.6.7a1.6 1.6 0 0 0 .9-.3V9.4h2v6.9z" />
      </svg>
    ),
    typescript: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M2 2h20v20H2z" fill="currentColor" />
        <path d="M20 18h-2.5v-3h-2.5v3H12V6h2.5v4.5h2.5V6H20v12zM9.5 15.5c0 1.5-1.2 2-2.5 2-1 0-1.8-.3-2.3-.7l.7-1.5a1.8 1.8 0 0 0 1.4.5c.5 0 .7-.2.7-.5v-6h2v6.2z" fill={theme === "dark" ? "#18181b" : "#fff"} />
      </svg>
    ),
    python: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M14.25.18c-.9 0-1.7.08-2.4.22-2.2.4-2.2 1.3-2.2 2.7v1.7h4.7v.7H9.7v3c0 2.2-1 3-3 3H3.8c-2 0-3.3 1-3.6 3a10.6 10.6 0 0 0 0 4.6c.4 2 1.7 3 3.6 3h2.9c2 0 3-.8 3-3v-1.7H5.6v-.7h4.7v-3c0-2.2 1.1-3 3-3h2.9c2 0 3.3-1 3.6-3a10.6 10.6 0 0 0 0-4.6c-.3-2-1.6-3-3.6-3h-2.9v1.7h-4.7v.7h4.7v3c0 2.2-1.1 3-3 3H9.7c-2 0-3.3 1-3.6 3a10.6 10.6 0 0 0 0 4.6c.3 2 1.6 3 3.6 3h2.9" />
        <circle cx="9.75" cy="3.78" r="0.6" fill={theme === "dark" ? "#18181b" : "#fff"} />
        <circle cx="14.25" cy="20.28" r="0.6" fill={theme === "dark" ? "#18181b" : "#fff"} />
      </svg>
    ),
    sql: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M12 2C6.5 2 2 4 2 6.5s4.5 4.5 10 4.5 10-2 10-4.5S17.5 2 12 2zm0 6c-4.4 0-8-1.3-8-2.5S7.6 3 12 3s8 1.3 8 2.5S16.4 8 12 8zm0 4c-5.5 0-10-2-10-4.5v3c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5v-3c0 2.5-4.5 4.5-10 4.5zm0 5c-5.5 0-10-2-10-4.5v3c0 2.5 4.5 4.5 10 4.5s10-2 10-4.5v-3c0 2.5-4.5 4.5-10 4.5z" />
      </svg>
    ),
    html: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M2 3h20l-2 16.5L12 22 4 19.5z M12 6v3h3.5l-.3 3.5H12v3l4.3-.2.3-4.3H12V6z" />
      </svg>
    ),
    css: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M5 2l1.4 16.5L12 22l5.6-3.5L19 2z M15.8 8.4h-5.5v2.2h5.3l-.5 5.2-3.1 1-3.1-1-.2-2.2H9.7l.2 3.5 2.1.7 2.1-.7.3-3.1H7.8V8.4H16z" />
      </svg>
    ),
    reactLogo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse rx="10" ry="3.5" transform="rotate(0 12 12)" cx="12" cy="12" />
        <ellipse rx="10" ry="3.5" transform="rotate(60 12 12)" cx="12" cy="12" />
        <ellipse rx="10" ry="3.5" transform="rotate(120 12 12)" cx="12" cy="12" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      </svg>
    ),
    nextjs: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M16 16.5 L9.5 8h-1v8h1.5v-5.5l5.5 6z" />
      </svg>
    ),
    node: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm6.3 14.3l-6.3 3.6-6.3-3.6V9.7l6.3-3.6 6.3 3.6v6.6z" />
      </svg>
    ),
    express: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <text x="12" y="15" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle" fill="currentColor">EXP</text>
      </svg>
    ),
    restApi: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    numpy: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm1 4.5l5.5 3.2v4.6L12 17.5l-5.5-3.2v-4.6z" />
        <rect x="10" y="10" width="4" height="4" fill="currentColor" />
        <rect x="6" y="6" width="3" height="3" opacity="0.6" fill="currentColor" />
        <rect x="15" y="15" width="3" height="3" opacity="0.6" fill="currentColor" />
      </svg>
    ),
    pandas: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-10 10 10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm-2 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-4 8a4 4 0 0 1-4 4 4 4 0 0 1-4-4z" />
      </svg>
    ),
    matplotlib: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" strokeLinecap="round" />
        <path d="M19 9l-4 5-4-3-5 6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    mongodb: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M12 1.5c-.3 0-4 3.7-4 7.5 0 3.2 2.2 5.5 4 7 1.8-1.5 4-3.8 4-7 0-3.8-3.7-7.5-4-7.5zm0 18v3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    mysql: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M18.6 12.2c-.8-1.5-2.2-2.7-3.8-3.4-1.6-.7-3.4-.9-5.1-.6-.8.1-1.6.4-2.3.8-.7.4-1.3 1-1.7 1.7-.4.7-.6 1.5-.6 2.3 0 1.2.4 2.3 1.2 3.2s1.9 1.4 3 1.5c1 .1 2 0 2.9-.4.9-.4 1.7-1 2.3-1.8.6-.8 1-1.8 1.1-2.8.1-1-.1-2-.6-2.9z" />
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3 11c-.1.8-.4 1.5-.9 2.1s-1.1.9-1.8 1c-.7.1-1.5-.1-2.1-.5s-1-.9-1.2-1.6h6z" opacity="0.3" />
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M2.5 10.5 L10.5 2.5a2 2 0 0 1 2.8 0l8.2 8.2a2 2 0 0 1 0 2.8l-8 8a2 2 0 0 1-2.8 0l-8.2-8.2a2 2 0 0 1 0-2.8z M9.5 12a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm1.5-1.5v3" />
      </svg>
    ),
    github: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    ),
    postman: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm2 13 L9.5 12l4.5-3v6z" />
      </svg>
    ),
    network: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="5" r="3" />
        <circle cx="5" cy="18" r="3" />
        <circle cx="19" cy="18" r="3" />
        <line x1="12" y1="8" x2="6.5" y2="15.5" />
        <line x1="12" y1="8" x2="17.5" y2="15.5" />
        <line x1="8" y1="18" x2="16" y2="18" />
      </svg>
    ),
    dbms: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" />
      </svg>
    ),
    oops: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.2" />
        <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor" fillOpacity="0.2" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
        <path d="M10 6.5h4M10 17.5h4M6.5 10v4M17.5 10v4" />
      </svg>
    )
  };

  const skillCategories: SkillCategory[] = [
    {
      title: "Languages",
      skills: [
        { name: "Java", icon: logos.java, color: "#ea580c" },
        { name: "JavaScript", icon: logos.javascript, color: "#eab308" },
        { name: "TypeScript", icon: logos.typescript, color: "#3178c6" },
        { name: "Python", icon: logos.python, color: "#3776ab" },
        { name: "SQL", icon: logos.sql, color: "#00758f" },
      ],
    },
    {
      title: "Frontend",
      skills: [
        { name: "HTML", icon: logos.html, color: "#e34f26" },
        { name: "CSS", icon: logos.css, color: "#1572b6" },
        { name: "React.js", icon: logos.reactLogo, color: "#06b6d4" },
        { name: "Next.js", icon: logos.nextjs, color: theme === "dark" ? "#6366f1" : "#4f46e5" }, // soft blue-indigo
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: logos.node, color: "#22c55e" },
        { name: "Express.js", icon: logos.express, color: "#64748b" },
        { name: "REST API", icon: logos.restApi, color: "#10b981" },
      ],
    },
    {
      title: "Data Visualization",
      skills: [
        { name: "NumPy", icon: logos.numpy, color: "#013243" },
        { name: "Pandas", icon: logos.pandas, color: "#150458" },
        { name: "Matplotlib", icon: logos.matplotlib, color: "#11557c" },
      ],
    },
    {
      title: "Database",
      skills: [
        { name: "MongoDB", icon: logos.mongodb, color: "#16a34a" },
        { name: "MySQL", icon: logos.mysql, color: "#00758f" },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Git", icon: logos.git, color: "#f05032" },
        { name: "GitHub", icon: logos.github, color: theme === "dark" ? "#a1a1aa" : "#4b5563" },
        { name: "Postman", icon: logos.postman, color: "#ff6c37" },
      ],
    },
    {
      title: "Core CS",
      skills: [
        { name: "Computer Network", icon: logos.network, color: "#6366f1" },
        { name: "DBMS", icon: logos.dbms, color: "#a855f7" },
        { name: "OOPs", icon: logos.oops, color: "#ec4899" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-navy/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-800 dark:text-white mb-4">
            Technical Stack
          </h2>
          <div className="w-16 h-1 bg-teal mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {skillCategories.map((category, catIdx) => (
            <div key={catIdx} className="flex flex-col">
              <h3 className="font-poppins font-bold text-lg mb-6 text-slate-800 dark:text-white tracking-wide">
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-4.5">
                {category.skills.map((skill, skillIdx) => {
                  const cardKey = `${catIdx}-${skillIdx}`;
                  const isHovered = hoveredCard === cardKey;

                  return (
                    <motion.div
                      key={skillIdx}
                      onMouseEnter={() => setHoveredCard(cardKey)}
                      onMouseLeave={() => setHoveredCard(null)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      style={{
                        borderColor: isHovered
                          ? skill.color
                          : theme === "dark"
                            ? `${skill.color}25`
                            : `${skill.color}45`,

                        backgroundColor: isHovered
                          ? theme === "dark"
                            ? `${skill.color}22`
                            : `${skill.color}15`
                          : theme === "dark"
                            ? `${skill.color}08`
                            : `${skill.color}04`,

                        color: skill.color,

                        boxShadow: isHovered ? `0 0 15px ${skill.color}35` : "none"
                      }}
                      className="w-28 h-28 rounded-2xl border flex flex-col items-center justify-between p-4 transition-all duration-200 cursor-default shadow-sm dark:shadow-none"
                    >
                      <div className="flex-grow flex items-center justify-center">
                        {skill.icon}
                      </div>
                      <span
                        style={{
                          color: theme === "dark"
                            ? `${skill.color}cc`
                            : `${skill.color}ee`
                        }}
                        className="text-xs font-semibold mt-2 text-center line-clamp-2 leading-tight px-1 font-poppins transition-colors duration-200"
                      >
                        {skill.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
