import { useState, useEffect } from 'react';
import { projects as initialProjects } from '../../data/projects';

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

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Project | null>(null);

  useEffect(() => {
    // Load projects from local storage or use initial data
    const storedProjects = localStorage.getItem('admin_projects');
    if (storedProjects) {
      setProjects(JSON.parse(storedProjects));
    } else {
      setProjects(initialProjects);
    }
  }, []);

  // Save projects to local storage whenever they change
  useEffect(() => {
    if (projects.length > 0) {
      localStorage.setItem('admin_projects', JSON.stringify(projects));
    }
  }, [projects]);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setIsEditing(false);
  };

  const handleEditClick = () => {
    if (selectedProject) {
      setEditForm({ ...selectedProject });
      setIsEditing(true);
    }
  };

  const handleDeleteProject = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
    if (selectedProject?.id === id) {
      setSelectedProject(null);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editForm) {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editForm) {
      setEditForm({ 
        ...editForm, 
        tags: e.target.value.split(',').map(tag => tag.trim())
      });
    }
  };

  const handleSaveChanges = () => {
    if (editForm) {
      setProjects(projects.map(project => 
        project.id === editForm.id ? editForm : project
      ));
      setSelectedProject(editForm);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-gunmetal-gray rounded-xl border border-cool-cyan/20 shadow-lg overflow-hidden">
      <div className="p-4 border-b border-cool-cyan/20 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-cool-cyan">Project Manager</h2>
        <span className="bg-molten-orange/20 text-molten-orange text-xs px-2 py-1 rounded-full border border-molten-orange/30">
          {projects.length} Projects
        </span>
      </div>

      <div className="grid md:grid-cols-2 h-[500px]">
        {/* Project List */}
        <div className="border-r border-cool-cyan/20 overflow-y-auto max-h-[500px]">
          {projects.length === 0 ? (
            <div className="p-4 text-center text-chrome-silver/60">No projects found</div>
          ) : (
            <ul>
              {projects.map(project => (
                <li 
                  key={project.id} 
                  className={`border-b border-cool-cyan/10 p-3 cursor-pointer hover:bg-forge-black/50 transition ${
                    selectedProject?.id === project.id ? 'bg-forge-black' : ''
                  }`}
                  onClick={() => handleSelectProject(project)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-forge-black rounded overflow-hidden flex-shrink-0">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-cool-cyan font-medium">{project.title}</h3>
                      <p className="text-xs text-chrome-silver/70">{project.type}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="text-xs bg-steel-blue/20 text-steel-blue px-1.5 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 2 && (
                          <span className="text-xs text-chrome-silver/60">
                            +{project.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Project Detail */}
        <div className="p-4 bg-forge-black/30 overflow-y-auto max-h-[500px]">
          {selectedProject && !isEditing ? (
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-cool-cyan">{selectedProject.title}</h3>
                  <span className="text-xs bg-molten-orange/20 text-molten-orange px-2 py-1 rounded">
                    {selectedProject.type}
                  </span>
                </div>
                
                <div className="w-full h-32 bg-forge-black rounded-lg overflow-hidden mb-3">
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <p className="text-chrome-silver text-sm mb-3">{selectedProject.description}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {selectedProject.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-steel-blue/20 text-steel-blue px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <a 
                    href={selectedProject.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cool-cyan hover:underline truncate"
                  >
                    GitHub: {selectedProject.github}
                  </a>
                  <a 
                    href={selectedProject.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-cool-cyan hover:underline truncate"
                  >
                    Demo: {selectedProject.demo}
                  </a>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-cool-cyan/10">
                <button
                  onClick={handleEditClick}
                  className="bg-steel-blue/80 hover:bg-steel-blue text-white px-3 py-1.5 rounded text-sm"
                >
                  Edit Project
                </button>
                <button
                  onClick={() => handleDeleteProject(selectedProject.id)}
                  className="bg-ember-red/80 hover:bg-ember-red text-white px-3 py-1.5 rounded text-sm"
                >
                  Delete Project
                </button>
              </div>
            </div>
          ) : isEditing && editForm ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-cool-cyan">Edit Project</h3>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={editForm.type}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={editForm.tags.join(', ')}
                  onChange={handleTagsChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">GitHub URL</label>
                <input
                  type="text"
                  name="github"
                  value={editForm.github}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Demo URL</label>
                <input
                  type="text"
                  name="demo"
                  value={editForm.demo}
                  onChange={handleInputChange}
                  className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                />
              </div>
              
              <div>
                <label className="block text-sm text-chrome-silver/80 mb-1">Image Path</label>
                <input
                  type="text"
                  name="image"
                  value={editForm.image}
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
                  className="bg-cool-cyan/80 hover:bg-cool-cyan text-white px-3 py-1.5 rounded text-sm"
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-chrome-silver/60">
              Select a project to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager; 