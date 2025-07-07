import { useState, useEffect } from 'react';
import hackathonsData from '../../data/hackathons';
import type { Hackathon as HackathonType } from '../../data/hackathons';

interface Hackathon extends HackathonType {
  // Add any additional properties needed for the admin interface
}

const HackathonManager = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Hackathon | null>(null);

  useEffect(() => {
    // Load hackathons from local storage or use initial data
    const storedHackathons = localStorage.getItem('admin_hackathons');
    if (storedHackathons) {
      setHackathons(JSON.parse(storedHackathons));
    } else {
      setHackathons(hackathonsData as Hackathon[]);
    }
  }, []);

  // Save hackathons to local storage whenever they change
  useEffect(() => {
    if (hackathons.length > 0) {
      localStorage.setItem('admin_hackathons', JSON.stringify(hackathons));
    }
  }, [hackathons]);

  const handleSelectHackathon = (hackathon: Hackathon) => {
    setSelectedHackathon(hackathon);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (selectedHackathon) {
      setEditForm({ ...selectedHackathon });
      setIsEditing(true);
    }
  };

  const handleDeleteHackathon = (id: string) => {
    setHackathons(hackathons.filter(hackathon => hackathon.id !== id));
    if (selectedHackathon?.id === id) {
      setSelectedHackathon(null);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editForm) {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleToolsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      setEditForm({ 
        ...editForm, 
        tools: e.target.value.split(',').map(tool => tool.trim())
      });
    }
  };

  const handleSaveChanges = () => {
    if (editForm) {
      setHackathons(hackathons.map(hackathon => 
        hackathon.id === editForm.id ? editForm : hackathon
      ));
      setSelectedHackathon(editForm);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gunmetal-gray rounded-xl border border-cool-cyan/20 shadow-lg overflow-hidden">
      <div className="p-4 border-b border-cool-cyan/20 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-cool-cyan">Hackathon Manager</h2>
        <span className="bg-molten-orange/20 text-molten-orange text-xs px-2 py-1 rounded-full border border-molten-orange/30">
          {hackathons.length} Hackathons
        </span>
      </div>

      <div className="grid md:grid-cols-2 h-[500px]">
        {/* Hackathon List */}
        <div className="border-r border-cool-cyan/20 overflow-y-auto max-h-[500px]">
          {hackathons.length === 0 ? (
            <div className="p-4 text-center text-chrome-silver/60">No hackathons found</div>
          ) : (
            <ul>
              {hackathons.map(hackathon => (
                <li 
                  key={hackathon.id} 
                  className={`border-b border-cool-cyan/10 p-3 cursor-pointer hover:bg-forge-black/50 transition ${
                    selectedHackathon?.id === hackathon.id ? 'bg-forge-black' : ''
                  }`}
                  onClick={() => handleSelectHackathon(hackathon)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-forge-black rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img 
                        src={hackathon.logo} 
                        alt={hackathon.name} 
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-cool-cyan font-medium">{hackathon.name}</h3>
                      <p className="text-xs text-chrome-silver/70">{hackathon.date}</p>
                      <p className="text-xs text-chrome-silver mt-1">
                        <span className="bg-ember-red/20 text-ember-red px-1.5 py-0.5 rounded">
                          {hackathon.result}
                        </span>
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hackathon Detail */}
        <div className="p-4 bg-forge-black/30 overflow-y-auto max-h-[500px]">
          {selectedHackathon && !isEditing ? (
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-cool-cyan">{selectedHackathon.name}</h3>
                  <span className="text-xs bg-ember-red/20 text-ember-red px-2 py-1 rounded">
                    {selectedHackathon.result}
                  </span>
                </div>
                
                <div className="w-full h-24 bg-forge-black rounded-lg overflow-hidden mb-3 flex items-center justify-center">
                  <img 
                    src={selectedHackathon.logo} 
                    alt={selectedHackathon.name} 
                    className="h-16 object-contain"
                  />
                </div>
                
                <div className="space-y-2 mb-3">
                  <div>
                    <span className="text-xs text-chrome-silver/70">Role:</span>
                    <p className="text-chrome-silver text-sm">{selectedHackathon.role}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs text-chrome-silver/70">Problem:</span>
                    <p className="text-chrome-silver text-sm">{selectedHackathon.statement}</p>
                  </div>
                  
                  <div>
                    <span className="text-xs text-chrome-silver/70">Date:</span>
                    <p className="text-chrome-silver text-sm">{selectedHackathon.date}</p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className="text-xs text-chrome-silver/70 block mb-1">Tools:</span>
                  <div className="flex flex-wrap gap-1">
                    {selectedHackathon.tools.map((tool, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-steel-blue/20 text-steel-blue px-2 py-1 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <a 
                    href={selectedHackathon.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cool-cyan hover:underline text-sm"
                  >
                    {selectedHackathon.link}
                  </a>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-cool-cyan/10">
                <button
                  onClick={handleEditClick}
                  className="bg-steel-blue/80 hover:bg-steel-blue text-white px-3 py-1.5 rounded text-sm"
                >
                  Edit Hackathon
                </button>
                <button
                  onClick={() => handleDeleteHackathon(selectedHackathon.id)}
                  className="bg-ember-red/80 hover:bg-ember-red text-white px-3 py-1.5 rounded text-sm"
                >
                  Delete Hackathon
                </button>
              </div>
            </div>
          ) : isEditing && editForm ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-cool-cyan">Edit Hackathon</h3>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Logo Path</label>
                <input
                  type="text"
                  name="logo"
                  value={editForm.logo}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Role</label>
                <input
                  type="text"
                  name="role"
                  value={editForm.role}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Problem Statement</label>
                <textarea
                  name="statement"
                  value={editForm.statement}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                  rows={3}
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Tools (comma separated)</label>
                <input
                  type="text"
                  name="tools"
                  value={editForm.tools.join(', ')}
                  onChange={handleToolsChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Result</label>
                <input
                  type="text"
                  name="result"
                  value={editForm.result || ''}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Date</label>
                <input
                  type="text"
                  name="date"
                  value={editForm.date}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Link</label>
                <input
                  type="text"
                  name="link"
                  value={editForm.link || ''}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gunmetal-gray hover:bg-gunmetal-gray/80 text-chrome-silver px-3 py-1.5 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveChanges}
                  className="bg-cool-cyan hover:bg-cool-cyan/80 text-forge-black px-3 py-1.5 rounded text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-chrome-silver/50">
              Select a hackathon to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HackathonManager; 