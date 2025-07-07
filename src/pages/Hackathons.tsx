import React, { useState } from 'react';
import hackathons from "../data/hackathons";
import HackathonCard from "../components/HackathonCard";

const Hackathons: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "AI/ML", "Web", "ISRO", "Smart India", "2024", "2025"];

  const filtered = activeFilter === "All"
    ? hackathons
    : hackathons.filter((h) =>
        h.name.includes(activeFilter) ||
        h.date.includes(activeFilter) ||
        h.statement.includes(activeFilter) ||
        h.category === activeFilter ||
        h.tools.some(tool => tool.includes(activeFilter))
      );

  return (
    <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto space-y-20 text-chrome-silver">
      {/* Section 1: Hero Header */}
      <div id="hackathons-hero" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-molten-orange">
          Hackathons & Achievements 🏆
        </h1>
        <p className="mt-4 text-lg md:text-xl text-steel-blue max-w-2xl mx-auto">
          A collection of projects built under pressure, with purpose. Real-world problems. Creative solutions. Teamwork. Late-night code and big wins.
        </p>
      </div>

      {/* Section 3: Filter Buttons */}
      <div id="hackathons-filters" className="flex flex-wrap gap-3 justify-center">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 text-sm border rounded-full transition ${
              activeFilter === f
                ? "bg-molten-orange text-forge-black border-molten-orange"
                : "text-cool-cyan border-cool-cyan hover:bg-cool-cyan hover:text-forge-black"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Section 2: Hackathon Cards */}
      <div id="hackathons-grid" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((hack) => (
            <HackathonCard key={hack.id} data={hack} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-cool-cyan">No hackathons match the selected filter.</p>
            <button 
              onClick={() => setActiveFilter("All")} 
              className="mt-4 px-4 py-2 text-sm border border-molten-orange text-molten-orange rounded-full hover:bg-molten-orange hover:text-forge-black transition"
            >
              Show All Hackathons
            </button>
          </div>
        )}
      </div>

      {/* Section 4: Final CTA */}
      <div id="hackathons-cta" className="text-center mt-20 space-y-4">
        <h2 className="text-2xl font-bold text-molten-orange">Explore More Hackathons</h2>
        <p className="text-steel-blue">
          Dive into more of my work, case studies, and problem-solving challenges across platforms.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <a
            href="https://devfolio.co/@yourprofile"
            className="px-5 py-3 rounded-full bg-cool-cyan text-forge-black font-semibold hover:bg-molten-orange transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            🧠 Devfolio
          </a>
          <a
            href="https://github.com/yourusername?tab=repositories&q=hackathon"
            className="px-5 py-3 rounded-full bg-cool-cyan text-forge-black font-semibold hover:bg-molten-orange transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            💻 GitHub Hackathon Projects
          </a>
          <a
            href="https://www.linkedin.com/in/yourusername/"
            className="px-5 py-3 rounded-full bg-cool-cyan text-forge-black font-semibold hover:bg-molten-orange transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗 LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hackathons; 