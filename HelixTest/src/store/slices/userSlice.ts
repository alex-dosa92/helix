import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserProfile } from '../../types';
import { api } from '../../services/api';
import { offlineService } from '../../services/offlineService';

interface UserState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const cachedUser = await offlineService.getUserProfile();
      if (cachedUser && !offlineService.getNetworkStatus()) {
        return cachedUser;
      }

      const user = await api.fetchProfile();
      
      await offlineService.saveUserProfile(user);
      
      return user;
    } catch (error) {
      const cachedUser = await offlineService.getUserProfile();
      if (cachedUser) {
        return cachedUser;
      }
      return rejectWithValue('Failed to fetch user profile');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (updates: Partial<UserProfile>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { user: UserState };
      const currentUser = state.user.user;
      
      if (!currentUser) {
        throw new Error('No user profile found');
      }

      const updatedUser = { ...currentUser, ...updates };

      if (offlineService.getNetworkStatus()) {
        const response = await api.updateProfile(updates);
        if (response.success && response.data) {
          await offlineService.saveUserProfile(response.data);
          return response.data;
        }
        throw new Error(response.error || 'Failed to update profile');
      } else {
        await offlineService.saveUserProfile(updatedUser);
        return updatedUser;
      }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatePreferences: (state, action: PayloadAction<Partial<UserProfile['preferences']>>) => {
      if (state.user) {
        state.user.preferences = {
          ...state.user.preferences,
          ...action.payload,
        };
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    resetUserState: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updatePreferences, clearError, resetUserState } = userSlice.actions;
export default userSlice.reducer;