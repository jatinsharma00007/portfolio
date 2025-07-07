import React, { useState, useEffect, useRef } from 'react';
import type { Message, MessageStatus } from '../../data/chatMock';
import { messages as initialMessages } from '../../data/chatMock';

// Define thread/contact interface
interface Contact {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
}

// Generate contacts from messages
const generateContacts = (messages: Message[]): Contact[] => {
  // In a real app, this would group by user ID or email
  // For now, we'll just simulate a single contact thread
  return [
    {
      id: 'contact1',
      name: 'John Smith',
      email: 'john@example.com',
      avatar: '/assets/google.svg', // Placeholder avatar
      lastMessage: messages[messages.length - 1].text,
      lastTimestamp: messages[messages.length - 1].timestamp || new Date().toLocaleTimeString(),
      unreadCount: messages.filter(m => m.from === 'user' && m.status !== 'read').length
    },
    {
      id: 'contact2',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      lastMessage: "I'm interested in your portfolio work!",
      lastTimestamp: "Yesterday",
      unreadCount: 2
    },
    {
      id: 'contact3',
      name: 'Michael Brown',
      email: 'michael@example.com',
      avatar: '/assets/microsoft.svg', // Placeholder avatar
      lastMessage: "Looking forward to our collaboration",
      lastTimestamp: "2 days ago",
      unreadCount: 0
    }
  ];
};

const MessagesManager: React.FC = () => {
  // State for managing messages and contacts
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  
  // Ref for message container to auto-scroll to bottom
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize contacts from messages
  useEffect(() => {
    const generatedContacts = generateContacts(messages);
    setContacts(generatedContacts);
    setFilteredContacts(generatedContacts);
    
    // Select first contact by default
    if (generatedContacts.length > 0 && !selectedContact) {
      setSelectedContact(generatedContacts[0].id);
    }
  }, [messages]);
  
  // Filter contacts when search term changes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredContacts(contacts);
      return;
    }
    
    const filtered = contacts.filter(
      contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredContacts(filtered);
  }, [searchTerm, contacts]);
  
  // Auto-scroll to bottom of messages when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Mark messages as read when contact is selected
  useEffect(() => {
    if (selectedContact) {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.from === 'user' && msg.status !== 'read' 
            ? { ...msg, status: 'read' as MessageStatus } 
            : msg
        )
      );
      
      // Update contact unread count
      setContacts(prevContacts => 
        prevContacts.map(contact => 
          contact.id === selectedContact 
            ? { ...contact, unreadCount: 0 } 
            : contact
        )
      );
    }
  }, [selectedContact]);
  
  // Handle sending a reply
  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    // Generate new message
    const newMessage: Message = {
      id: messages.length + 1,
      from: 'me',
      text: replyText,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Add message to state
    setMessages([...messages, newMessage]);
    setReplyText('');
    
    // Simulate message status updates
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' as MessageStatus } : msg
        )
      );
      
      setTimeout(() => {
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' as MessageStatus } : msg
          )
        );
      }, 1500);
    }, 1000);
  };
  
  // Handle key press in reply input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };
  
  // Get status icon based on message status
  const getStatusIcon = (status: MessageStatus) => {
    switch (status) {
      case 'pending':
        return <span className="text-xs text-steel-blue">🕓</span>;
      case 'sent':
        return <span className="text-xs text-steel-blue">✅</span>;
      case 'delivered':
        return <span className="text-xs text-steel-blue">✅✅</span>;
      case 'read':
        return <span className="text-xs text-cool-cyan">✅✅</span>;
      default:
        return null;
    }
  };
  
  // Mark all messages as read
  const markAllAsRead = () => {
    setMessages(prevMessages => 
      prevMessages.map(msg => 
        msg.from === 'user' ? { ...msg, status: 'read' as MessageStatus } : msg
      )
    );
    
    setContacts(prevContacts => 
      prevContacts.map(contact => ({ ...contact, unreadCount: 0 }))
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-cool-cyan">Messages</h1>
        <div className="flex space-x-2">
          <button 
            onClick={markAllAsRead}
            className="px-4 py-2 bg-cool-cyan text-forge-black rounded-lg hover:bg-cool-cyan/90 transition"
          >
            Mark All Read
          </button>
        </div>
      </div>

      <div className="bg-gunmetal-gray rounded-lg border border-cool-cyan/20 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 h-[70vh]">
          {/* Contacts List */}
          <div className="border-r border-cool-cyan/20 flex flex-col h-full">
            <div className="p-4 border-b border-cool-cyan/20 bg-forge-black">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 bg-gunmetal-gray border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan"
                />
                <div className="absolute left-3 top-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-steel-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {filteredContacts.length === 0 ? (
                <div className="p-4 text-center text-steel-blue">
                  No contacts found
                </div>
              ) : (
                filteredContacts.map(contact => (
                  <div 
                    key={contact.id}
                    onClick={() => setSelectedContact(contact.id)}
                    className={`p-4 border-b border-cool-cyan/10 cursor-pointer hover:bg-forge-black/30 transition flex items-center ${
                      selectedContact === contact.id ? 'bg-forge-black/50' : ''
                    }`}
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-forge-black flex items-center justify-center text-cool-cyan">
                        {contact.avatar ? (
                          <img 
                            src={contact.avatar} 
                            alt={contact.name} 
                            className="w-8 h-8 object-cover rounded-full"
                          />
                        ) : (
                          contact.name.charAt(0).toUpperCase()
                        )}
                      </div>
                      {contact.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-molten-orange rounded-full flex items-center justify-center text-xs text-white font-bold">
                          {contact.unreadCount}
                        </div>
                      )}
                    </div>
                    
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-medium text-chrome-silver truncate">
                          {contact.name}
                        </h3>
                        <span className="text-xs text-steel-blue ml-2 whitespace-nowrap">
                          {contact.lastTimestamp}
                        </span>
                      </div>
                      <p className="text-xs text-steel-blue truncate">
                        {contact.lastMessage}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Chat Thread */}
          <div className="col-span-2 flex flex-col h-full">
            {selectedContact ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-cool-cyan/20 bg-forge-black flex items-center">
                  {(() => {
                    const contact = contacts.find(c => c.id === selectedContact);
                    if (!contact) return null;
                    
                    return (
                      <>
                        <div className="w-10 h-10 rounded-full bg-gunmetal-gray flex items-center justify-center text-cool-cyan">
                          {contact.avatar ? (
                            <img 
                              src={contact.avatar} 
                              alt={contact.name} 
                              className="w-8 h-8 object-cover rounded-full"
                            />
                          ) : (
                            contact.name.charAt(0).toUpperCase()
                          )}
                        </div>
                        <div className="ml-3">
                          <h2 className="text-md font-semibold text-cool-cyan">{contact.name}</h2>
                          <p className="text-xs text-steel-blue">{contact.email}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto bg-forge-black/30">
                  <div className="space-y-4">
                    {messages.map(message => (
                      <div 
                        key={message.id}
                        className={`flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.from === 'me' 
                              ? 'bg-molten-orange/80 text-white rounded-tr-none' 
                              : 'bg-steel-blue/30 text-chrome-silver rounded-tl-none'
                          }`}
                        >
                          <p>{message.text}</p>
                          <div className={`text-xs mt-1 flex ${message.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <span className={message.from === 'me' ? 'text-white/70' : 'text-steel-blue'}>
                              {message.timestamp}
                            </span>
                            {message.from === 'me' && (
                              <span className="ml-2">
                                {getStatusIcon(message.status)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                {/* Reply Input */}
                <div className="p-4 border-t border-cool-cyan/20 bg-forge-black">
                  <div className="flex">
                    <textarea 
                      className="flex-1 p-3 bg-gunmetal-gray border border-cool-cyan/30 rounded-lg text-chrome-silver focus:outline-none focus:ring-2 focus:ring-cool-cyan resize-none"
                      rows={2}
                      placeholder="Type your message..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyPress={handleKeyPress}
                    ></textarea>
                    <button 
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      className={`ml-2 px-4 py-2 bg-molten-orange text-white rounded-lg ${
                        replyText.trim() 
                          ? 'hover:bg-ember-red' 
                          : 'opacity-50 cursor-not-allowed'
                      } transition flex items-center justify-center`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-steel-blue">
                <p>Select a conversation to view messages</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagesManager;
// For consistency with file name
const Messages = MessagesManager;
export { Messages }; 