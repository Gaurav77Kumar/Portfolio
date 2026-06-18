import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Achievements } from "./components/Achievements";
import { Certifications } from "./components/Certifications";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen font-sans selection:bg-teal/30 selection:text-teal transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Skills />
          <Projects />
          <Achievements />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
