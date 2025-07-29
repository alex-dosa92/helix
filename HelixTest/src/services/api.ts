import { UserProfile, UpdateProfileResponse, UploadProgressCallback } from '../types';
import { persistenceService } from './persistenceService';

const mockUserData: UserProfile = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  bio: 'Mobile app enthusiast and coffee lover ☕',
  profilePicture: 'https://i.pravatar.cc/300',
  birthday: new Date('1992-09-28').toISOString(),
  preferences: {
    emailNotifications: true,
    pushNotifications: true,
  },
};

let currentUserData = { ...mockUserData };

(async () => {
  const persistedState = await persistenceService.loadState();
  if (persistedState && persistedState.user && persistedState.user.user) {
    currentUserData = persistedState.user.user;
  }
})();

export const api = {
  async fetchProfile(): Promise<UserProfile> {
    return new Promise(async (resolve) => {
      setTimeout(() => {
        resolve({ ...currentUserData });
      }, 1500);
    });
  },

  async updateProfile(profile: Partial<UserProfile>): Promise<UpdateProfileResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = Math.random() > 0.1;
        if (success) {
          const processedProfile = { ...profile };
          if (processedProfile.birthday && typeof processedProfile.birthday === 'object' && 'toISOString' in processedProfile.birthday) {
            processedProfile.birthday = (processedProfile.birthday as Date).toISOString();
          }
          const updatedProfile = { ...currentUserData, ...processedProfile };
          currentUserData = updatedProfile;
          
          resolve({
            success: true,
            data: updatedProfile,
          });
        } else {
          reject({
            success: false,
            error: 'Failed to update profile. Please try again.',
          });
        }
      }, 1500);
    });
  },

  async uploadProfilePicture(
    uri: string,
    onProgress?: UploadProgressCallback
  ): Promise<string> {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        if (onProgress) {
          onProgress(progress);
        }
        if (progress >= 100) {
          clearInterval(interval);
          resolve(uri);
        }
      }, 300);
    });
  },

  resetToDefaultData() {
    currentUserData = { ...mockUserData };
  },
};