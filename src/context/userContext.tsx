"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import useUser from "@/hooks/useUser";
import { User } from "@/types";

type UserContextType = {
  user: User | null;
  isLoading: boolean;
  refetchUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoading: isUserLoading, refetch } = useUser();
  const [userState, setUser] = useState<User | null>(user);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize userState when useUser finishes loading
  React.useEffect(() => {
    if (!isUserLoading) {
      setUser(user || null);
      setIsLoading(false);
    }
  }, [user, isUserLoading]);

  // 3️⃣ Manual refetchUser helper
  const refetchUser = async () => {
    try {
      const { data } = await refetch(); // Call refetch from the `useUser` hook
      setUser(data || null);
    } catch {
      setUser(null); // Reset state if the fetch fails
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: userState,
        isLoading,
        refetchUser,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUserContext must be used within a UserProvider");
  return context;
};
