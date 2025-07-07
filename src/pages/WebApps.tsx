import React, { useState } from 'react';
import webapps from "../data/webapps";
import WebAppCard from "../components/WebAppCard";

export default function WebApps() {
  const [activeFilter, setActiveFilter] = useState("All");

  const tagFilters = ["All", "AI", "Finance", "Open Source", "PWA", "API", "Hackathon"];

  const filteredApps = activeFilter === "All"
    ? webapps
    : webapps.filter((app) => app.tags.includes(activeFilter));

  return (
    <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto space-y-20 text-chrome-silver">
      
      {/* Section 1: Hero Header */}
      <div id="webapps-hero" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-molten-orange">
          Web Tools & Dashboards 🛠️
        </h1>
        <p className="mt-4 text-lg md:text-xl text-steel-blue max-w-2xl mx-auto">
          A collection of apps, tools, and productivity utilities I've built — solving real problems, one interface at a time.
        </p>
      </div>

      {/* Section 3: Filter System */}
      <div id="webapps-filters">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tagFilters.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-4 py-2 text-xs md:text-sm rounded-full border transition ${
                activeFilter === tag
                  ? "bg-molten-orange text-forge-black border-molten-orange"
                  : "border-cool-cyan text-cool-cyan hover:bg-cool-cyan hover:text-forge-black"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Section 2: WebApps Card Grid */}
      <div id="webapps-grid" className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => (
            <WebAppCard key={app.id} data={app} />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-cool-cyan">No web apps match the selected filter.</p>
            <button 
              onClick={() => setActiveFilter("All")} 
              className="mt-4 px-4 py-2 text-sm border border-molten-orange text-molten-orange rounded-full hover:bg-molten-orange hover:text-forge-black transition"
            >
              Show All Web Apps
            </button>
          </div>
        )}
      </div>

      {/* Section 4: Final CTA */}
      <div id="webapps-cta" className="text-center mt-20 space-y-4">
        <h2 className="text-2xl font-bold text-molten-orange">Want to See More?</h2>
        <p className="text-steel-blue max-w-2xl mx-auto">
          Check out all my live tools, open-source dashboards, and productivity apps on GitHub and Devpost.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <a
            href="https://github.com/yourusername?tab=repositories&q=web"
            className="px-5 py-3 rounded-full bg-cool-cyan text-forge-black font-semibold hover:bg-molten-orange transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            💻 GitHub
          </a>
          <a
            href="https://devpost.com/yourusername"
            className="px-5 py-3 rounded-full bg-cool-cyan text-forge-black font-semibold hover:bg-molten-orange transition"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Devpost
          </a>
        </div>
      </div>
    </section>
  );
} 