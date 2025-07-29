import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import userReducer from './slices/userSlice';
import appReducer from './slices/appSlice';
import { persistenceMiddleware } from './middleware/persistenceMiddleware';
import { persistenceService } from '../services/persistenceService';

export const createStore = (preloadedState?: Partial<{ user: any; app: any }>) => {
  return configureStore({
    reducer: {
      user: userReducer,
      app: appReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
      }).concat(persistenceMiddleware),
  });
};

let store: ReturnType<typeof createStore>;

export const initializeStore = async () => {
  try {
    const persistedState = await persistenceService.loadState();
    if (persistedState) {
      const validatedState = {
        user: persistedState.user || undefined,
        app: persistedState.app || undefined,
      };
      store = createStore(validatedState);
      console.log('Store initialized with persisted state');
    } else {
      store = createStore();
      console.log('Store initialized with default state');
    }
  } catch (error) {
    console.error('Error initializing store with persisted state:', error);
    store = createStore();
  }
  return store;
};

store = createStore();

export { store };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;