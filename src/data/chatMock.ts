// Define the types
type MessageStatus = 'pending' | 'sent' | 'delivered' | 'read';

interface Message {
  id: number;
  from: 'user' | 'me';
  text: string;
  status: MessageStatus;
  timestamp?: string;
}

// Export the types
export type { Message, MessageStatus };

export const messages: Message[] = [
  { 
    id: 1, 
    from: "user", 
    text: "Hi Jatin! I saw your portfolio and I'm impressed with your work.", 
    status: "read",
    timestamp: "10:30 AM" 
  },
  { 
    id: 2, 
    from: "me", 
    text: "Hey! Thank you for reaching out. How can I help you today?", 
    status: "delivered",
    timestamp: "10:32 AM" 
  },
  { 
    id: 3, 
    from: "user", 
    text: "I'm looking for a developer for my upcoming project. Would you be interested in discussing it?", 
    status: "read",
    timestamp: "10:35 AM" 
  },
  { 
    id: 4, 
    from: "me", 
    text: "Absolutely! I'd love to hear more about your project. Feel free to share some details or we can schedule a call.", 
    status: "sent",
    timestamp: "10:36 AM" 
  },
  { 
    id: 5, 
    from: "user", 
    text: "Great! I'll send you the project brief shortly.", 
    status: "pending",
    timestamp: "10:37 AM" 
  }
]; 