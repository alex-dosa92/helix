import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store';
import { toggleDarkMode, resetAppState } from '../store/slices/appSlice';
import { fetchUser, resetUserState } from '../store/slices/userSlice';
import { useTheme } from '../contexts/ThemeContext';
import { settingsScreenStyles } from '../styles/SettingsScreenStyles';
import { HeaderText, BodyText, SwitchSettingItem, SettingItem } from '../components/common';
import { persistenceService } from '../services/persistenceService';
import { offlineService } from '../services/offlineService';
import { api } from '../services/api';


const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isDarkMode } = useAppSelector((state) => state.app);
  const { theme } = useTheme();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  const handleAbout = () => {
    Alert.alert(
      'About Helix Test',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.\n\nVersion 1.0.0\n\nDeveloped with ❤️ using React Native',
      [{ text: 'OK' }]
    );
  };

  const handleClearData = () => {
    Alert.alert(
      'Clear All Data',
      'This will clear all cached data and reset to default values. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            try {
              await persistenceService.clearAll();
              await offlineService.clearAllOfflineData();
              
              dispatch(resetUserState());
              dispatch(resetAppState());
              
              api.resetToDefaultData();
              
              await dispatch(fetchUser());
              
              Alert.alert(
                'Success', 
                'All data has been cleared and reset to defaults.',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      console.log('Data cleared successfully');
                    }
                  }
                ]
              );
            } catch (error) {
              console.error('Error clearing data:', error);
              Alert.alert('Error', 'Failed to clear data');
            }
          },
        },
      ]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Success', 'You have been logged out successfully');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[settingsScreenStyles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={settingsScreenStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={settingsScreenStyles.header}>
          <HeaderText>Settings</HeaderText>
        </View>

        <View style={settingsScreenStyles.section}>
          <BodyText color={theme.textSecondary} style={settingsScreenStyles.sectionTitle}>Appearance</BodyText>
          <SwitchSettingItem
            icon="moon-outline"
            title="Dark Mode"
            subtitle="Toggle between light and dark theme"
            value={isDarkMode}
            onValueChange={handleToggleDarkMode}
          />
        </View>

        <View style={settingsScreenStyles.section}>
          <BodyText color={theme.textSecondary} style={settingsScreenStyles.sectionTitle}>General</BodyText>
          <SettingItem
            icon="information-circle-outline"
            title="About"
            subtitle="Learn more about this app"
            onPress={handleAbout}
          />
        </View>

        <View style={settingsScreenStyles.section}>
          <BodyText color={theme.textSecondary} style={settingsScreenStyles.sectionTitle}>Data</BodyText>
          <SettingItem
            icon="trash-outline"
            title="Clear All Data"
            subtitle="Clear cached data and offline content"
            onPress={handleClearData}
          />
        </View>

        <View style={settingsScreenStyles.section}>
          <BodyText color={theme.textSecondary} style={settingsScreenStyles.sectionTitle}>Account</BodyText>
          <SettingItem
            icon="log-out-outline"
            title="Logout"
            subtitle="Sign out of your account"
            onPress={handleLogout}
          />
        </View>

        <View style={settingsScreenStyles.footer}>
          <BodyText color={theme.textSecondary} style={settingsScreenStyles.footerText}>Version 1.0.0</BodyText>
          <BodyText color={theme.textSecondary} style={settingsScreenStyles.footerText}>Made with React Native</BodyText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

