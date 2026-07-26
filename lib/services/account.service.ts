import { updateProfile } from "firebase/auth";

import { auth } from "@/firebase/config";
import { updateUserProfile } from "@/lib/services/user.service";
import type { UserProfile } from "@/lib/types/user";

interface UpdateAccountProfileData {
  username: string;
  fullName: string;
  avatar: UserProfile["avatar"];
}

export async function updateAccountProfile({
  username,
  fullName,
  avatar,
}: UpdateAccountProfileData) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user.");
  }

  await updateUserProfile(user.uid, {
    username,
    fullName,
    avatar,
  });

  await updateProfile(user, {
    displayName: username,
    photoURL: avatar.image,
  });

  await user.reload();
}