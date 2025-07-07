import React from 'react';
import type { Hackathon } from "../data/hackathons";

export default function HackathonCard({ data }: { data: Hackathon }) {
  return (
    <div className="bg-gunmetal-gray rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 space-y-4 border border-cool-cyan">
      <div className="flex items-center gap-4">
        <img src={data.logo} alt={data.name} className="w-12 h-12" />
        <div>
          <h3 className="text-xl font-semibold text-molten-orange">{data.name}</h3>
          <p className="text-sm text-cool-cyan">{data.date}</p>
        </div>
      </div>
      <p className="text-steel-blue text-sm">{data.statement}</p>
      <p className="text-sm text-cool-cyan italic">Role: {data.role}</p>
      <div className="flex flex-wrap gap-2">
        {data.tools.map((tool, i) => (
          <span key={i} className="bg-forge-black text-xs px-3 py-1 rounded-full text-chrome-silver border border-cool-cyan">
            {tool}
          </span>
        ))}
      </div>
      {data.result && (
        <p className="text-sm text-ember-red font-medium">🏅 {data.result}</p>
      )}
      {data.link && (
        <a href={data.link} target="_blank" rel="noopener noreferrer" className="text-cool-cyan text-sm hover:text-molten-orange transition">
          🔗 View Project
        </a>
      )}
    </div>
  );
} 