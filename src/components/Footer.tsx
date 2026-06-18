import React from "react";
import { useTheme } from "../context/ThemeContext";
import { ArrowUp } from "lucide-react";

export const Footer: React.FC = () => {
  const { theme } = useTheme();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      className={`py-8 border-t transition-colors duration-300 ${
        theme === "dark" ? "bg-primary-dark border-white/5 text-slate-400" : "bg-white border-black/5 text-slate-500"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-center">
        {/* Back to top */}
        <button
          onClick={handleScrollToTop}
          className={`p-2 rounded-lg border transition-all ${
            theme === "dark"
              ? "border-white/10 hover:bg-white/5 hover:text-teal"
              : "border-black/10 hover:bg-black/5 hover:text-purple"
          }`}
          aria-label="Back to Top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
};
