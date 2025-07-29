import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../contexts/ThemeContext';
import { RootTabParamList } from '../types';
import { bottomTabNavigatorStyles } from '../styles/BottomTabNavigatorStyles';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator<RootTabParamList>();

const AnimatedScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(100)).current;

  React.useEffect(() => {
    slideAnim.setValue(100);
    fadeAnim.setValue(0);
    
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
    
    return () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };
  }, [fadeAnim, slideAnim]);

  return (
    <Animated.View
      style={{
        flex: 1,
        opacity: fadeAnim,
        transform: [{ translateX: slideAnim }],
      }}
    >
      {children}
    </Animated.View>
  );
};

const AnimatedHomeScreen = () => (
  <AnimatedScreen>
    <HomeScreen />
  </AnimatedScreen>
);

const AnimatedProfileScreen = () => (
  <AnimatedScreen>
    <ProfileScreen />
  </AnimatedScreen>
);

const AnimatedSettingsScreen = () => (
  <AnimatedScreen>
    <SettingsScreen />
  </AnimatedScreen>
);

const AnimatedNotificationsScreen = () => (
  <AnimatedScreen>
    <NotificationsScreen />
  </AnimatedScreen>
);

interface TabBarIconProps {
  route: string;
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ route, focused }) => {
  const { theme } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  let iconName: string;
  const color = focused ? theme.tabBarActive : theme.tabBarInactive;
  const size = 26;

  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: focused ? 1.2 : 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused, scaleAnim]);

  switch (route) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Profile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    case 'Settings':
      iconName = focused ? 'settings' : 'settings-outline';
      break;
    case 'Notifications':
      iconName = focused ? 'notifications' : 'notifications-outline';
      break;
    default:
      iconName = 'help-outline';
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Icon name={iconName} size={size} color={color} />
    </Animated.View>
  );
};

const CustomTabBar: React.FC<any> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={[bottomTabNavigatorStyles.container, { paddingBottom: insets.bottom }]}>
      <View style={[bottomTabNavigatorStyles.tabBar, { backgroundColor: theme.tabBarBackground }]}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={bottomTabNavigatorStyles.tab}
              activeOpacity={0.7}
            >
              <View style={[
                bottomTabNavigatorStyles.iconContainer, 
                isFocused && [bottomTabNavigatorStyles.iconContainerFocused, { backgroundColor: theme.tertiary }]
              ]}>
                <TabBarIcon route={route.name} focused={isFocused} />
                {isFocused && <View style={[bottomTabNavigatorStyles.indicator, { backgroundColor: theme.primary }]} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        lazy: true,
        unmountOnBlur: false,
      }}
    >
      <Tab.Screen name="Home" component={AnimatedHomeScreen} />
      <Tab.Screen name="Profile" component={AnimatedProfileScreen} />
      <Tab.Screen name="Settings" component={AnimatedSettingsScreen} />
      <Tab.Screen name="Notifications" component={AnimatedNotificationsScreen} />
    </Tab.Navigator>
  );
};

