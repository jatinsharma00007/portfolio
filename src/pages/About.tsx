import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <section className="min-h-screen w-full bg-forge-black text-chrome-silver py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Section 1: Hero Header */}
        <div
          id="about-hero"
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-molten-orange">
              About Me
            </h1>
            <p className="text-lg md:text-xl text-steel-blue mt-4">
              My journey through code, creativity & challenges
            </p>
          </div>

          {/* Optional future: Right-side visual */}
          {/* <div className="w-full md:w-1/2">Add Lottie or avatar later</div> */}
        </div>
        
        {/* Section 2: Timeline */}
        <div id="about-timeline" className="space-y-12">
          <h2 className="text-3xl font-bold text-molten-orange text-center md:text-left">
            🧭 My Developer Journey
          </h2>

          <ol className="border-l-4 border-cool-cyan space-y-10 pl-6">
            {/* Each milestone item */}
            <li>
              <div className="mb-2 text-sm text-cool-cyan">2019 – Started BTech (AI)</div>
              <h3 className="text-xl font-semibold text-chrome-silver">The Beginning</h3>
              <p className="text-steel-blue text-sm mt-2">
                Enrolled in Computer Science (AI) at RTU. Got introduced to Python, web dev basics, and project-based learning.
              </p>
            </li>

            <li>
              <div className="mb-2 text-sm text-cool-cyan">2021 – Game Dev Exploration</div>
              <h3 className="text-xl font-semibold text-chrome-silver">Built My First Unity Game</h3>
              <p className="text-steel-blue text-sm mt-2">
                Learned C#, Unity, and created a mini multiplayer game clone. Realized my passion for building games.
              </p>
            </li>

            <li>
              <div className="mb-2 text-sm text-cool-cyan">2022 – Hackathons + Web Dev</div>
              <h3 className="text-xl font-semibold text-chrome-silver">Team Projects & Winning</h3>
              <p className="text-steel-blue text-sm mt-2">
                Participated in multiple hackathons. Learned React, Tailwind, Firebase, and project collaboration.
              </p>
            </li>

            <li>
              <div className="mb-2 text-sm text-cool-cyan">2024–2025 – Professional Phase</div>
              <h3 className="text-xl font-semibold text-chrome-silver">Real-World Impact</h3>
              <p className="text-steel-blue text-sm mt-2">
                Built tools, full-stack apps, and advanced game systems. Now working toward meaningful products & problem-solving.
              </p>
            </li>
          </ol>
        </div>
        
        {/* Section 3: Bio + Fun Facts */}
        <div id="about-bio-facts" className="space-y-12">
          {/* Developer Bio */}
          <div className="max-w-3xl mx-auto text-center md:text-left">
            <h2 className="text-3xl font-bold text-molten-orange mb-4">Who Am I?</h2>
            <p className="text-steel-blue text-lg">
              I'm Jatin — a passionate developer on a mission to turn ideas into digital experiences. Whether it's building intuitive web apps, creative games, or powerful tools, I love solving real-world problems with code. I'm always learning, experimenting, and growing — one commit at a time.
            </p>
          </div>

          {/* Fun Facts Grid */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-molten-orange mb-6 text-center md:text-left">🎮 Fun Facts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <div className="p-4 bg-gunmetal-gray rounded-xl shadow hover:scale-105 transition">
                <span className="text-2xl">🧠</span>
                <p className="text-chrome-silver mt-2">Built a working game engine prototype in vanilla JavaScript.</p>
              </div>
              <div className="p-4 bg-gunmetal-gray rounded-xl shadow hover:scale-105 transition">
                <span className="text-2xl">🎧</span>
                <p className="text-chrome-silver mt-2">I code best with lo-fi beats playing in the background.</p>
              </div>
              <div className="p-4 bg-gunmetal-gray rounded-xl shadow hover:scale-105 transition">
                <span className="text-2xl">🎮</span>
                <p className="text-chrome-silver mt-2">Gamer by heart — indie games and multiplayer dev fascinate me.</p>
              </div>
              <div className="p-4 bg-gunmetal-gray rounded-xl shadow hover:scale-105 transition">
                <span className="text-2xl">🗺️</span>
                <p className="text-chrome-silver mt-2">Dreaming of traveling the world with a laptop & passion project.</p>
              </div>
              <div className="p-4 bg-gunmetal-gray rounded-xl shadow hover:scale-105 transition">
                <span className="text-2xl">🛠️</span>
                <p className="text-chrome-silver mt-2">Built over 15+ tools, apps, and game prototypes during college.</p>
              </div>
              <div className="p-4 bg-gunmetal-gray rounded-xl shadow hover:scale-105 transition">
                <span className="text-2xl">👨‍💻</span>
                <p className="text-chrome-silver mt-2">Enjoy working on late-night side projects more than Netflix.</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Section 4: Hobbies + CTA */}
        <div
          id="about-hobbies-cta"
          className="bg-forge-black text-chrome-silver py-16 space-y-12"
        >
          {/* Hobbies Section */}
          <div className="max-w-5xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-molten-orange">🌟 Beyond the Screen</h2>
            <p className="text-lg text-steel-blue">
              When I'm not coding, you can find me indulging in creativity and adventures that fuel my passion and imagination.
            </p>

            <div className="flex flex-wrap justify-center gap-6 mt-8">
              <div className="p-4 w-64 bg-gunmetal-gray rounded-lg shadow hover:scale-105 transition text-left">
                <span className="text-2xl">🎨</span>
                <h4 className="text-xl font-semibold mt-2">Digital Art</h4>
                <p className="text-sm mt-1 text-chrome-silver">
                  I love sketching characters and concepts for my game ideas using Figma and Procreate.
                </p>
              </div>
              <div className="p-4 w-64 bg-gunmetal-gray rounded-lg shadow hover:scale-105 transition text-left">
                <span className="text-2xl">🎮</span>
                <h4 className="text-xl font-semibold mt-2">Gaming</h4>
                <p className="text-sm mt-1 text-chrome-silver">
                  I explore game mechanics and design by playing both indie and AAA titles.
                </p>
              </div>
              <div className="p-4 w-64 bg-gunmetal-gray rounded-lg shadow hover:scale-105 transition text-left">
                <span className="text-2xl">📚</span>
                <h4 className="text-xl font-semibold mt-2">Reading Sci-Fi</h4>
                <p className="text-sm mt-1 text-chrome-silver">
                  Sci-fi novels give me inspiration for immersive storytelling in games and apps.
                </p>
              </div>
              <div className="p-4 w-64 bg-gunmetal-gray rounded-lg shadow hover:scale-105 transition text-left">
                <span className="text-2xl">🚶‍♂️</span>
                <h4 className="text-xl font-semibold mt-2">Night Walks</h4>
                <p className="text-sm mt-1 text-chrome-silver">
                  Walking under the stars helps me reset, think, and come up with creative ideas.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h3 className="text-2xl md:text-3xl font-bold text-molten-orange">
              Let's build something awesome together!
            </h3>
            <p className="text-steel-blue mt-4 text-lg">
              Whether it's code, games, or ideas — I'd love to collaborate or connect.
            </p>
            <Link
              to="/contact"
              className="inline-block mt-6 px-6 py-3 bg-cool-cyan text-forge-black rounded-full text-sm font-semibold hover:bg-molten-orange transition"
            >
              📬 Reach Out to Me
            </Link>
          </div>
        </div>
        
        {/* Section 5: Gallery or Quote (optional) */}
        <div id="about-gallery-optional" className="text-center max-w-3xl mx-auto py-16 px-6">
          <blockquote className="italic text-xl text-steel-blue border-l-4 border-molten-orange pl-4">
            "Code is the closest thing we have to a superpower. I want to use mine to build things that matter."  
          </blockquote>
          <p className="mt-4 text-cool-cyan text-sm">– Jatin Sharma</p>
        </div>
      </div>
    </section>
  );
};

export default About; 