import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from "@react-native-community/netinfo";

export interface OfflineData {
  id: string;
  timestamp: number;
  data: any;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  endpoint: string;
}

export interface CacheData {
  key: string;
  data: any;
  timestamp: number;
  expiry: number;
}

class OfflineService {
  private static instance: OfflineService;
  private offlineQueue: OfflineData[] = [];
  private cache: Map<string, CacheData> = new Map();
  private isOnline: boolean = true;
  private readonly OFFLINE_QUEUE_KEY = 'offline_queue';
  private readonly CACHE_PREFIX = 'cache_';

  public static getInstance(): OfflineService {
    if (!OfflineService.instance) {
      OfflineService.instance = new OfflineService();
    }
    return OfflineService.instance;
  }

  async initialize(): Promise<void> {
    await this.loadOfflineQueue();
    
    NetInfo.addEventListener(state => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected ?? false;
      
      if (wasOffline && this.isOnline) {
        console.log('Back online, processing offline queue...');
        this.processOfflineQueue();
      }
    });

    const netInfo = await NetInfo.fetch();
    this.isOnline = netInfo.isConnected ?? false;
  }

  getNetworkStatus(): boolean {
    return this.isOnline;
  }

  async setCache(key: string, data: any, expiryMinutes: number = 60): Promise<void> {
    const cacheData: CacheData = {
      key,
      data,
      timestamp: Date.now(),
      expiry: expiryMinutes,
    };

    this.cache.set(key, cacheData);
    await AsyncStorage.setItem(`${this.CACHE_PREFIX}${key}`, JSON.stringify(cacheData));
  }

  async getCache(key: string): Promise<any | null> {
    let cacheData = this.cache.get(key);

    if (!cacheData) {
      const stored = await AsyncStorage.getItem(`${this.CACHE_PREFIX}${key}`);
      if (stored) {
        try {
          cacheData = JSON.parse(stored);
          if (cacheData) {
            this.cache.set(key, cacheData);
          }
        } catch (error) {
          console.error('Error parsing cached data:', error);
          await this.removeCache(key);
          return null;
        }
      }
    }

    if (!cacheData) return null;

    const now = Date.now();
    const expiryTime = cacheData.timestamp + (cacheData.expiry * 60 * 1000);

    if (now > expiryTime) {
      await this.removeCache(key);
      return null;
    }

    return cacheData.data;
  }

  async removeCache(key: string): Promise<void> {
    this.cache.delete(key);
    await AsyncStorage.removeItem(`${this.CACHE_PREFIX}${key}`);
  }

  async clearAllCache(): Promise<void> {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
    
    await AsyncStorage.multiRemove(cacheKeys);
    this.cache.clear();
  }

  async addToOfflineQueue(data: Omit<OfflineData, 'id' | 'timestamp'>): Promise<void> {
    const offlineData: OfflineData = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
      ...data,
    };

    this.offlineQueue.push(offlineData);
    await this.saveOfflineQueue();
  }

  private async loadOfflineQueue(): Promise<void> {
    try {
      const stored = await AsyncStorage.getItem(this.OFFLINE_QUEUE_KEY);
      if (stored) {
        this.offlineQueue = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading offline queue:', error);
      this.offlineQueue = [];
    }
  }

  private async saveOfflineQueue(): Promise<void> {
    try {
      await AsyncStorage.setItem(this.OFFLINE_QUEUE_KEY, JSON.stringify(this.offlineQueue));
    } catch (error) {
      console.error('Error saving offline queue:', error);
    }
  }

  private async processOfflineQueue(): Promise<void> {
    if (this.offlineQueue.length === 0) return;

    const queueToProcess = [...this.offlineQueue];
    
    for (const item of queueToProcess) {
      try {
        await this.processOfflineItem(item);
        this.offlineQueue = this.offlineQueue.filter(q => q.id !== item.id);
      } catch (error) {
        console.error('Error processing offline item:', error);
      }
    }

    await this.saveOfflineQueue();
  }

  private async processOfflineItem(item: OfflineData): Promise<void> {
    console.log(`Processing offline item: ${item.action} to ${item.endpoint}`, item.data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Successfully processed offline item: ${item.id}`);
        resolve();
      }, 1000);
    });
  }

  async getStorageInfo(): Promise<{ cacheSize: number; queueSize: number }> {
    const keys = await AsyncStorage.getAllKeys();
    const cacheKeys = keys.filter(key => key.startsWith(this.CACHE_PREFIX));
    
    return {
      cacheSize: cacheKeys.length,
      queueSize: this.offlineQueue.length,
    };
  }

  async clearAllOfflineData(): Promise<void> {
    this.offlineQueue = [];
    await AsyncStorage.removeItem(this.OFFLINE_QUEUE_KEY);
    await this.clearAllCache();
  }

  async saveUserProfile(profile: any): Promise<void> {
    await this.setCache('user_profile', profile, 60 * 24);
    
    if (!this.isOnline) {
      await this.addToOfflineQueue({
        data: profile,
        action: 'UPDATE',
        endpoint: '/api/user/profile',
      });
    }
  }

  async getUserProfile(): Promise<any | null> {
    return await this.getCache('user_profile');
  }

  async saveSettings(settings: any): Promise<void> {
    await this.setCache('app_settings', settings, 60 * 24 * 7);
    
    if (!this.isOnline) {
      await this.addToOfflineQueue({
        data: settings,
        action: 'UPDATE',
        endpoint: '/api/user/settings',
      });
    }
  }

  async getSettings(): Promise<any | null> {
    return await this.getCache('app_settings');
  }
}

export const offlineService = OfflineService.getInstance();