import React, { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, Menu, X, Terminal } from "lucide-react";

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "achievements", label: "Achievements" },
    { id: "contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        const el = document.getElementById(link.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(link.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
          ? theme === "dark"
            ? "bg-primary-dark/80 glass-panel border-b border-white/5 py-4"
            : "bg-white/80 glass-panel border-b border-black/5 py-4"
          : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={() => handleScrollTo("home")}
          className="flex items-center space-x-2 cursor-pointer font-poppins font-bold text-xl tracking-tight text-slate-800 dark:text-white"
        >
          <Terminal className="h-6 w-6 text-teal" />
          <span>
            Gaurav<span className="text-teal">.dev</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`font-poppins text-sm font-medium transition-colors hover:text-teal ${activeSection === link.id
                    ? "text-teal"
                    : theme === "dark"
                      ? "text-slate-300"
                      : "text-slate-600"
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all ${theme === "dark"
                ? "border-white/10 hover:bg-white/5 text-teal"
                : "border-black/10 hover:bg-black/5 text-purple"
              }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg border transition-all ${theme === "dark"
                ? "border-white/10 text-teal"
                : "border-black/10 text-purple"
              }`}
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-slate-800 dark:text-white"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className={`md:hidden absolute top-full left-0 w-full border-b shadow-lg animate-fade-in ${theme === "dark"
              ? "bg-primary-dark/95 border-white/5 text-slate-200"
              : "bg-white/95 border-black/5 text-slate-800"
            }`}
        >
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`text-left font-poppins text-lg font-medium py-2 border-b border-transparent hover:border-teal/20 transition-all ${activeSection === link.id ? "text-teal font-semibold" : ""
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
