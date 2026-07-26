"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { onAuthStateChanged, type User } from "firebase/auth";

import { auth } from "@/firebase/config";
import { getUserProfile } from "@/lib/services/user.service";
import type { UserProfile } from "@/lib/types/user";

interface UserContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const currentUser = auth.currentUser;

    setUser(currentUser);

    if (!currentUser) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getUserProfile(currentUser.uid);
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      await refreshProfile();
    });

    return unsubscribe;
  }, [refreshProfile]);

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useUserProfile must be used inside UserProvider"
    );
  }

  return context;
}