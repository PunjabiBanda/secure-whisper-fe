import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { generateKey, encryptText, decryptText, exportKey, importKey } from "@/utils/encryption";

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  encrypted: boolean;
  isOwn: boolean;
}

export interface ChatUser {
  id: string;
  name: string;
  email: string;
  status: "online" | "offline";
}

interface ChatContextType {
  messages: Message[];
  selectedUser: ChatUser | null;
  users: ChatUser[];
  encryptionKey: CryptoKey | null;
  sendEncryptedMessage: (text: string) => Promise<void>;
  selectUser: (user: ChatUser) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

// Demo data
const DEMO_USERS: ChatUser[] = [
  { id: "user1", name: "Alice Johnson", email: "alice@secure.com", status: "online" },
  { id: "user2", name: "Bob Smith", email: "bob@secure.com", status: "online" },
  { id: "user3", name: "Carol Davis", email: "carol@secure.com", status: "offline" },
  { id: "user4", name: "David Brown", email: "david@secure.com", status: "online" },
];

const DEMO_MESSAGES: Message[] = [
  {
    id: "msg1",
    senderId: "user1",
    senderName: "Alice Johnson",
    text: "Hey! The new security protocols look great.",
    timestamp: new Date(Date.now() - 3600000),
    encrypted: true,
    isOwn: false,
  },
  {
    id: "msg2",
    senderId: "current",
    senderName: "You",
    text: "Thanks! I've implemented AES-GCM encryption for all messages.",
    timestamp: new Date(Date.now() - 3000000),
    encrypted: true,
    isOwn: true,
  },
  {
    id: "msg3",
    senderId: "user1",
    senderName: "Alice Johnson",
    text: "Perfect! Can you send me the audit logs from last week?",
    timestamp: new Date(Date.now() - 1800000),
    encrypted: true,
    isOwn: false,
  },
  {
    id: "msg4",
    senderId: "current",
    senderName: "You",
    text: "Sure, I'll upload them in a moment. They're encrypted as well.",
    timestamp: new Date(Date.now() - 900000),
    encrypted: true,
    isOwn: true,
  },
];

export function ChatProvider({ children }: { children: ReactNode }) {
  const [messages, setMessages] = useState<Message[]>(DEMO_MESSAGES);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(DEMO_USERS[0]);
  const [users] = useState<ChatUser[]>(DEMO_USERS);
  const [encryptionKey, setEncryptionKey] = useState<CryptoKey | null>(null);

  // Initialize encryption key
  useEffect(() => {
    const initKey = async () => {
      // TODO: Connect to Firebase for key management
      // For now, generate a demo key or load from localStorage
      const savedKey = localStorage.getItem("demo-encryption-key");
      
      if (savedKey) {
        try {
          const key = await importKey(savedKey);
          setEncryptionKey(key);
        } catch (error) {
          console.error("Failed to import key:", error);
          await generateNewKey();
        }
      } else {
        await generateNewKey();
      }
    };

    const generateNewKey = async () => {
      const key = await generateKey();
      const exported = await exportKey(key);
      localStorage.setItem("demo-encryption-key", exported);
      setEncryptionKey(key);
    };

    initKey();
  }, []);

  // Placeholder function to send encrypted message
  const sendEncryptedMessage = async (text: string) => {
    if (!encryptionKey) {
      console.error("Encryption key not available");
      return;
    }

    // TODO: Connect to Firebase Firestore to store messages
    // TODO: Implement real-time listeners for new messages
    
    // Encrypt the message
    const { encrypted, iv } = await encryptText(text, encryptionKey);
    
    // For demo purposes, just add to local state
    const newMessage: Message = {
      id: "msg-" + Date.now(),
      senderId: "current",
      senderName: "You",
      text: text, // In production, store encrypted version
      timestamp: new Date(),
      encrypted: true,
      isOwn: true,
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Log encrypted data (for demo purposes)
    console.log("Encrypted message:", { encrypted, iv });
  };

  const selectUser = (user: ChatUser) => {
    setSelectedUser(user);
    // TODO: Load messages for this user from Firebase
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        selectedUser,
        users,
        encryptionKey,
        sendEncryptedMessage,
        selectUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
