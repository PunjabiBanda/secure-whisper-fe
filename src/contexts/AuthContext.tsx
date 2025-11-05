import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type UserRole = "admin" | "agent" | null;

interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (email: string, password: string, name: string) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // TODO: Connect to Firebase Authentication
  // Initialize auth state on mount
  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem("demo-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  // Placeholder login function
  const loginUser = async (email: string, password: string) => {
    // TODO: Replace with Firebase auth.signInWithEmailAndPassword()
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo user based on email
    const demoUser: User = {
      id: "demo-" + Math.random(),
      email,
      role: email.includes("admin") ? "admin" : "agent",
      name: email.split("@")[0],
    };
    
    setUser(demoUser);
    localStorage.setItem("demo-user", JSON.stringify(demoUser));
    setIsLoading(false);
  };

  // Placeholder register function
  const registerUser = async (email: string, password: string, name: string) => {
    // TODO: Replace with Firebase auth.createUserWithEmailAndPassword()
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const demoUser: User = {
      id: "demo-" + Math.random(),
      email,
      role: "agent", // Default role
      name,
    };
    
    setUser(demoUser);
    localStorage.setItem("demo-user", JSON.stringify(demoUser));
    setIsLoading(false);
  };

  // Placeholder logout function
  const logoutUser = () => {
    // TODO: Replace with Firebase auth.signOut()
    setUser(null);
    localStorage.removeItem("demo-user");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
