import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isDarkMode: boolean;
}

const initialState: AppState = {
  isDarkMode: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    resetAppState: (state) => {
      state.isDarkMode = false;
    },
  },
});

export const { toggleDarkMode, setDarkMode, resetAppState } = appSlice.actions;
export default appSlice.reducer;