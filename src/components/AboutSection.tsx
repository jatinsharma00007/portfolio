import React from 'react';
import unityIcon from '../assets/unity.svg';
import reactIcon from '../assets/react.svg';
import typescriptIcon from '../assets/typescript.svg';
import nodejsIcon from '../assets/nodejs.svg';
import tailwindIcon from '../assets/tailwind.svg';
import githubIcon from '../assets/github.svg';
import figmaIcon from '../assets/figma.svg';
import firebaseIcon from '../assets/firebase.svg';

const AboutSection: React.FC = () => {
  const tools = [
    { name: "Unity", icon: unityIcon },
    { name: "React", icon: reactIcon },
    { name: "TypeScript", icon: typescriptIcon },
    { name: "Node.js", icon: nodejsIcon },
    { name: "Tailwind", icon: tailwindIcon },
    { name: "Git/GitHub", icon: githubIcon },
    { name: "Figma", icon: figmaIcon },
    { name: "Firebase", icon: firebaseIcon },
  ];

  return (
    <section className="w-full bg-gunmetal-gray text-chrome-silver py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Bio */}
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-3xl font-bold text-molten-orange">About Me</h2>
          <p className="text-lg text-steel-blue max-w-3xl mx-auto md:mx-0">
            I'm Jatin, a passionate game developer, full-stack web/app builder, and hackathon enthusiast. 
            I love turning ideas into interactive and useful digital products — especially in gaming and 
            developer tools. I constantly explore new technologies to create impactful solutions with 
            performance and creativity.
          </p>
        </div>

        {/* Stack Categories */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-6">
          <div className="px-4 py-2 bg-forge-black border border-cool-cyan rounded-full text-cool-cyan text-sm">Game Dev</div>
          <div className="px-4 py-2 bg-forge-black border border-cool-cyan rounded-full text-cool-cyan text-sm">Web Dev</div>
          <div className="px-4 py-2 bg-forge-black border border-cool-cyan rounded-full text-cool-cyan text-sm">UI/UX Tools</div>
          <div className="px-4 py-2 bg-forge-black border border-cool-cyan rounded-full text-cool-cyan text-sm">Firebase & DB</div>
        </div>

        {/* Skills / Technologies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-items-center text-center pt-10">
          {tools.map((tool) => (
            <div key={tool.name} className="flex flex-col items-center space-y-2 hover:scale-105 transition-transform">
              <div className="w-16 h-16 flex items-center justify-center bg-forge-black rounded-lg p-2">
                <img src={tool.icon} alt={tool.name} className="w-12 h-12" />
              </div>
              <p className="text-sm text-cool-cyan">{tool.name}</p>
            </div>
          ))}
        </div>

        {/* Download CV Button */}
        <div className="flex justify-center md:justify-start pt-8">
          <a 
            href="/resume.pdf" 
            download 
            className="px-5 py-3 rounded-xl bg-steel-blue text-white hover:bg-cool-cyan hover:text-forge-black transition"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 