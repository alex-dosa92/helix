import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';

export type PermissionStatus = 'granted' | 'denied' | 'not-requested';

class SimpleNotificationService {
  private static instance: SimpleNotificationService;

  public static getInstance(): SimpleNotificationService {
    if (!SimpleNotificationService.instance) {
      SimpleNotificationService.instance = new SimpleNotificationService();
    }
    return SimpleNotificationService.instance;
  }

  async checkPermission(): Promise<PermissionStatus> {
    try {
      // const authStatus = await messaging().hasPermission();
      
      // if (authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      //     authStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      //   return 'granted';
      // } else if (authStatus === messaging.AuthorizationStatus.DENIED) {
      //   return 'denied';
      // } else {
      //   return 'not-requested';
      // }
      
      const hasPermission = await AsyncStorage.getItem('notificationPermission');
      return (hasPermission as PermissionStatus) || 'not-requested';
    } catch (error) {
      console.error('Error checking notification permission:', error);
      return 'not-requested';
    }
  }

  async requestPermission(): Promise<boolean> {
    return new Promise((resolve) => {
      Alert.alert(
        'Allow Push Notifications',
        'Would you like to receive push notifications from this app?',
        [
          {
            text: 'Don\'t Allow',
            onPress: async () => {
              await AsyncStorage.setItem('notificationPermission', 'denied');
              console.log('Notification permission denied');
              resolve(false);
            },
            style: 'cancel'
          },
          {
            text: 'Allow',
            onPress: async () => {
              await AsyncStorage.setItem('notificationPermission', 'granted');
              console.log('Notification permission granted');
              resolve(true);
            }
          }
        ]
      );
    });
    
    // try {
    //   const authStatus = await messaging().requestPermission();
    //   const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    //   if (enabled) {
    //     console.log('Firebase notification permission granted:', authStatus);
    //     return true;
    //   } else {
    //     console.log('Firebase notification permission denied:', authStatus);
    //     return false;
    //   }
    // } catch (error) {
    //   console.error('Error requesting Firebase notification permission:', error);
    //   return false;
    // }
  }

  async isFirstRun(): Promise<boolean> {
    try {
      const hasRunBefore = await AsyncStorage.getItem('hasRunBefore');
      return !hasRunBefore;
    } catch (error) {
      console.error('Error checking first run:', error);
      return true;
    }
  }

  async markFirstRunComplete(): Promise<void> {
    try {
      await AsyncStorage.setItem('hasRunBefore', 'true');
    } catch (error) {
      console.error('Error marking first run complete:', error);
    }
  }

  showTestNotification(title: string, body: string): void {
    Alert.alert(title, body);
  }

  async resetForTesting(): Promise<void> {
    try {
      await AsyncStorage.removeItem('hasRunBefore');
      await AsyncStorage.removeItem('notificationPermission');
      console.log('Reset first run status and notification permission for testing');
    } catch (error) {
      console.error('Error resetting first run status:', error);
    }
  }
}

export const simpleNotificationService = SimpleNotificationService.getInstance();