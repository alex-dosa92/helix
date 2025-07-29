import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useTheme } from '../contexts/ThemeContext';
import { AppText } from './common/AppText';

const { width } = Dimensions.get('window');

export const NetworkStatusBar: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [showBar, setShowBar] = useState<boolean>(false);
  const { theme } = useTheme();
  
  const slideAnim = React.useRef(new Animated.Value(-50)).current;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false;
      
      if (connected !== isConnected) {
        setIsConnected(connected);
        
        if (!connected) {
          // Show offline bar
          setShowBar(true);
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          // Show reconnected briefly, then hide
          Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            setTimeout(() => {
              Animated.timing(slideAnim, {
                toValue: -50,
                duration: 300,
                useNativeDriver: true,
              }).start(() => {
                setShowBar(false);
              });
            }, 2000);
          });
        }
      }
    });

    return unsubscribe;
  }, [isConnected, slideAnim]);

  if (!showBar) return null;

  const backgroundColor = isConnected ? '#4CAF50' : '#FF5722';
  const message = isConnected ? 'Back online' : 'No internet connection';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <AppText
        variant="caption"
        style={styles.text}
        weight="medium"
      >
        {message}
      </AppText>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: width,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    elevation: 999,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});