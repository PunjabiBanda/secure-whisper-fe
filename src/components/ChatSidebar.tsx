import { ChatUser, useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatSidebar() {
  const { users, selectedUser, selectUser } = useChat();

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Secure Chats</h2>
        <p className="text-xs text-muted-foreground">
          {users.filter(u => u.status === "online").length} online
        </p>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              isSelected={selectedUser?.id === user.id}
              onClick={() => selectUser(user)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

interface UserItemProps {
  user: ChatUser;
  isSelected: boolean;
  onClick: () => void;
}

function UserItem({ user, isSelected, onClick }: UserItemProps) {
  const initials = user.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg transition-smooth hover:bg-secondary/50",
        isSelected && "bg-secondary"
      )}
    >
      <div className="relative">
        <Avatar>
          <AvatarFallback className="bg-primary/10 text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        {user.status === "online" && (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-card" />
        )}
      </div>

      <div className="flex-1 text-left">
        <p className="font-medium text-sm">{user.name}</p>
        <p className="text-xs text-muted-foreground">{user.email}</p>
      </div>
    </button>
  );
}
