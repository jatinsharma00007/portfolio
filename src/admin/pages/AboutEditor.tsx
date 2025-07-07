import React, { useState, useEffect } from 'react';
import { aboutData } from '../../data/aboutData';
import type { TimelineEntry, Hobby, AboutData } from '../../data/aboutData';

// Utility function for debouncing
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const AboutEditor: React.FC = () => {
  // State for the form data
  const [formData, setFormData] = useState<AboutData>({...aboutData});
  const [savedData, setSavedData] = useState<AboutData>({...aboutData});
  
  // Modal states
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [isFactModalOpen, setIsFactModalOpen] = useState(false);
  const [isHobbyModalOpen, setIsHobbyModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  // Item states for editing
  const [currentTimelineEntry, setCurrentTimelineEntry] = useState<TimelineEntry | null>(null);
  const [currentFactIndex, setCurrentFactIndex] = useState<number | null>(null);
  const [currentHobby, setCurrentHobby] = useState<Hobby | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ type: string; index: number } | null>(null);
  
  // New item states
  const [newTimelineEntry, setNewTimelineEntry] = useState<TimelineEntry>({ year: '', title: '', description: '' });
  const [newFact, setNewFact] = useState('');
  const [newHobby, setNewHobby] = useState<Hobby>({ icon: '', label: '' });
  const [newGalleryUrl, setNewGalleryUrl] = useState('');
  
  // Editing flags
  const [isEditing, setIsEditing] = useState(false);
  
  // Debounced form data for autosave
  const debouncedFormData = useDebounce(formData, 1000);
  
  // Autosave effect
  useEffect(() => {
    if (JSON.stringify(debouncedFormData) !== JSON.stringify(savedData)) {
      handleSave(false);
    }
  }, [debouncedFormData]);
  
  // Save function
  const handleSave = (showNotification = true) => {
    // In a real app, this would save to a database or API
    // For now, we'll just update our state
    setSavedData({...formData});
    console.log('Saved data:', formData);
    
    if (showNotification) {
      // Show a success notification
      alert('Changes saved successfully!');
    }
  };
  
  // Bio and tagline handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Timeline handlers
  const handleTimelineInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTimelineEntry({
      ...newTimelineEntry,
      [name]: value
    });
  };

  const handleEditTimelineEntry = (index: number) => {
    setCurrentTimelineEntry({...formData.timeline[index]});
    setIsEditing(true);
    setIsTimelineModalOpen(true);
  };

  const handleAddTimelineEntry = () => {
    setCurrentTimelineEntry(null);
    setNewTimelineEntry({ year: '', title: '', description: '' });
    setIsEditing(false);
    setIsTimelineModalOpen(true);
  };

  const handleTimelineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentTimelineEntry) {
      // Update existing entry
      const updatedTimeline = formData.timeline.map((entry, index) => 
        index === formData.timeline.findIndex(t => 
          t.year === currentTimelineEntry.year && 
          t.title === currentTimelineEntry.title
        ) ? newTimelineEntry : entry
      );
      
      setFormData({
        ...formData,
        timeline: updatedTimeline
      });
    } else {
      // Add new entry
      setFormData({
        ...formData,
        timeline: [...formData.timeline, newTimelineEntry]
      });
    }
    
    setIsTimelineModalOpen(false);
  };

  // Fact handlers
  const handleAddFact = () => {
    setCurrentFactIndex(null);
    setNewFact('');
    setIsEditing(false);
    setIsFactModalOpen(true);
  };

  const handleEditFact = (index: number) => {
    setCurrentFactIndex(index);
    setNewFact(formData.facts[index]);
    setIsEditing(true);
    setIsFactModalOpen(true);
  };

  const handleFactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentFactIndex !== null) {
      // Update existing fact
      const updatedFacts = [...formData.facts];
      updatedFacts[currentFactIndex] = newFact;
      
      setFormData({
        ...formData,
        facts: updatedFacts
      });
    } else {
      // Add new fact
      setFormData({
        ...formData,
        facts: [...formData.facts, newFact]
      });
    }
    
    setIsFactModalOpen(false);
  };

  // Hobby handlers
  const handleHobbyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewHobby({
      ...newHobby,
      [name]: value
    });
  };

  const handleAddHobby = () => {
    setCurrentHobby(null);
    setNewHobby({ icon: '', label: '' });
    setIsEditing(false);
    setIsHobbyModalOpen(true);
  };

  const handleEditHobby = (index: number) => {
    setCurrentHobby({...formData.hobbies[index]});
    setNewHobby({...formData.hobbies[index]});
    setIsEditing(true);
    setIsHobbyModalOpen(true);
  };

  const handleHobbySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && currentHobby) {
      // Update existing hobby
      const updatedHobbies = formData.hobbies.map((hobby, index) => 
        index === formData.hobbies.findIndex(h => 
          h.icon === currentHobby.icon && 
          h.label === currentHobby.label
        ) ? newHobby : hobby
      );
      
      setFormData({
        ...formData,
        hobbies: updatedHobbies
      });
    } else {
      // Add new hobby
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, newHobby]
      });
    }
    
    setIsHobbyModalOpen(false);
  };

  // Gallery handlers
  const handleAddGalleryImage = () => {
    if (newGalleryUrl.trim()) {
      setFormData({
        ...formData,
        gallery: [...formData.gallery, newGalleryUrl]
      });
      setNewGalleryUrl('');
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const updatedGallery = formData.gallery.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      gallery: updatedGallery
    });
  };

  // Delete handlers
  const openDeleteModal = (type: string, index: number) => {
    setItemToDelete({ type, index });
    setIsDeleteModalOpen(true);
  };

  const handleDelete = () => {
    if (!itemToDelete) return;
    
    const { type, index } = itemToDelete;
    
    if (type === 'timeline') {
      const updatedTimeline = formData.timeline.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        timeline: updatedTimeline
      });
    } else if (type === 'fact') {
      const updatedFacts = formData.facts.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        facts: updatedFacts
      });
    } else if (type === 'hobby') {
      const updatedHobbies = formData.hobbies.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        hobbies: updatedHobbies
      });
    }
    
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-8">
      {/* Header with save button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cool-cyan">About Page Editor</h1>
        <button 
          onClick={() => handleSave(true)}
          className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save Changes
        </button>
      </div>

      {/* Bio Editor Section */}
      <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-6">
        <h2 className="text-xl font-semibold text-cool-cyan mb-4">🧠 Bio Editor</h2>
        
        <div className="space-y-6">
          {/* Tagline Input */}
          <div>
            <label htmlFor="tagline" className="block text-sm font-medium text-chrome-silver mb-2">
              Tagline / Headline
            </label>
            <input
              id="tagline"
              name="tagline"
              type="text"
              value={formData.tagline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
              placeholder="A short catchy tagline about yourself"
            />
          </div>
          
          {/* Bio Textarea */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-chrome-silver mb-2">
              Full Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={6}
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan resize-none"
              placeholder="Write your bio here..."
            />
          </div>
        </div>
      </div>
      
      {/* Timeline Manager Section */}
      <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-cool-cyan">📅 Timeline Manager</h2>
          <button 
            onClick={handleAddTimelineEntry}
            className="px-3 py-1.5 bg-cool-cyan text-forge-black rounded-lg hover:bg-cool-cyan/90 text-sm transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Entry
          </button>
        </div>
        
        <div className="space-y-4 mt-4">
          {formData.timeline.length === 0 ? (
            <div className="p-6 text-center bg-forge-black rounded-lg border border-cool-cyan/10">
              <p className="text-steel-blue">No timeline entries yet. Add your first milestone!</p>
            </div>
          ) : (
            <div className="border-l-4 border-cool-cyan space-y-6 pl-6">
              {formData.timeline.map((entry, index) => (
                <div key={index} className="relative bg-forge-black rounded-lg p-4 hover:bg-forge-black/80 transition">
                  <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-4 h-4 rounded-full bg-cool-cyan border-4 border-gunmetal-gray"></div>
                  <div className="mb-2 text-sm text-cool-cyan">{entry.year}</div>
                  <h3 className="text-lg font-semibold text-chrome-silver">{entry.title}</h3>
                  <p className="text-steel-blue text-sm mt-1">{entry.description}</p>
                  
                  <div className="flex justify-end space-x-2 mt-3">
                    <button 
                      onClick={() => handleEditTimelineEntry(index)}
                      className="p-1 text-cool-cyan hover:text-molten-orange transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => openDeleteModal('timeline', index)}
                      className="p-1 text-ember-red hover:text-ember-red/80 transition"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Fun Facts Section */}
      <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-cool-cyan">🎯 Fun Facts</h2>
          <button 
            onClick={handleAddFact}
            className="px-3 py-1.5 bg-cool-cyan text-forge-black rounded-lg hover:bg-cool-cyan/90 text-sm transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Fact
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {formData.facts.length === 0 ? (
            <div className="col-span-full p-6 text-center bg-forge-black rounded-lg border border-cool-cyan/10">
              <p className="text-steel-blue">No fun facts yet. Add something interesting about yourself!</p>
            </div>
          ) : (
            formData.facts.map((fact, index) => (
              <div key={index} className="bg-forge-black rounded-lg p-4 hover:bg-forge-black/80 transition">
                <div className="flex items-start">
                  <span className="text-xl mr-3">
                    {index % 6 === 0 ? "🧠" : 
                     index % 6 === 1 ? "🎧" : 
                     index % 6 === 2 ? "🎮" : 
                     index % 6 === 3 ? "🗺️" : 
                     index % 6 === 4 ? "🛠️" : "👨‍💻"}
                  </span>
                  <p className="text-chrome-silver flex-1">{fact}</p>
                </div>
                
                <div className="flex justify-end space-x-2 mt-3">
                  <button 
                    onClick={() => handleEditFact(index)}
                    className="p-1 text-cool-cyan hover:text-molten-orange transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => openDeleteModal('fact', index)}
                    className="p-1 text-ember-red hover:text-ember-red/80 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Hobbies Section */}
      <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-cool-cyan">🕹️ Hobbies</h2>
          <button 
            onClick={handleAddHobby}
            className="px-3 py-1.5 bg-cool-cyan text-forge-black rounded-lg hover:bg-cool-cyan/90 text-sm transition flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Hobby
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {formData.hobbies.length === 0 ? (
            <div className="col-span-full p-6 text-center bg-forge-black rounded-lg border border-cool-cyan/10">
              <p className="text-steel-blue">No hobbies added yet. What do you enjoy doing?</p>
            </div>
          ) : (
            formData.hobbies.map((hobby, index) => (
              <div key={index} className="bg-forge-black rounded-lg p-4 hover:bg-forge-black/80 transition">
                <div className="flex flex-col items-center text-center">
                  <span className="text-3xl mb-2">{hobby.icon}</span>
                  <h4 className="text-chrome-silver font-medium">{hobby.label}</h4>
                </div>
                
                <div className="flex justify-center space-x-2 mt-3">
                  <button 
                    onClick={() => handleEditHobby(index)}
                    className="p-1 text-cool-cyan hover:text-molten-orange transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => openDeleteModal('hobby', index)}
                    className="p-1 text-ember-red hover:text-ember-red/80 transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Gallery Section */}
      <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 p-6">
        <h2 className="text-xl font-semibold text-cool-cyan mb-4">🖼️ Gallery</h2>
        
        <div className="space-y-6">
          {/* Add image input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={newGalleryUrl}
              onChange={(e) => setNewGalleryUrl(e.target.value)}
              className="flex-1 px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
              placeholder="Enter image URL"
            />
            <button
              onClick={handleAddGalleryImage}
              className="px-4 py-2 bg-cool-cyan text-forge-black rounded-lg hover:bg-cool-cyan/90 transition whitespace-nowrap"
            >
              Add Image
            </button>
          </div>
          
          {/* Gallery preview */}
          <div>
            <h3 className="text-sm font-medium text-steel-blue mb-3">Gallery Preview</h3>
            
            {formData.gallery.length === 0 ? (
              <div className="p-6 text-center bg-forge-black rounded-lg border border-cool-cyan/10">
                <p className="text-steel-blue">No images in gallery. Add some images to showcase!</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.gallery.map((imageUrl, index) => (
                  <div key={index} className="relative group bg-forge-black rounded-lg overflow-hidden aspect-square">
                    <img 
                      src={imageUrl} 
                      alt={`Gallery image ${index + 1}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/public/vite.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-forge-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => handleRemoveGalleryImage(index)}
                        className="p-2 bg-ember-red/90 text-white rounded-full"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Timeline Modal */}
      {isTimelineModalOpen && (
        <div className="fixed inset-0 bg-forge-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gunmetal-gray rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-cool-cyan">
                {isEditing ? 'Edit Timeline Entry' : 'Add Timeline Entry'}
              </h2>
            </div>
            
            <form onSubmit={handleTimelineSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="year" className="block text-sm font-medium text-chrome-silver mb-1">
                    Year*
                  </label>
                  <input
                    id="year"
                    name="year"
                    type="text"
                    required
                    value={newTimelineEntry.year}
                    onChange={handleTimelineInputChange}
                    className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="E.g., 2022 or 2020-2021"
                  />
                </div>
                
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-chrome-silver mb-1">
                    Title*
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    value={newTimelineEntry.title}
                    onChange={handleTimelineInputChange}
                    className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="E.g., Started College"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-chrome-silver mb-1">
                    Description*
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={newTimelineEntry.description}
                    onChange={handleTimelineInputChange}
                    rows={3}
                    className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan resize-none"
                    placeholder="Describe what happened during this period"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsTimelineModalOpen(false)}
                  className="px-4 py-2 bg-forge-black text-chrome-silver rounded-lg hover:bg-forge-black/80 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition"
                >
                  {isEditing ? 'Update Entry' : 'Add Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Fun Fact Modal */}
      {isFactModalOpen && (
        <div className="fixed inset-0 bg-forge-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gunmetal-gray rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-cool-cyan">
                {isEditing ? 'Edit Fun Fact' : 'Add Fun Fact'}
              </h2>
            </div>
            
            <form onSubmit={handleFactSubmit} className="p-6">
              <div>
                <label htmlFor="fact" className="block text-sm font-medium text-chrome-silver mb-1">
                  Fun Fact*
                </label>
                <textarea
                  id="fact"
                  required
                  value={newFact}
                  onChange={(e) => setNewFact(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan resize-none"
                  placeholder="Share something interesting about yourself"
                />
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFactModalOpen(false)}
                  className="px-4 py-2 bg-forge-black text-chrome-silver rounded-lg hover:bg-forge-black/80 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition"
                >
                  {isEditing ? 'Update Fact' : 'Add Fact'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Hobby Modal */}
      {isHobbyModalOpen && (
        <div className="fixed inset-0 bg-forge-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gunmetal-gray rounded-lg shadow-lg w-full max-w-lg">
            <div className="p-4 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-cool-cyan">
                {isEditing ? 'Edit Hobby' : 'Add Hobby'}
              </h2>
            </div>
            
            <form onSubmit={handleHobbySubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-chrome-silver mb-1">
                    Emoji/Icon*
                  </label>
                  <input
                    id="icon"
                    name="icon"
                    type="text"
                    required
                    value={newHobby.icon}
                    onChange={handleHobbyInputChange}
                    className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="E.g., 🎮, 🎨, 📚"
                  />
                </div>
                
                <div>
                  <label htmlFor="label" className="block text-sm font-medium text-chrome-silver mb-1">
                    Hobby Name*
                  </label>
                  <input
                    id="label"
                    name="label"
                    type="text"
                    required
                    value={newHobby.label}
                    onChange={handleHobbyInputChange}
                    className="w-full px-4 py-2 bg-forge-black border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                    placeholder="E.g., Gaming, Digital Art"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsHobbyModalOpen(false)}
                  className="px-4 py-2 bg-forge-black text-chrome-silver rounded-lg hover:bg-forge-black/80 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-molten-orange text-white rounded-lg hover:bg-ember-red transition"
                >
                  {isEditing ? 'Update Hobby' : 'Add Hobby'}
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
            <div className="p-4 border-b border-cool-cyan/20">
              <h2 className="text-xl font-semibold text-cool-cyan">Confirm Deletion</h2>
            </div>
            
            <div className="p-6">
              <p className="text-chrome-silver mb-6">
                Are you sure you want to delete this {itemToDelete?.type}? This action cannot be undone.
              </p>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="px-4 py-2 bg-forge-black text-chrome-silver rounded-lg hover:bg-forge-black/80 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-ember-red text-white rounded-lg hover:bg-ember-red/80 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutEditor; 