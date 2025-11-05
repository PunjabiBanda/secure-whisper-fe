import { ChatUser, Group, useChat } from "@/contexts/ChatContext";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Users } from "lucide-react";

export function ChatSidebar() {
  const { users, groups, selectedUser, selectedGroup, selectUser, selectGroup } = useChat();

  return (
    <div className="w-80 border-r border-border bg-card flex flex-col">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg">Secure Chats</h2>
        <p className="text-xs text-muted-foreground">
          {users.filter(u => u.status === "online").length} online
        </p>
      </div>

      <Tabs defaultValue="contacts" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2 grid w-auto grid-cols-2">
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="groups" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Groups
          </TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="flex-1 mt-2">
          <ScrollArea className="h-full">
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
        </TabsContent>

        <TabsContent value="groups" className="flex-1 mt-2">
          <ScrollArea className="h-full">
            <div className="p-2">
              {groups.map((group) => (
                <GroupItem
                  key={group.id}
                  group={group}
                  isSelected={selectedGroup?.id === group.id}
                  onClick={() => selectGroup(group)}
                />
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
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

interface GroupItemProps {
  group: Group;
  isSelected: boolean;
  onClick: () => void;
}

function GroupItem({ group, isSelected, onClick }: GroupItemProps) {
  const initials = group.name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const relativeTime = () => {
    const diff = Date.now() - group.lastActivity.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

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
      </div>

      <div className="flex-1 text-left">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-sm">{group.name}</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-3 w-3 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            {group.memberCount} members • {relativeTime()}
          </p>
        </div>
      </div>
    </button>
  );
}
