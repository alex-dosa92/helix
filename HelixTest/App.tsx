import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar, Alert, View } from 'react-native';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import { BottomTabNavigator } from './src/navigation/BottomTabNavigator';
import { initializeStore, useAppDispatch } from './src/store';
import { fetchUser } from './src/store/slices/userSlice';
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext';
import { simpleNotificationService } from './src/services/simpleNotifications';
import { offlineService } from './src/services/offlineService';
import { NetworkStatusBar } from './src/components/NetworkStatusBar';
import { SplashScreen } from './src/screens/SplashScreen';

const AppContent: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme, isDarkMode } = useTheme();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      await offlineService.initialize();
      dispatch(fetchUser());
      
      const checkFirstRun = async () => {
        try {
          const isFirstRun = await simpleNotificationService.isFirstRun();
          
          if (isFirstRun) {
            setTimeout(async () => {
              const granted = await simpleNotificationService.requestPermission();
              await simpleNotificationService.markFirstRunComplete();
              
              console.log('Notification permission:', granted ? 'granted' : 'denied');
            }, 1000);
          }
        } catch (error) {
          console.error('Error checking first run:', error);
        }
      };
      
      checkFirstRun();
    };
    
    initializeApp();
  }, [dispatch]);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        <SplashScreen onFinish={handleSplashFinish} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={theme.background}
        />
        <NetworkStatusBar />
        <BottomTabNavigator />
        <Toast />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

function App(): React.JSX.Element {
  const [store, setStore] = useState<any>(null);
  const [isStoreReady, setIsStoreReady] = useState(false);

  useEffect(() => {
    const setupStore = async () => {
      try {
        const initializedStore = await initializeStore();
        setStore(initializedStore);
        setIsStoreReady(true);
      } catch (error) {
        console.error('Failed to initialize store:', error);
        setIsStoreReady(true);
      }
    };

    setupStore();
  }, []);

  if (!isStoreReady || !store) {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <SplashScreen onFinish={() => {}} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
