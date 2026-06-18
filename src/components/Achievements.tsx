import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Award, Flame } from "lucide-react";

interface HeatmapDay {
  date: string;
  count: number;
}

export const Achievements: React.FC = () => {
  const { theme } = useTheme();
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  const heatmapData: HeatmapDay[] = Array.from({ length: 112 }).map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (111 - i));
    const dateString = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    const rand = Math.random();
    let count = 0;
    if (rand > 0.85) count = Math.floor(Math.random() * 4) + 3; // 3-6 solves
    else if (rand > 0.5) count = Math.floor(Math.random() * 2) + 1; // 1-2 solves

    return { date: dateString, count };
  });

  const getHeatmapColor = (count: number) => {
    if (count === 0) return theme === "dark" ? "bg-slate-800/40" : "bg-slate-100";
    if (count <= 2) return theme === "dark" ? "bg-teal-950 text-teal-200" : "bg-teal-50";
    if (count <= 4) return theme === "dark" ? "bg-teal-700 text-white" : "bg-teal-200";
    return theme === "dark" ? "bg-teal-400 text-slate-900" : "bg-teal-500";
  };

  const platforms = [
    { name: "LeetCode", problems: "180+", badgeColor: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
    { name: "GeeksforGeeks", problems: "20+", badgeColor: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
    { name: "CodeChef", problems: "15+", badgeColor: "bg-yellow-800/10 text-yellow-800 border-yellow-800/20" },
  ];

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-navy/20">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-3xl md:text-4xl text-slate-800 dark:text-white mb-4">
            Honors & Achievements
          </h2>
          <div className="w-16 h-1 bg-teal mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          <div className="lg:col-span-6 flex">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`p-6 md:p-8 rounded-2xl border flex flex-col justify-between w-full relative overflow-hidden ${theme === "dark"
                  ? "bg-navy/40 border-white/5"
                  : "bg-white border-black/5 shadow-sm"
                }`}
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-teal/10 blur-[50px] pointer-events-none" />

              <div>
                <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-purple/35 bg-purple/5 text-purple text-xs font-mono font-bold uppercase tracking-wider mb-6">
                  <Award size={14} />
                  <span>National Winner</span>
                </div>

                <h3 className="font-poppins font-extrabold text-2xl md:text-3xl text-slate-800 dark:text-white mb-4 leading-snug">
                  Smart India Hackathon 2025
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Stood **1st Place** among **1 lakh+ registered participants** nationwide. Led a team of developers
                  to design and pitch an AI-driven, vector-matching system integrated with multi-language REST pipelines,
                  recognized by ministry delegates.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-100/40 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <div className="font-mono text-2xl font-black text-teal">100k+</div>
                    <div className="text-[10px] text-slate-400 uppercase font-poppins font-semibold mt-1">
                      Participants Competed
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-100/40 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <div className="font-mono text-2xl font-black text-purple">1st/350+</div>
                    <div className="text-[10px] text-slate-400 uppercase font-poppins font-semibold mt-1">
                      Finalist Teams Rank
                    </div>
                  </div>
                </div>

                <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-start space-x-2">
                    <span className="text-teal font-bold select-none">✔</span>
                    <span>Presented core microservices interface to central evaluation panels.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-teal font-bold select-none">✔</span>
                    <span>Completed full prototype containing dynamic semantic matching within 36 hours.</span>
                  </li>
                </ul>
              </div>


            </motion.div>
          </div>

          <div className="lg:col-span-6 flex">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`p-6 md:p-8 rounded-2xl border flex flex-col justify-between w-full ${theme === "dark"
                  ? "bg-navy/40 border-white/5"
                  : "bg-white border-black/5 shadow-sm"
                }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
                    <Flame className="text-teal h-5 w-5 animate-pulse" />
                    <h3 className="font-poppins font-bold text-xl">DSA Problem Solving</h3>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-teal/10 text-teal border border-teal/20">
                    200+ Solved
                  </span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  Regularly practicing algorithms across major competitive programming portals. Focused on trees, graphs, dynamic programming, and hash structures.
                </p>

                <div className="grid grid-cols-2 gap-2 mb-8">
                  {platforms.map((plat, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-2.5 rounded-xl border flex items-center justify-between text-xs font-mono font-semibold ${plat.badgeColor}`}
                    >
                      <span>{plat.name}</span>
                      <span className="font-bold">{plat.problems}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 relative">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-mono text-xs font-semibold text-slate-400 uppercase tracking-wide">
                      Problem Solving Activity (Last 4 Months)
                    </h4>

                    <div className="min-h-[16px] text-[10px] font-mono text-teal">
                      {hoveredCell ? hoveredCell : "Hover cells to view activity"}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/5 dark:bg-black/20 border border-slate-200 dark:border-white/5 relative">
                    <div className="grid grid-flow-col grid-cols-16 grid-rows-7 gap-1.5 justify-center">
                      {heatmapData.map((day, idx) => (
                        <div
                          key={idx}
                          onMouseEnter={() => setHoveredCell(`${day.date}: ${day.count} solved`)}
                          onMouseLeave={() => setHoveredCell(null)}
                          className={`w-3.5 h-3.5 rounded-[2px] transition-transform duration-100 hover:scale-125 cursor-crosshair ${getHeatmapColor(
                            day.count
                          )}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-end space-x-1.5 mt-3 text-[9px] font-mono text-slate-400">
                      <span>Less</span>
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-slate-800/40 dark:bg-slate-100" />
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-teal-950" />
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-teal-700" />
                      <div className="w-2.5 h-2.5 rounded-[1px] bg-teal-400" />
                      <span>More</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
