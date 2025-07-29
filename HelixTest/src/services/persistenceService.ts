import AsyncStorage from '@react-native-async-storage/async-storage';

class PersistenceService {
  private static instance: PersistenceService;
  private readonly REDUX_STATE_KEY = 'redux_persisted_state';

  public static getInstance(): PersistenceService {
    if (!PersistenceService.instance) {
      PersistenceService.instance = new PersistenceService();
    }
    return PersistenceService.instance;
  }

  async saveState(state: any): Promise<void> {
    try {
      const serializedState = JSON.stringify(state);
      await AsyncStorage.setItem(this.REDUX_STATE_KEY, serializedState);
      console.log('State saved successfully:', state);
    } catch (error) {
      console.error('Error saving state:', error);
    }
  }

  async loadState(): Promise<any | null> {
    try {
      const serializedState = await AsyncStorage.getItem(this.REDUX_STATE_KEY);
      if (serializedState === null) {
        console.log('No persisted state found');
        return null;
      }
      const state = JSON.parse(serializedState);
      console.log('State loaded successfully:', state);
      return state;
    } catch (error) {
      console.error('Error loading state:', error);
      return null;
    }
  }

  async clearState(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.REDUX_STATE_KEY);
      console.log('Persisted state cleared');
    } catch (error) {
      console.error('Error clearing state:', error);
    }
  }

  async saveData(key: string, data: any): Promise<void> {
    try {
      const serializedData = JSON.stringify(data);
      await AsyncStorage.setItem(key, serializedData);
      console.log(`Data saved for key: ${key}`);
    } catch (error) {
      console.error(`Error saving data for key ${key}:`, error);
    }
  }

  async loadData(key: string): Promise<any | null> {
    try {
      const serializedData = await AsyncStorage.getItem(key);
      if (serializedData === null) {
        return null;
      }
      const data = JSON.parse(serializedData);
      console.log(`Data loaded for key: ${key}`);
      return data;
    } catch (error) {
      console.error(`Error loading data for key ${key}:`, error);
      return null;
    }
  }

  async getAllKeys(): Promise<string[]> {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.error('Error getting all keys:', error);
      return [];
    }
  }

  async getStorageInfo(): Promise<{ usedSpace: number; keys: string[] }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      let usedSpace = 0;
      
      for (const key of keys) {
        const value = await AsyncStorage.getItem(key);
        if (value) {
          usedSpace += value.length;
        }
      }
      
      return { usedSpace, keys };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { usedSpace: 0, keys: [] };
    }
  }

  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared');
    } catch (error) {
      console.error('Error clearing all data:', error);
    }
  }
}

export const persistenceService = PersistenceService.getInstance();