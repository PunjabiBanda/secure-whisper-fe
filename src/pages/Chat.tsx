import { useState } from "react";
import { Send } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { ChatSidebar } from "@/components/ChatSidebar";
import { MessageBubble } from "@/components/MessageBubble";
import { FileUploadCard } from "@/components/FileUploadCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChat } from "@/contexts/ChatContext";
import { toast } from "sonner";

export default function Chat() {
  const [messageText, setMessageText] = useState("");
  const { messages, selectedUser, selectedGroup, sendEncryptedMessage } = useChat();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageText.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!selectedUser && !selectedGroup) {
      toast.error("Please select a user or group to chat with");
      return;
    }

    try {
      // TODO: Connect to Firebase Firestore
      await sendEncryptedMessage(messageText);
      setMessageText("");
      toast.success("Message sent (encrypted)");
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="border-b border-border bg-card p-4">
            {selectedUser ? (
              <div>
                <h2 className="font-semibold text-lg">{selectedUser.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
              </div>
            ) : selectedGroup ? (
              <div>
                <h2 className="font-semibold text-lg">{selectedGroup.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedGroup.memberCount} members</p>
              </div>
            ) : (
              <p className="text-muted-foreground">Select a contact or group to start chatting</p>
            )}
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Messages Area */}
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1 p-4">
                <div className="max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <MessageBubble key={message.id} message={message} />
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-border bg-card p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2 max-w-4xl mx-auto">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message... (will be encrypted)"
                    className="flex-1"
                    disabled={!selectedUser && !selectedGroup}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    variant="gradient"
                    disabled={(!selectedUser && !selectedGroup) || !messageText.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>

            {/* File Upload Sidebar */}
            <div className="w-96 border-l border-border p-4 overflow-y-auto">
              <FileUploadCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
