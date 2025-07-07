import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full bg-forge-black text-chrome-silver py-16 px-6 md:px-12">
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 space-x-2 text-sm font-semibold text-cool-cyan">
        <button className="hover:text-molten-orange">EN</button>
        <span>|</span>
        <button className="hover:text-molten-orange">HI</button>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left Side Content */}
        <div className="w-full md:w-1/2 space-y-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-chrome-silver">
            Hi, I'm <span className="text-molten-orange">Jatin</span> 👋
          </h1>
          <p className="text-lg text-steel-blue max-w-md">
            I build games and tools that solve real-world problems with creativity and code.
          </p>
          <p className="text-sm uppercase tracking-wider text-cool-cyan font-medium">
            Game Developer &nbsp;•&nbsp; Hackathonist &nbsp;•&nbsp; Web & App Builder
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a href="#projects" className="px-5 py-3 rounded-xl bg-molten-orange text-white font-semibold hover:bg-ember-red transition">
              View Portfolio
            </a>
            <a href="/resume.pdf" download className="px-5 py-3 rounded-xl border border-cool-cyan text-cool-cyan hover:bg-cool-cyan hover:text-forge-black transition">
              Download Resume
            </a>
            <a href="#contact" className="px-5 py-3 rounded-xl bg-steel-blue text-white hover:bg-cool-cyan hover:text-forge-black transition">
              Let's Chat
            </a>
          </div>
        </div>

        {/* Right Side Graphic */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/hero-avatar.svg"
            alt="Game Developer"
            className="w-64 md:w-80 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 