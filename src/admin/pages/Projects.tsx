import React, { useState, useEffect } from 'react';
import { projects as initialProjects } from '../../data/projects';

// Define the Project type
interface Project {
  id: number;
  title: string;
  type: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  image: string;
}

// Project form initial state
const emptyProject: Project = {
  id: 0,
  title: '',
  type: '',
  description: '',
  tags: [],
  github: '',
  demo: '',
  image: ''
};

const Projects: React.FC = () => {
  // State for projects data
  const [projects, setProjects] = useState<Project[]>([]);
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project>(emptyProject);
  const [isEditing, setIsEditing] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<number | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Project>(emptyProject);
  const [tagInput, setTagInput] = useState('');

  // Load projects on component mount
  useEffect(() => {
    setProjects(initialProjects);
  }, []);

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

  // Open modal for adding a new project
  const openAddModal = () => {
    setIsEditing(false);
    setFormData(emptyProject);
    setIsModalOpen(true);
  };

  // Open modal for editing a project
  const openEditModal = (project: Project) => {
    setIsEditing(true);
    setFormData({...project});
    setCurrentProject(project);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(emptyProject);
    setTagInput('');
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: number) => {
    setProjectToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing) {
      // Update existing project
      setProjects(projects.map(project => 
        project.id === currentProject.id ? { ...formData, id: project.id } : project
      ));
    } else {
      // Add new project
      const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
      setProjects([...projects, { ...formData, id: newId }]);
    }
    
    closeModal();
  };

  // Handle project deletion
  const handleDelete = () => {
    if (projectToDelete !== null) {
      setProjects(projects.filter(project => project.id !== projectToDelete));
      closeDeleteModal();
    }
  };

  // Project type options
  const projectTypes = [
    'Web Application',
    'Mobile App',
    'Desktop App',
    'Multiplayer Game',
    'Mobile Game',
    'Developer Tool',
    'Hackathon Project',
    'Other'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cool-cyan">Projects Management</h1>
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Project
        </button>
      </div>

      {/* Projects Table */}
      <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
        <div className="p-4 border-b border-cool-cyan/20">
          <h2 className="text-lg font-semibold text-cool-cyan">All Projects ({projects.length})</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-cool-cyan/20">
            <thead className="bg-forge-black">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-blue uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-blue uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-blue uppercase tracking-wider">Tags</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-blue uppercase tracking-wider">Links</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-steel-blue uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-gunmetal-gray divide-y divide-cool-cyan/10">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-md object-cover" 
                          src={project.image} 
                          alt={project.title}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/public/vite.svg';
                          }}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-chrome-silver">{project.title}</div>
                        <div className="text-xs text-steel-blue line-clamp-1">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-steel-blue">{project.type}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-forge-black text-cool-cyan rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      {project.github && (
                        <a 
                          href={project.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-cool-cyan hover:text-molten-orange"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                      {project.demo && (
                        <a 
                          href={project.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-molten-orange hover:text-ember-red"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button 
                        onClick={() => openEditModal(project)}
                        className="text-cool-cyan hover:text-molten-orange transition flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => openDeleteModal(project.id)}
                        className="text-ember-red hover:text-ember-red/80 transition flex items-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {projects.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-steel-blue">No projects found. Add your first project!</p>
          </div>
        )}
      </div>

      {/* Add/Edit Project Modal */}
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
                  {/* Title */}
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
                  
                  {/* Type */}
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
                      <option value="">Select project type</option>
                      {projectTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Description */}
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
                      rows={4}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="Enter project description"
                    />
                  </div>
                  
                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-chrome-silver mb-1">
                      Tags
                    </label>
                    <div className="flex">
                      <input
                        id="tagInput"
                        type="text"
                        value={tagInput}
                        onChange={handleTagInputChange}
                        onKeyDown={handleTagKeyDown}
                        className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-l-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                        placeholder="Add a tag and press Enter"
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
                      value={formData.github}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  
                  {/* Demo URL */}
                  <div>
                    <label htmlFor="demo" className="block text-sm font-medium text-chrome-silver mb-1">
                      Live Demo URL
                    </label>
                    <input
                      id="demo"
                      name="demo"
                      type="url"
                      value={formData.demo}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="https://example.com"
                    />
                  </div>
                  
                  {/* Image URL */}
                  <div>
                    <label htmlFor="image" className="block text-sm font-medium text-chrome-silver mb-1">
                      Image URL
                    </label>
                    <input
                      id="image"
                      name="image"
                      type="text"
                      value={formData.image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="/assets/your-image.png"
                    />
                  </div>
                  
                  {/* Live Preview */}
                  <div className="border border-cool-cyan/20 rounded-lg p-4 bg-forge-black">
                    <h3 className="text-sm font-medium text-cool-cyan mb-3">Live Preview</h3>
                    <div className="space-y-2">
                      <h4 className="text-lg font-medium text-chrome-silver">{formData.title || 'Project Title'}</h4>
                      <p className="text-sm text-steel-blue line-clamp-2">{formData.description || 'Project description will appear here'}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {formData.tags.length > 0 ? formData.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-gunmetal-gray text-cool-cyan rounded">
                            {tag}
                          </span>
                        )) : (
                          <span className="text-xs text-steel-blue">No tags added</span>
                        )}
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-12 h-12 rounded-md bg-gunmetal-gray overflow-hidden mr-2">
                          {formData.image ? (
                            <img 
                              src={formData.image} 
                              alt="Preview" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/public/vite.svg';
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-steel-blue">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-xs text-steel-blue">{formData.type || 'Project Type'}</p>
                        </div>
                      </div>
                    </div>
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

export default Projects; 