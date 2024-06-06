"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import { UserDocument } from "@/lib/models/schema/userModel";

interface UserContextType {
  userProfile: UserDocument | null;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserProfile = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserProfile must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useUser();
  const [userProfile, setUserProfile] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const email = user.primaryEmailAddress?.emailAddress;
      if (!email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/user`, {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const userProfile = await response.json();
        userProfile.imageUrl = user.imageUrl;
        setUserProfile(userProfile as UserDocument);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <UserContext.Provider value={{ userProfile, loading }}>
      {children}
    </UserContext.Provider>
  );
};
