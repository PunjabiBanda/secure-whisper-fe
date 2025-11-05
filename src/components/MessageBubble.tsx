import { Message } from "@/contexts/ChatContext";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const formattedTime = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        message.isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-3 transition-smooth",
          message.isOwn
            ? "bg-primary text-primary-foreground rounded-br-sm"
            : "bg-card border border-border rounded-bl-sm"
        )}
      >
        {!message.isOwn && (
          <p className="text-xs font-semibold text-primary mb-1">
            {message.senderName}
          </p>
        )}
        
        <p className="text-sm leading-relaxed break-words">{message.text}</p>
        
        <div className="flex items-center justify-end gap-2 mt-2">
          {message.encrypted && (
            <Lock className="h-3 w-3 text-success" />
          )}
          <span className="text-xs opacity-70">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
}
