import React from 'react';
import ResumeUploader from '../../components/admin/ResumeUploader';

const About: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cool-cyan">About Page Management</h1>
        <button className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition">
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Bio Section */}
          <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-4">
            <h2 className="text-lg font-semibold text-cool-cyan mb-4">Bio Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-steel-blue mb-1">Name</label>
                <input 
                  type="text" 
                  defaultValue="Jatin" 
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                />
              </div>
              <div>
                <label className="block text-sm text-steel-blue mb-1">Title/Role</label>
                <input 
                  type="text" 
                  defaultValue="Game Developer & Full-Stack Engineer" 
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                />
              </div>
              <div>
                <label className="block text-sm text-steel-blue mb-1">Bio Description</label>
                <textarea 
                  rows={4} 
                  defaultValue="I'm Jatin, a passionate game developer, full-stack web/app builder, and hackathon enthusiast. I love turning ideas into interactive and useful digital products — especially in gaming and developer tools. I constantly explore new technologies to create impactful solutions with performance and creativity." 
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan resize-none"
                />
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-cool-cyan">Skills & Technologies</h2>
              <button className="px-3 py-1 bg-cool-cyan text-forge-black rounded-lg hover:bg-cool-cyan/90 text-sm transition">
                Add New
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Unity', category: 'Game Dev' },
                { name: 'React', category: 'Web Dev' },
                { name: 'TypeScript', category: 'Web Dev' },
                { name: 'Node.js', category: 'Backend' },
                { name: 'Tailwind', category: 'UI/UX' },
                { name: 'Git/GitHub', category: 'Tools' },
                { name: 'Figma', category: 'UI/UX' },
                { name: 'Firebase', category: 'Backend' },
              ].map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-forge-black rounded-lg">
                  <div className="flex items-center">
                    <span className="text-chrome-silver">{skill.name}</span>
                    <span className="ml-2 px-2 py-1 text-xs bg-cool-cyan/20 text-cool-cyan rounded-full">
                      {skill.category}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-1 text-cool-cyan hover:text-molten-orange">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button className="p-1 text-ember-red hover:text-ember-red/80">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Profile Image */}
          <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-4">
            <h2 className="text-lg font-semibold text-cool-cyan mb-4">Profile Image</h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-cool-cyan">
                <img 
                  src="/hero-avatar.svg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="px-4 py-2 bg-cool-cyan text-forge-black rounded-lg hover:bg-cool-cyan/90 transition text-sm">
                Change Image
              </button>
            </div>
          </div>

          {/* Resume Section - Updated with ResumeUploader */}
          <ResumeUploader />

          {/* Social Links */}
          <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-cool-cyan">Social Links</h2>
              <button className="px-3 py-1 bg-cool-cyan text-forge-black rounded-lg hover:bg-cool-cyan/90 text-sm transition">
                Add New
              </button>
            </div>
            <div className="space-y-3">
              {[
                { platform: 'GitHub', url: 'https://github.com/yourusername' },
                { platform: 'LinkedIn', url: 'https://linkedin.com/in/yourusername' },
                { platform: 'Twitter', url: 'https://twitter.com/yourusername' },
              ].map((link, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-forge-black rounded-lg">
                  <span className="text-chrome-silver">{link.platform}</span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-cool-cyan hover:text-molten-orange">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                    <button className="p-1 text-ember-red hover:text-ember-red/80">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 