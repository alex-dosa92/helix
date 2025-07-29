export interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio: string;
  profilePicture: string;
  birthday: string; // Store as ISO string for Redux serialization
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
}

export interface UpdateProfileResponse {
  success: boolean;
  data?: UserProfile;
  error?: string;
}

export interface UploadProgressCallback {
  (progress: number): void;
}

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Notifications: undefined;
};