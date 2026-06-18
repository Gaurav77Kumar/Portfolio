import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ArrowRight, FileText } from "lucide-react";

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

// LinkedIn Icon
const LinkedinIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// X/Twitter Icon
const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// LeetCode Icon
const LeetCodeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-9.777 9.778a1.375 1.375 0 0 0 0 1.942l1.942 1.942a1.375 1.375 0 0 0 1.942 0l9.777-9.777a1.375 1.375 0 0 0 0-1.942L14.444.414A1.37 1.37 0 0 0 13.483 0zm-8.8 12.69a1.375 1.375 0 0 0-.961.414l-2.69 2.693a1.375 1.375 0 0 0 0 1.942l1.942 1.942a1.375 1.375 0 0 0 1.942 0l2.69-2.692a1.375 1.375 0 0 0 0-1.942l-1.942-1.942a1.37 1.37 0 0 0-.961-.415zm9.362.482a1.375 1.375 0 0 0-.961.414l-2.69 2.693a1.375 1.375 0 0 0 0 1.942l1.942 1.942a1.375 1.375 0 0 0 1.942 0l2.69-2.692a1.375 1.375 0 0 0 0-1.942l-1.942-1.942a1.37 1.37 0 0 0-.961-.415z" />
  </svg>
);

export const Hero: React.FC = () => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);


  // Interactive Particle Canvas Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
    }> = [];
    const maxParticles = Math.min(80, Math.floor((width * height) / 15000));

    // Mouse coordinates
    const mouse = { x: -1000, y: -1000, radius: 150 };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Particle styles
      const particleColor =
        theme === "dark" ? "rgba(16, 185, 129, 0.4)" : "rgba(99, 102, 241, 0.3)";
      const lineColor =
        theme === "dark" ? "rgba(16, 185, 129, 0.08)" : "rgba(99, 102, 241, 0.06)";

      // Draw lines and update particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Particle movement
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce off bounds
        if (p1.x < 0 || p1.x > width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > height) p1.vy *= -1;

        // Mouse attraction/repulsion physics
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p1.x -= dx * force * 0.03;
          p1.y -= dy * force * 0.03;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Check distance to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distBetween = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (distBetween < 110) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = (110 - distBetween) / 90;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [theme]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Canvas Particle Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Grid Dot Overlay */}
      <div
        className={`absolute inset-0 w-full h-full opacity-60 z-0 pointer-events-none ${
          theme === "dark" ? "grid-bg-dark" : "grid-bg-light"
        }`}
      />

      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-teal/10 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple/10 blur-[130px] pointer-events-none z-0" />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Hackathon Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-teal/30 bg-teal/5 text-teal text-xs font-poppins font-semibold uppercase tracking-wider mb-6 cursor-pointer hover:bg-teal/10 transition-all duration-300"
          onClick={() => scrollToSection("achievements")}
        >
          <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
          <span>🏆 SIH 2025 National Winner</span>
        </motion.div>

        {/* Title Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-poppins font-extrabold text-4xl sm:text-6xl md:text-7xl tracking-tight leading-none mb-6 text-slate-800 dark:text-white"
        >
          Gaurav Kumar
        </motion.h1>

        {/* Mini Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-base sm:text-lg max-w-2xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10"
        >
          I am a Full-Stack Developer and a 3rd year student. I specialize in building robust 
          web applications, designing efficient database systems, and integrating modern technologies to solve real-world problems.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12"
        >
          <button
            onClick={() => scrollToSection("projects")}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-teal text-slate-900 font-poppins font-bold hover:bg-teal-dark hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-teal/15"
          >
            <span>View Projects</span>
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5 hover:scale-[1.02] active:scale-[0.98] transition-all font-poppins font-bold"
          >
            <FileText size={16} />
            <span>Get in Touch</span>
          </button>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center space-x-6"
        >
          <a
            href="https://github.com/Gaurav77Kumar"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal transition-colors"
            title="GitHub"
          >
            <GithubIcon className="h-5.5 w-5.5" />
          </a>
          <a
            href="https://www.linkedin.com/in/gaurav-kumar-7141b0322/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal transition-colors"
            title="LinkedIn"
          >
            <LinkedinIcon className="h-5.5 w-5.5" />
          </a>
          <a
            href="https://x.com/gaurav23939"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal transition-colors"
            title="X (Twitter)"
          >
            <XIcon className="h-5 w-5" />
          </a>
          <a
            href="https://leetcode.com/u/Gauravkumar-77/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-teal transition-colors"
            title="LeetCode"
          >
            <LeetCodeIcon className="h-5.5 w-5.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
