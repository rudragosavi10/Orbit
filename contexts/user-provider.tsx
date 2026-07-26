"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/firebase/config";
import { getUserProfile } from "@/lib/services/user.service";
import type { UserProfile } from "@/lib/types/user";

interface UserContextType {
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = useCallback(async () => {
    const user = auth.currentUser;

    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getUserProfile(user.uid);
      setProfile(data);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async () => {
      await refreshProfile();
    });

    return unsubscribe;
  }, [refreshProfile]);

  return (
    <UserContext.Provider
      value={{
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