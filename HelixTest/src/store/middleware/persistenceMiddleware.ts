import { Middleware } from '@reduxjs/toolkit';
import { persistenceService } from '../../services/persistenceService';

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const PERSISTABLE_ACTIONS = [
  'user/updateUser/fulfilled',
  'user/fetchUser/fulfilled',
  'user/updatePreferences',
  'app/updateSettings',
  'app/toggleDarkMode',
];

export const persistenceMiddleware: Middleware = (store) => (next) => {
  const debouncedSave = debounce(async () => {
    const state = store.getState();
    
    const persistableState = {
      user: state.user,
      app: state.app,
      timestamp: Date.now(),
    };
    
    await persistenceService.saveState(persistableState);
  }, 500);

  return (action) => {
    const result = next(action);
    
    console.log('Action dispatched:', action.type);
    
    if (PERSISTABLE_ACTIONS.some(actionType => action.type.includes(actionType))) {
      console.log('Triggering persistence for action:', action.type);
      debouncedSave();
    }
    
    return result;
  };
};