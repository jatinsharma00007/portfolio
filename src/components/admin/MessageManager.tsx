import { useState, useEffect } from 'react';
import { messages as initialMessages } from '../../data/chatMock';
import type { Message, MessageStatus } from '../../data/chatMock';

const MessageManager = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    // Load messages from local storage or use initial data
    const storedMessages = localStorage.getItem('admin_messages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      setMessages(initialMessages);
    }
  }, []);

  // Save messages to local storage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('admin_messages', JSON.stringify(messages));
    }
  }, [messages]);

  const handleStatusChange = (id: number, newStatus: MessageStatus) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, status: newStatus } : msg
    ));
  };

  const handleDeleteMessage = (id: number) => {
    setMessages(messages.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  const getStatusBadgeColor = (status: MessageStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'sent': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'delivered': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'read': return 'bg-green-500/20 text-green-300 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="bg-gunmetal-gray rounded-xl border border-cool-cyan/20 shadow-lg overflow-hidden">
      <div className="p-4 border-b border-cool-cyan/20 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-cool-cyan">Message Manager</h2>
        <span className="bg-molten-orange/20 text-molten-orange text-xs px-2 py-1 rounded-full border border-molten-orange/30">
          {messages.length} Messages
        </span>
      </div>

      <div className="grid md:grid-cols-2 h-[500px]">
        {/* Message List */}
        <div className="border-r border-cool-cyan/20 overflow-y-auto max-h-[500px]">
          {messages.length === 0 ? (
            <div className="p-4 text-center text-chrome-silver/60">No messages found</div>
          ) : (
            <ul>
              {messages.map(message => (
                <li 
                  key={message.id} 
                  className={`border-b border-cool-cyan/10 p-3 cursor-pointer hover:bg-forge-black/50 transition ${
                    selectedMessage?.id === message.id ? 'bg-forge-black' : ''
                  }`}
                  onClick={() => setSelectedMessage(message)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-sm font-medium ${message.from === 'user' ? 'text-cool-cyan' : 'text-molten-orange'}`}>
                        {message.from === 'user' ? 'User' : 'Me'}
                      </span>
                      <p className="text-chrome-silver text-sm line-clamp-2">{message.text}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusBadgeColor(message.status)}`}>
                        {message.status}
                      </span>
                      {message.timestamp && (
                        <span className="text-xs text-chrome-silver/60 mt-1">{message.timestamp}</span>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Message Detail */}
        <div className="p-4 bg-forge-black/30 overflow-y-auto max-h-[500px]">
          {selectedMessage ? (
            <div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className={`text-sm font-medium ${selectedMessage.from === 'user' ? 'text-cool-cyan' : 'text-molten-orange'}`}>
                    {selectedMessage.from === 'user' ? 'From User' : 'From Me'}
                  </span>
                  {selectedMessage.timestamp && (
                    <span className="text-xs text-chrome-silver/60">{selectedMessage.timestamp}</span>
                  )}
                </div>
                <p className="text-chrome-silver bg-forge-black p-3 rounded-lg border border-cool-cyan/10">
                  {selectedMessage.text}
                </p>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm text-chrome-silver/80 mb-1">Status</label>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value as MessageStatus)}
                    className="w-full bg-forge-black border border-cool-cyan/20 rounded p-2 text-chrome-silver"
                  >
                    <option value="pending">Pending</option>
                    <option value="sent">Sent</option>
                    <option value="delivered">Delivered</option>
                    <option value="read">Read</option>
                  </select>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => handleDeleteMessage(selectedMessage.id)}
                    className="bg-ember-red/80 hover:bg-ember-red text-white px-3 py-1.5 rounded text-sm"
                  >
                    Delete Message
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-chrome-silver/60">
              Select a message to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageManager; 