import React, { useState, useEffect } from 'react';
import gamesData from '../../data/games';
import type { Game } from '../../data/games';

// Game form initial state
const emptyGame: Game = {
  id: '',
  title: '',
  description: '',
  image: '',
  tags: [],
  github: '',
  demo: ''
};

// Engine/Platform options
const engineOptions = [
  'Unity',
  'Unreal Engine',
  'Godot',
  'WebGL',
  'HTML5 Canvas',
  'React Native',
  'Flutter',
  'Android SDK',
  'iOS Swift',
  'JavaScript',
  'Phaser',
  'Three.js',
  'Other'
];

const GamesManager: React.FC = () => {
  // State for games data
  const [games, setGames] = useState<Game[]>([]);
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentGame, setCurrentGame] = useState<Game | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<string | null>(null);
  
  // Form state
  const [formData, setFormData] = useState<Game>(emptyGame);
  const [tagInput, setTagInput] = useState('');

  // Load games on component mount
  useEffect(() => {
    setGames(gamesData);
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

  // Open modal for adding a new game
  const openAddModal = () => {
    setIsEditing(false);
    setFormData(emptyGame);
    setIsModalOpen(true);
  };

  // Open modal for editing a game
  const openEditModal = (game: Game) => {
    setIsEditing(true);
    setFormData({...game});
    setCurrentGame(game);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setFormData(emptyGame);
    setTagInput('');
  };

  // Open delete confirmation modal
  const openDeleteModal = (id: string) => {
    setGameToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setGameToDelete(null);
  };

  // Generate unique ID for new game
  const generateId = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now().toString().slice(-4);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentGame) {
      // Update existing game
      const updatedGames = games.map(g => 
        g.id === currentGame.id ? { ...formData } : g
      );
      setGames(updatedGames);
    } else {
      // Add new game
      const newId = generateId(formData.title);
      setGames([...games, { ...formData, id: newId }]);
    }
    
    closeModal();
  };

  // Handle game deletion
  const handleDelete = () => {
    if (gameToDelete) {
      setGames(games.filter(g => g.id !== gameToDelete));
      closeDeleteModal();
    }
  };

  // Get game status
  const getGameStatus = (game: Game) => {
    if (!game.demo && !game.github) return 'Development';
    if (game.demo) return 'Published';
    return 'Beta';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cool-cyan">Games Management</h1>
        <button 
          onClick={openAddModal}
          className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Game
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const status = getGameStatus(game);
          return (
            <div key={game.id} className="bg-gunmetal-gray rounded-lg overflow-hidden border border-cool-cyan/20 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={game.image} 
                  alt={game.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/public/vite.svg';
                  }}
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    status === 'Published' 
                      ? 'bg-green-900/70 text-green-400' 
                      : status === 'Beta'
                        ? 'bg-blue-900/70 text-blue-400'
                        : 'bg-yellow-900/70 text-yellow-400'
                  }`}>
                    {status}
                  </span>
                </div>
              </div>
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-semibold text-cool-cyan">{game.title}</h3>
                <p className="text-sm text-steel-blue mt-1 line-clamp-2">{game.description}</p>
                
                <div className="mt-3">
                  <div className="flex flex-wrap gap-1 my-2">
                    {game.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-0.5 text-xs bg-forge-black text-cool-cyan rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2 mt-3">
                  {game.github && (
                    <a 
                      href={game.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-cool-cyan hover:text-molten-orange"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                  {game.demo && (
                    <a 
                      href={game.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-molten-orange hover:text-ember-red"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
              <div className="px-4 py-3 bg-forge-black flex justify-between">
                <button 
                  onClick={() => openEditModal(game)}
                  className="text-cool-cyan hover:text-molten-orange text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button 
                  onClick={() => openDeleteModal(game.id)}
                  className="text-ember-red hover:text-ember-red/80 text-sm flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {games.length === 0 && (
        <div className="bg-forge-black p-8 text-center rounded-lg border border-cool-cyan/10">
          <p className="text-steel-blue">No games found. Add your first game!</p>
        </div>
      )}

      {/* Add/Edit Game Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-forge-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gunmetal-gray rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-cool-cyan">
                {isEditing ? 'Edit Game' : 'Add New Game'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  {/* Game Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-chrome-silver mb-1">
                      Game Title*
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      required
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="Enter game title"
                    />
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
                      rows={3}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="Describe your game"
                    />
                  </div>
                  
                  {/* Engine/Platform Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-chrome-silver mb-1">
                      Engine & Platform Tags
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
                        list="engineOptions"
                      />
                      <datalist id="engineOptions">
                        {engineOptions.map((option, index) => (
                          <option key={index} value={option} />
                        ))}
                      </datalist>
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
                  
                  {/* Demo URL */}
                  <div>
                    <label htmlFor="demo" className="block text-sm font-medium text-chrome-silver mb-1">
                      Play/Demo URL
                    </label>
                    <input
                      id="demo"
                      name="demo"
                      type="url"
                      value={formData.demo || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                      placeholder="https://play.google.com/store/apps/details?id=com.example"
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
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
                      placeholder="/assets/your-game-image.png"
                    />
                  </div>
                  
                  {/* Game Preview */}
                  <div className="border border-cool-cyan/20 rounded-lg p-4 bg-forge-black">
                    <h3 className="text-sm font-medium text-cool-cyan mb-3">Game Preview</h3>
                    <div className="space-y-4">
                      <div className="h-48 bg-gunmetal-gray rounded-md overflow-hidden">
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
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium text-chrome-silver">{formData.title || 'Game Title'}</h4>
                        <p className="text-sm text-steel-blue mt-1 line-clamp-2">{formData.description || 'Game description will appear here'}</p>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.tags.length > 0 ? formData.tags.map((tag, index) => (
                            <span key={index} className="px-2 py-0.5 text-xs bg-gunmetal-gray text-cool-cyan rounded">
                              {tag}
                            </span>
                          )) : (
                            <span className="text-xs text-steel-blue">No tags added</span>
                          )}
                        </div>
                        
                        <div className="flex space-x-2 mt-3">
                          {formData.github && (
                            <span className="text-cool-cyan">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </span>
                          )}
                          {formData.demo && (
                            <span className="text-molten-orange">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </span>
                          )}
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
                  {isEditing ? 'Update Game' : 'Add Game'}
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
                Are you sure you want to delete this game? This action cannot be undone.
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
                  Delete Game
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamesManager; 