import React, { useState, useEffect } from 'react';
import webappsData from '../../data/webapps';
import type { WebApp } from '../../data/webapps';

// Empty web app template for new entries
const emptyWebApp: WebApp = {
  id: '',
  title: '',
  description: '',
  image: '',
  type: 'Website',
  tags: [],
  github: '',
  demo: ''
};

const WebAppsManager: React.FC = () => {
  // State for webapps data
  const [webapps, setWebapps] = useState<WebApp[]>([]);
  const [filteredWebapps, setFilteredWebapps] = useState<WebApp[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('');
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentWebApp, setCurrentWebApp] = useState<WebApp | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [webAppToDelete, setWebAppToDelete] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<WebApp>(emptyWebApp);
  const [tagInput, setTagInput] = useState('');

  // Load webapps on component mount
  useEffect(() => {
    setWebapps(webappsData);
    setFilteredWebapps(webappsData);
  }, []);

  // Filter webapps when search term or filter type changes
  useEffect(() => {
    let filtered = [...webapps];
    
    // Apply type filter if selected
    if (filterType) {
      filtered = filtered.filter(webapp => webapp.type === filterType);
    }
    
    // Apply search filter if present
    if (searchTerm.trim()) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        webapp => 
          webapp.title.toLowerCase().includes(lowerCaseSearch) ||
          webapp.description.toLowerCase().includes(lowerCaseSearch) ||
          webapp.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearch))
      );
    }
    
    setFilteredWebapps(filtered);
  }, [searchTerm, filterType, webapps]);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle tag input
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // Add a tag
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  // Handle tag input keydown
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // Open modal for adding a new webapp
  const openAddModal = () => {
    setIsEditing(false);
    setFormData({...emptyWebApp, id: generateId()});
    setIsModalOpen(true);
  };

  // Open modal for editing a webapp
  const openEditModal = (webapp: WebApp) => {
    setIsEditing(true);
    setFormData({...webapp});
    setCurrentWebApp(webapp);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(emptyWebApp);
    setTagInput('');
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: string) => {
    setWebAppToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setWebAppToDelete(null);
  };

  // Generate unique ID for new webapp
  const generateId = () => {
    return Date.now().toString();
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentWebApp) {
      // Update existing webapp
      const updatedWebapps = webapps.map(w => 
        w.id === currentWebApp.id ? { ...formData } : w
      );
      setWebapps(updatedWebapps);
    } else {
      // Add new webapp with the generated id
      setWebapps([...webapps, formData]);
    }
    
    closeModal();
  };

  // Handle webapp deletion
  const handleDelete = () => {
    if (webAppToDelete) {
      setWebapps(webapps.filter(w => w.id !== webAppToDelete));
      closeDeleteModal();
    }
  };

  // Copy URL to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <div className="space-y-6">
      {/* Header with search and filter */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-2xl font-bold text-cool-cyan">Web/App Projects Manager</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
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
          
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
            >
              <option value="">All Types</option>
              <option value="Website">Websites</option>
              <option value="App">Apps</option>
              <option value="Tool">Tools</option>
            </select>
            
            <button 
              onClick={openAddModal}
              className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition flex items-center whitespace-nowrap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Project
            </button>
          </div>
        </div>
      </div>

      {/* WebApps Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWebapps.map((webapp) => (
          <div key={webapp.id} className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden shadow-md">
            {/* Project Header */}
            <div className="p-4 flex items-center border-b border-cool-cyan/20">
              <div className="w-12 h-12 flex-shrink-0 bg-forge-black rounded-md flex items-center justify-center overflow-hidden mr-3">
                {webapp.image ? (
                  <img 
                    src={webapp.image} 
                    alt={webapp.title} 
                    className="w-10 h-10 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/public/vite.svg';
                    }}
                  />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-steel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-chrome-silver">{webapp.title}</h3>
                <span className="inline-block px-2 py-1 text-xs bg-cool-cyan/10 text-cool-cyan rounded-full">
                  {webapp.type}
                </span>
              </div>
            </div>
            
            {/* Project Details */}
            <div className="p-4 bg-forge-black/30">
              <div className="mb-3">
                <div className="text-sm text-steel-blue line-clamp-2">{webapp.description}</div>
              </div>
              
              <div className="mb-3">
                <div className="text-xs text-steel-blue font-medium uppercase tracking-wider mb-1">Technologies</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {webapp.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-0.5 text-xs bg-forge-black text-cool-cyan rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 mb-4">
                {webapp.github && (
                  <div className="relative group flex-1">
                    <a 
                      href={webapp.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full text-sm text-steel-blue hover:text-cool-cyan flex items-center justify-center py-1.5 px-3 bg-forge-black rounded-lg transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <button 
                      onClick={() => copyToClipboard(webapp.github || '')}
                      className="absolute right-2 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-cool-cyan hover:text-molten-orange"
                      title="Copy URL"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                )}
                
                {webapp.demo && (
                  <div className="relative group flex-1">
                    <a 
                      href={webapp.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full text-sm text-steel-blue hover:text-cool-cyan flex items-center justify-center py-1.5 px-3 bg-forge-black rounded-lg transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                    <button 
                      onClick={() => copyToClipboard(webapp.demo || '')}
                      className="absolute right-2 top-1.5 opacity-0 group-hover:opacity-100 transition-opacity p-1 text-cool-cyan hover:text-molten-orange"
                      title="Copy URL"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 pt-2 border-t border-cool-cyan/10">
                <button 
                  onClick={() => openEditModal(webapp)}
                  className="text-cool-cyan hover:text-molten-orange transition flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button 
                  onClick={() => openDeleteModal(webapp.id)}
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
        ))}
      </div>
      
      {filteredWebapps.length === 0 && (
        <div className="bg-forge-black p-8 text-center rounded-lg border border-cool-cyan/10">
          <p className="text-steel-blue">
            {searchTerm || filterType ? 'No projects match your search criteria.' : 'No projects found. Add your first project!'}
          </p>
        </div>
      )}
      
      {/* Add/Edit WebApp Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-forge-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gunmetal-gray rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-cool-cyan">
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Project Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-chrome-silver mb-1">
                      Project Title*
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="Enter project title"
                    />
                  </div>
                  
                  {/* Project Type */}
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-chrome-silver mb-1">
                      Project Type*
                    </label>
                    <select
                      id="type"
                      name="type"
                      required
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    >
                      <option value="Website">Website</option>
                      <option value="App">App</option>
                      <option value="Tool">Tool</option>
                    </select>
                  </div>
                  
                  {/* Project Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-chrome-silver mb-1">
                      Description*
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      required
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan resize-none"
                      placeholder="Describe your project"
                    />
                  </div>
                  
                  {/* Technologies/Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-chrome-silver mb-1">
                      Technologies
                    </label>
                    <div className="flex">
                      <input
                        id="tagInput"
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagKeyDown}
                        className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-l-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                        placeholder="Add a technology and press Enter"
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-2 bg-cool-cyan text-forge-black rounded-r-lg hover:bg-cool-cyan/80 transition"
                      >
                        Add
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags.map((tag, index) => (
                        <div key={index} className="flex items-center bg-forge-black text-cool-cyan px-2 py-1 rounded">
                          <span>{tag}</span>
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
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
                  {/* GitHub URL */}
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-chrome-silver mb-1">
                      GitHub URL
                    </label>
                    <input
                      id="github"
                      name="github"
                      type="url"
                      value={formData.github || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  
                  {/* Live Demo URL */}
                  <div>
                    <label htmlFor="demo" className="block text-sm font-medium text-chrome-silver mb-1">
                      Live Demo URL
                    </label>
                    <input
                      id="demo"
                      name="demo"
                      type="url"
                      value={formData.demo || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="https://your-app-demo.com"
                    />
                  </div>
                  
                  {/* Image URL */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-chrome-silver mb-1">
                      Cover Image URL*
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="text"
                      required
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="/assets/your-image.svg"
                    />
                  </div>
                  
                  {/* Image Preview */}
                  <div className="border border-cool-cyan/20 rounded-lg p-4 bg-forge-black">
                    <h3 className="text-sm font-medium text-cool-cyan mb-3">Image Preview</h3>
                    <div className="w-full h-40 bg-gunmetal-gray rounded-md flex items-center justify-center overflow-hidden mb-2">
                      {formData.image ? (
                        <img 
                          src={formData.image} 
                          alt="Preview" 
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/public/vite.svg';
                          }}
                        />
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-steel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-steel-blue">
                      {formData.image ? "Image will be displayed as shown above" : "Enter a URL to see image preview"}
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
                  {isEditing ? 'Update Project' : 'Add Project'}
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
                Are you sure you want to delete this project? This action cannot be undone.
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
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebAppsManager; 