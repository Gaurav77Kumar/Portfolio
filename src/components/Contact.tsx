import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Mail, FileText, Send, AlertTriangle } from "lucide-react";
import { z } from "zod";

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

// Zod Validation Schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const { theme } = useTheme();
  
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name as keyof ContactFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Zod parsing validation
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    // Send email via mailto redirect
    const mailtoLink = `mailto:gauravkumar732006@gmail.com?subject=${encodeURIComponent(
      formData.subject
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    window.location.href = mailtoLink;

    // Reset form fields
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Gaurav_Kumar_Resume.pdf";
    link.setAttribute("download", "Gaurav_Kumar_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-navy/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-800 dark:text-white mb-4">
            Connect
          </h2>
          <div className="w-16 h-1 bg-teal mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* LEFT: Info card (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border ${
                theme === "dark" ? "bg-navy/40 border-white/5" : "bg-white border-black/5 shadow-sm"
              }`}
            >
              <h3 className="font-poppins font-bold text-xl text-slate-800 dark:text-white mb-6">
                Let's Build Something Together
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-sans">
                Whether you want to discuss cryptographic ledger design, AI microservice integration, or full-stack 
                engineering, I'm always open to talking.
              </p>

              <div className="space-y-4 mb-8">
                <a
                  href="mailto:gauravkumar732006@gmail.com"
                  className="flex items-center space-x-3 text-slate-500 hover:text-teal dark:text-slate-400 transition-colors font-mono text-sm"
                >
                  <Mail size={16} />
                  <span>gauravkumar732006@gmail.com</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="flex items-center space-x-4 mb-8">
                <a
                  href="https://github.com/Gaurav77Kumar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-teal/15 hover:text-teal dark:bg-white/5 text-slate-600 dark:text-slate-300 transition-all"
                  title="GitHub"
                >
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/gaurav-kumar-7141b0322/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-teal/15 hover:text-teal dark:bg-white/5 text-slate-600 dark:text-slate-300 transition-all"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/gaurav23939"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-teal/15 hover:text-teal dark:bg-white/5 text-slate-600 dark:text-slate-300 transition-all"
                  title="X (Twitter)"
                >
                  <XIcon className="h-5 w-5" />
                </a>
                <a
                  href="https://leetcode.com/u/Gauravkumar-77/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-slate-100 hover:bg-teal/15 hover:text-teal dark:bg-white/5 text-slate-600 dark:text-slate-300 transition-all"
                  title="LeetCode"
                >
                  <LeetCodeIcon className="h-5 w-5" />
                </a>
              </div>

              {/* Download Resume Button */}
              <button
                onClick={handleDownloadResume}
                className="w-full inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl border border-slate-300 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 hover:scale-[1.01] active:scale-[0.99] transition-all font-poppins font-bold text-sm"
              >
                <FileText size={18} />
                <span>Download Resume</span>
              </button>
            </motion.div>
          </div>

          {/* RIGHT: Contact form (7 cols) */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`p-6 rounded-2xl border ${
                theme === "dark" ? "bg-navy/40 border-white/5" : "bg-white border-black/5 shadow-sm"
              }`}
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-poppins font-bold text-slate-500 mb-1">YOUR NAME</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                        errors.name
                          ? "border-red-500 bg-red-500/5"
                          : theme === "dark"
                          ? "bg-navy/80 border-white/10 text-white focus:border-teal"
                          : "bg-slate-50 border-black/10 text-slate-800 focus:border-purple"
                      }`}
                    />
                    {errors.name && (
                      <span className="text-red-500 text-xs font-semibold mt-1 block flex items-center space-x-1">
                        <AlertTriangle size={12} /> <span>{errors.name}</span>
                      </span>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-poppins font-bold text-slate-500 mb-1">EMAIL ADDRESS</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                        errors.email
                          ? "border-red-500 bg-red-500/5"
                          : theme === "dark"
                          ? "bg-navy/80 border-white/10 text-white focus:border-teal"
                          : "bg-slate-50 border-black/10 text-slate-800 focus:border-purple"
                      }`}
                    />
                    {errors.email && (
                      <span className="text-red-500 text-xs font-semibold mt-1 block flex items-center space-x-1">
                        <AlertTriangle size={12} /> <span>{errors.email}</span>
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-poppins font-bold text-slate-500 mb-1">SUBJECT</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-xl border text-sm font-semibold outline-none transition-all ${
                      errors.subject
                        ? "border-red-500 bg-red-500/5"
                        : theme === "dark"
                        ? "bg-navy/80 border-white/10 text-white focus:border-teal"
                        : "bg-slate-50 border-black/10 text-slate-800 focus:border-purple"
                    }`}
                  />
                  {errors.subject && (
                    <span className="text-red-500 text-xs font-semibold mt-1 block flex items-center space-x-1">
                      <AlertTriangle size={12} /> <span>{errors.subject}</span>
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-poppins font-bold text-slate-500 mb-1">YOUR MESSAGE</label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full p-3 rounded-xl border text-sm font-semibold outline-none transition-all resize-none ${
                      errors.message
                        ? "border-red-500 bg-red-500/5"
                        : theme === "dark"
                        ? "bg-navy/80 border-white/10 text-white focus:border-teal"
                        : "bg-slate-50 border-black/10 text-slate-800 focus:border-purple"
                    }`}
                  />
                  {errors.message && (
                    <span className="text-red-500 text-xs font-semibold mt-1 block flex items-center space-x-1">
                      <AlertTriangle size={12} /> <span>{errors.message}</span>
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-teal text-slate-900 font-poppins font-bold hover:bg-teal-dark hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md shadow-teal/10"
                >
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
