import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

interface QuickLinkCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  to: string;
}

const QuickLinkCard: React.FC<QuickLinkCardProps> = ({ title, description, icon, to }) => {
  return (
    <Link 
      to={to}
      className="bg-gunmetal-gray p-6 rounded-lg shadow-md border border-cool-cyan/20 hover:bg-forge-black/70 transition duration-300"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 text-cool-cyan">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-molten-orange">{title}</h3>
          <p className="text-sm text-steel-blue">{description}</p>
        </div>
      </div>
    </Link>
  );
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cool-cyan">Admin Dashboard</h1>
        <div className="text-sm text-steel-blue">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gunmetal-gray p-6 rounded-lg shadow-md border-l-4 border-molten-orange">
          <h3 className="text-lg font-semibold text-cool-cyan">Projects</h3>
          <p className="text-3xl text-white font-bold">12</p>
        </div>

        <div className="bg-gunmetal-gray p-6 rounded-lg shadow-md border-l-4 border-cool-cyan">
          <h3 className="text-lg font-semibold text-cool-cyan">Games</h3>
          <p className="text-3xl text-white font-bold">8</p>
        </div>

        <div className="bg-gunmetal-gray p-6 rounded-lg shadow-md border-l-4 border-steel-blue">
          <h3 className="text-lg font-semibold text-cool-cyan">Hackathons</h3>
          <p className="text-3xl text-white font-bold">6</p>
        </div>

        <div className="bg-gunmetal-gray p-6 rounded-lg shadow-md border-l-4 border-ember-red">
          <h3 className="text-lg font-semibold text-cool-cyan">Messages</h3>
          <p className="text-3xl text-white font-bold">24</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <QuickLinkCard 
          title="Manage Projects" 
          description="Add, edit, or remove your tech projects" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
          to="/admin/projects"
        />
        <QuickLinkCard 
          title="Manage Games" 
          description="Showcase your game development portfolio" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" /></svg>}
          to="/admin/games"
        />
        <QuickLinkCard 
          title="Manage Hackathons" 
          description="Track your hackathon achievements" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
          to="/admin/hackathons"
        />
        <QuickLinkCard 
          title="Web & Apps" 
          description="Manage your web applications and tools" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
          to="/admin/webapps"
        />
        <QuickLinkCard 
          title="About Section" 
          description="Update your profile and biography" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
          to="/admin/about"
        />
        <QuickLinkCard 
          title="Messages" 
          description="View and respond to contact messages" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}
          to="/admin/messages"
        />
        <QuickLinkCard 
          title="Global Settings" 
          description="Configure site-wide settings and languages" 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
          to="/admin/settings"
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-gunmetal-gray p-6 rounded-lg shadow-md border border-cool-cyan/20">
        <h2 className="text-xl font-semibold text-cool-cyan mb-4">🕓 Recent Activity</h2>
        <div className="space-y-4">
          <div className="bg-forge-black border border-cool-cyan p-4 rounded">
            <h4 className="text-molten-orange">Recently Added Project</h4>
            <p className="text-steel-blue">"AI Game Trainer" — July 2025</p>
          </div>
          
          <div className="bg-forge-black border border-cool-cyan p-4 rounded">
            <h4 className="text-molten-orange">Recent Hackathon Result</h4>
            <p className="text-steel-blue">"Smart India Hackathon" — 1st Place</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 