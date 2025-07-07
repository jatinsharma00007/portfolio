import React from 'react';
import type { WebApp } from "../data/webapps";

export default function WebAppCard({ data }: { data: WebApp }) {
  return (
    <div className="bg-gunmetal-gray rounded-xl p-6 shadow hover:shadow-lg transition border border-cool-cyan space-y-4">
      <img src={data.image} alt={data.title} className="w-full h-40 object-contain" />
      <h3 className="text-xl font-semibold text-molten-orange">{data.title}</h3>
      <p className="text-steel-blue text-sm">{data.description}</p>
      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag, i) => (
          <span
            key={i}
            className="px-3 py-1 text-xs bg-forge-black text-chrome-silver border border-cool-cyan rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex gap-4 mt-2">
        {data.github && (
          <a
            href={data.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cool-cyan text-sm hover:text-molten-orange transition"
          >
            🔗 GitHub
          </a>
        )}
        {data.demo && (
          <a
            href={data.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cool-cyan text-sm hover:text-molten-orange transition"
          >
            🚀 Live Demo
          </a>
        )}
      </div>
    </div>
  );
} 