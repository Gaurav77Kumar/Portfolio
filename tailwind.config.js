/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#f8fafc",
          dark: "#09090b", // Obsidian Black
          DEFAULT: "#18181b"
        },
        navy: {
          light: "#27272a", // Zinc 800
          DEFAULT: "#18181b", // Zinc 900
          dark: "#09090b", // Obsidian Black
        },
        teal: {
          light: "#ecfdf5", // Emerald light
          DEFAULT: "#10b981", // Emerald Green
          dark: "#047857", // Emerald dark
        },
        purple: {
          light: "#e0e7ff", // Indigo light
          DEFAULT: "#6366f1", // Indigo
          dark: "#4338ca", // Indigo dark
        },
        success: {
          light: "#ecfdf5",
          DEFAULT: "#10b981",
          dark: "#047857",
        },
        cardBg: {
          light: "#ffffff",
          dark: "#18181b" // Zinc 900
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
