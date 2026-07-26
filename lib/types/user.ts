import { Timestamp } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  username: string;

  avatar: {
    id: string;
    collection: string;
    type: "default";
    image: string;
  };

  onboardingCompleted: boolean;

  createdAt: Timestamp;
  updatedAt: Timestamp;
}