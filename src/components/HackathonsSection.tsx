import React from 'react';
import hackathons from '../data/hackathons';

const HackathonsSection: React.FC = () => {
  return (
    <section className="w-full bg-gunmetal-gray text-chrome-silver py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-12">
        <h2 className="text-3xl font-bold text-molten-orange text-center">Hackathons & Achievements</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {hackathons.map((event) => (
            <div 
              key={event.id} 
              className="bg-forge-black border border-cool-cyan p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 flex items-center justify-center bg-gunmetal-gray rounded-lg p-2">
                  <img src={event.logo} alt={event.name} className="w-12 h-12 object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-molten-orange">{event.name}</h3>
                  <p className="text-sm text-cool-cyan">{event.date}</p>
                </div>
              </div>
              
              <p className="text-steel-blue text-sm mb-3">{event.statement}</p>
              
              <p className="mb-3 text-sm flex items-center gap-2">
                <span className="text-chrome-silver">👨‍💻</span> 
                <span className="text-cool-cyan">{event.role}</span>
              </p>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {event.tools.map((tool, i) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 text-xs bg-gunmetal-gray border border-cool-cyan rounded-full text-cool-cyan"
                  >
                    {tool}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between items-center mt-6 pt-4 border-t border-gunmetal-gray">
                <span className="text-ember-red text-sm font-semibold">{event.result}</span>
                <a 
                  href={event.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cool-cyan text-sm hover:text-molten-orange transition-colors flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  View Event
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HackathonsSection; 