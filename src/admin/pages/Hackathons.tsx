import React, { useState, useEffect } from 'react';
import hackathonsData from '../../data/hackathons';
import type { Hackathon } from '../../data/hackathons';

// Form initial state
const emptyHackathon: Hackathon = {
  id: '',
  name: '',
  date: '',
  logo: '',
  statement: '',
  role: '',
  tools: [],
  result: '',
  link: '',
  category: ''
};

// Result badges/status
const getResultBadge = (result?: string) => {
  if (!result) return null;

  if (result.toLowerCase().includes('winner') || result.toLowerCase().includes('1st') || result.toLowerCase().includes('gold')) {
    return { emoji: '🏆', class: 'bg-amber-900/20 text-amber-400' };
  } else if (result.toLowerCase().includes('finalist') || result.toLowerCase().includes('2nd') || result.toLowerCase().includes('silver')) {
    return { emoji: '🥈', class: 'bg-slate-900/20 text-slate-400' };
  } else if (result.toLowerCase().includes('top') || result.toLowerCase().includes('3rd') || result.toLowerCase().includes('bronze')) {
    return { emoji: '🥉', class: 'bg-amber-800/20 text-amber-600' };
  } else {
    return { emoji: '👨‍💻', class: 'bg-steel-blue/20 text-steel-blue' };
  }
};

const HackathonsManager: React.FC = () => {
  // State for hackathons data
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<Hackathon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentHackathon, setCurrentHackathon] = useState<Hackathon | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [hackathonToDelete, setHackathonToDelete] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Hackathon>(emptyHackathon);
  const [toolInput, setToolInput] = useState('');

  // Load hackathons on component mount
  useEffect(() => {
    setHackathons(hackathonsData);
    setFilteredHackathons(hackathonsData);
  }, []);

  // Filter hackathons when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredHackathons(hackathons);
      return;
    }

    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = hackathons.filter(
      hackathon => 
        hackathon.name.toLowerCase().includes(lowerCaseSearch) ||
        hackathon.statement.toLowerCase().includes(lowerCaseSearch) ||
        hackathon.role.toLowerCase().includes(lowerCaseSearch) ||
        hackathon.tools.some(tool => tool.toLowerCase().includes(lowerCaseSearch)) ||
        (hackathon.result && hackathon.result.toLowerCase().includes(lowerCaseSearch))
    );
    setFilteredHackathons(filtered);
  }, [searchTerm, hackathons]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle tool input
  const handleToolInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setToolInput(e.target.value);
  };

  // Add a tool
  const addTool = () => {
    if (toolInput.trim() && !formData.tools.includes(toolInput.trim())) {
      setFormData({
        ...formData,
        tools: [...formData.tools, toolInput.trim()]
      });
      setToolInput('');
    }
  };

  // Remove a tool
  const removeTool = (toolToRemove: string) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter(tool => tool !== toolToRemove)
    });
  };

  // Handle tool input keydown
  const handleToolKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTool();
    }
  };

  // Open modal for adding a new hackathon
  const openAddModal = () => {
    setIsEditing(false);
    setFormData(emptyHackathon);
    setIsModalOpen(true);
  };

  // Open modal for editing a hackathon
  const openEditModal = (hackathon: Hackathon) => {
    setIsEditing(true);
    setFormData({...hackathon});
    setCurrentHackathon(hackathon);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(emptyHackathon);
    setToolInput('');
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: string) => {
    setHackathonToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setHackathonToDelete(null);
  };

  // Generate unique ID for new hackathon
  const generateId = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentHackathon) {
      // Update existing hackathon
      const updatedHackathons = hackathons.map(h => 
        h.id === currentHackathon.id ? { ...formData } : h
      );
      setHackathons(updatedHackathons);
    } else {
      // Add new hackathon
      const newId = generateId(formData.name);
      setHackathons([...hackathons, { ...formData, id: newId }]);
    }
    
    closeModal();
  };

  // Handle hackathon deletion
  const handleDelete = () => {
    if (hackathonToDelete) {
      setHackathons(hackathons.filter(h => h.id !== hackathonToDelete));
      closeDeleteModal();
    }
  };

  // Role options
  const roleOptions = [
    'Team Lead',
    'Frontend Developer',
    'Backend Developer',
    'Full Stack Developer',
    'UI/UX Designer',
    'AI/ML Engineer',
    'DevOps Engineer',
    'Project Manager',
    'Other'
  ];

  // Category options
  const categoryOptions = [
    'Web',
    'Mobile',
    'AI/ML',
    'IoT',
    'Blockchain',
    'AR/VR',
    'Cloud',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Header with search */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-cool-cyan">Hackathons Management</h1>
        <div className="flex gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hackathons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan pl-10"
            />
            <div className="absolute left-3 top-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-steel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button 
            onClick={openAddModal}
            className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition flex items-center whitespace-nowrap"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Hackathon
          </button>
        </div>
      </div>

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHackathons.map((hackathon) => {
          const badge = getResultBadge(hackathon.result);
          return (
            <div key={hackathon.id} className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden shadow-md">
              <div className="p-4 flex items-center border-b border-cool-cyan/20">
                <div className="w-12 h-12 flex-shrink-0 bg-forge-black rounded-md flex items-center justify-center overflow-hidden mr-3">
                  {hackathon.logo ? (
                    <img 
                      src={hackathon.logo} 
                      alt={hackathon.name} 
                      className="w-10 h-10 object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/public/vite.svg';
                      }}
                    />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-steel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-chrome-silver">{hackathon.name}</h3>
                  <p className="text-sm text-steel-blue">{hackathon.date}</p>
                </div>
                {badge && (
                  <span className={`px-3 py-1 text-sm rounded-full flex items-center ${badge.class}`}>
                    <span className="mr-1">{badge.emoji}</span>
                    {hackathon.result}
                  </span>
                )}
              </div>
              
              <div className="p-4 bg-forge-black/30">
                <div className="mb-3">
                  <div className="text-xs text-steel-blue font-medium uppercase tracking-wider mb-1">Role</div>
                  <div className="text-sm text-chrome-silver">{hackathon.role}</div>
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-steel-blue font-medium uppercase tracking-wider mb-1">Problem Statement</div>
                  <div className="text-sm text-chrome-silver line-clamp-2">{hackathon.statement}</div>
                </div>
                
                <div className="mb-3">
                  <div className="text-xs text-steel-blue font-medium uppercase tracking-wider mb-1">Technologies</div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {hackathon.tools.map((tool, index) => (
                      <span key={index} className="px-2 py-0.5 text-xs bg-forge-black text-cool-cyan rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                
                {hackathon.link && (
                  <div className="mb-4">
                    <a 
                      href={hackathon.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-cool-cyan hover:text-molten-orange flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Project
                    </a>
                  </div>
                )}
                
                <div className="flex justify-end space-x-3 pt-2 border-t border-cool-cyan/10">
                  <button 
                    onClick={() => openEditModal(hackathon)}
                    className="text-cool-cyan hover:text-molten-orange transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                  <button 
                    onClick={() => openDeleteModal(hackathon.id)}
                    className="text-ember-red hover:text-ember-red/80 transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredHackathons.length === 0 && (
        <div className="bg-forge-black p-8 text-center rounded-lg border border-cool-cyan/10">
          <p className="text-steel-blue">
            {searchTerm ? 'No hackathons match your search criteria.' : 'No hackathons found. Add your first hackathon!'}
          </p>
        </div>
      )}

      {/* Add/Edit Hackathon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-forge-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gunmetal-gray rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-cool-cyan">
                {isEditing ? 'Edit Hackathon' : 'Add New Hackathon'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Hackathon Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-chrome-silver mb-1">
                      Hackathon Name*
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="Enter hackathon name"
                    />
                  </div>
                  
                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-chrome-silver mb-1">
                      Date*
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="text"
                      required
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="E.g., June 2024"
                    />
                  </div>
                  
                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-chrome-silver mb-1">
                      Role*
                    </label>
                    <select
                      id="role"
                      name="role"
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    >
                      <option value="">Select your role</option>
                      {roleOptions.map((role, index) => (
                        <option key={index} value={role}>{role}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Problem Statement */}
                  <div>
                    <label htmlFor="statement" className="block text-sm font-medium text-chrome-silver mb-1">
                      Problem Statement*
                    </label>
                    <textarea
                      id="statement"
                      name="statement"
                      required
                      value={formData.statement}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="Describe the problem you solved"
                    />
                  </div>
                  
                  {/* Technologies */}
                  <div>
                    <label htmlFor="tools" className="block text-sm font-medium text-chrome-silver mb-1">
                      Technologies Used
                    </label>
                    <div className="flex">
                      <input
                        id="toolInput"
                        type="text"
                        value={toolInput}
                        onChange={handleToolInputChange}
                        onKeyDown={handleToolKeyDown}
                        className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-l-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                        placeholder="Add a technology and press Enter"
                      />
                      <button
                        type="button"
                        onClick={addTool}
                        className="px-4 py-2 bg-cool-cyan text-forge-black rounded-r-lg hover:bg-cool-cyan/80 transition"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tools.map((tool, index) => (
                        <div key={index} className="flex items-center bg-forge-black text-cool-cyan px-2 py-1 rounded">
                          <span>{tool}</span>
                          <button
                            type="button"
                            onClick={() => removeTool(tool)}
                            className="ml-2 text-ember-red hover:text-ember-red/80"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {/* Result */}
                  <div>
                    <label htmlFor="result" className="block text-sm font-medium text-chrome-silver mb-1">
                      Result / Award
                    </label>
                    <input
                      id="result"
                      name="result"
                      type="text"
                      value={formData.result || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="E.g., 1st Place, Finalist, etc."
                    />
                  </div>
                  
                  {/* Category */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-chrome-silver mb-1">
                      Category
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    >
                      <option value="">Select category</option>
                      {categoryOptions.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* External Link */}
                  <div>
                    <label htmlFor="link" className="block text-sm font-medium text-chrome-silver mb-1">
                      Project Link
                    </label>
                    <input
                      id="link"
                      name="link"
                      type="url"
                      value={formData.link || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  
                  {/* Logo URL */}
                  <div>
                    <label htmlFor="logo" className="block text-sm font-medium text-chrome-silver mb-1">
                      Logo URL
                    </label>
                    <input
                      id="logo"
                      name="logo"
                      type="text"
                      value={formData.logo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="/assets/hackathon-logo.svg"
                    />
                  </div>
                  
                  {/* Logo Preview */}
                  <div className="border border-cool-cyan/20 rounded-lg p-4 bg-forge-black">
                    <h3 className="text-sm font-medium text-cool-cyan mb-3">Logo Preview</h3>
                    <div className="w-20 h-20 bg-gunmetal-gray rounded-md flex items-center justify-center overflow-hidden mb-2">
                      {formData.logo ? (
                        <img 
                          src={formData.logo} 
                          alt="Preview" 
                          className="w-16 h-16 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/public/vite.svg';
                          }}
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-steel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-steel-blue">
                      {formData.logo ? "Logo will be displayed as shown above" : "Enter a URL to see logo preview"}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-forge-black text-chrome-silver rounded-lg hover:bg-forge-black/80 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition"
                >
                  {isEditing ? 'Update Hackathon' : 'Add Hackathon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-forge-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gunmetal-gray rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-cool-cyan">Confirm Deletion</h2>
            </div>
            
            <div className="p-6">
              <p className="text-chrome-silver mb-6">
                Are you sure you want to delete this hackathon? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 bg-forge-black text-chrome-silver rounded-lg hover:bg-forge-black/80 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-ember-red text-white rounded-lg hover:bg-ember-red/80 transition"
                >
                  Delete Hackathon
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HackathonsManager; 