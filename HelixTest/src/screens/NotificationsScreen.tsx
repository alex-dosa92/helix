import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import { useAppSelector, useAppDispatch } from '../store';
import { updatePreferences } from '../store/slices/userSlice';
import { useTheme } from '../contexts/ThemeContext';
import { notificationsScreenStyles } from '../styles/NotificationsScreenStyles';
import { HeaderText, BodyText, NotificationSettingItem, InfoCard, WarningCard, Button } from '../components/common';
import { simpleNotificationService, PermissionStatus } from '../services/simpleNotifications';


const NotificationsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { theme } = useTheme();
  const [pushPermissionStatus, setPushPermissionStatus] = useState<PermissionStatus>('not-requested');
  const [requestingPushPermission, setRequestingPushPermission] = useState(false);

  const checkPushPermissions = useCallback(async () => {
    try {
      const permissionStatus = await simpleNotificationService.checkPermission();
      setPushPermissionStatus(permissionStatus);
      
      if (permissionStatus === 'denied' && user?.preferences.pushNotifications && !requestingPushPermission) {
        requestPushPermissions();
      }
    } catch (error) {
      console.error('Error checking push permissions:', error);
      setPushPermissionStatus('denied');
    }
  }, [user?.preferences.pushNotifications, requestingPushPermission]);

  useEffect(() => {
    checkPushPermissions();
  }, [checkPushPermissions]);

  const requestPushPermissions = async () => {
    setRequestingPushPermission(true);

    try {
      const granted = await simpleNotificationService.requestPermission();
      
      const currentStatus = await simpleNotificationService.checkPermission();
      setPushPermissionStatus(currentStatus);
      
      if (granted) {
        Alert.alert(
          'Notifications Enabled',
          'You will now receive push notifications from our app.',
          [{ text: 'OK' }]
        );
      } else {
        Alert.alert(
          'Notifications Blocked',
          'Please enable notifications in your device settings to receive push notifications.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => {
              Alert.alert('Info', 'Please go to Settings > Apps > HelixTest > Notifications to enable notifications.');
            }},
          ]
        );
      }
    } catch (error) {
      console.error('Error requesting push permissions:', error);
      const currentStatus = await simpleNotificationService.checkPermission();
      setPushPermissionStatus(currentStatus);
      
      Alert.alert(
        'Error',
        'Failed to request notification permissions. Please try again.',
        [{ text: 'OK' }]
      );
    } finally {
      setRequestingPushPermission(false);
    }
  };

  const handleEmailToggle = (value: boolean) => {
    dispatch(updatePreferences({ emailNotifications: value }));
  };

  const handlePushToggle = async (value: boolean) => {
    if (value && pushPermissionStatus !== 'granted') {
      await requestPushPermissions();
      const currentStatus = await simpleNotificationService.checkPermission();
      setPushPermissionStatus(currentStatus);
      if (currentStatus === 'granted') {
        dispatch(updatePreferences({ pushNotifications: value }));
      }
    } else {
      dispatch(updatePreferences({ pushNotifications: value }));
    }
  };

  const isPushDisabled = pushPermissionStatus === 'denied';
  
  const testNotification = () => {
    simpleNotificationService.showTestNotification(
      'Test Notification',
      'This is a test notification to verify the system is working!'
    );
  };

  return (
    <SafeAreaView style={[notificationsScreenStyles.container, { backgroundColor: theme.background }]}>
      <ScrollView
        contentContainerStyle={notificationsScreenStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={notificationsScreenStyles.header}>
          <HeaderText>Notifications</HeaderText>
          <BodyText color={theme.textSecondary} style={notificationsScreenStyles.headerSubtitle}>
            Manage how you receive updates and alerts
          </BodyText>
        </View>

        <View style={notificationsScreenStyles.section}>
          <BodyText color={theme.textSecondary} style={notificationsScreenStyles.sectionTitle}>Notification Preferences</BodyText>
          
          <NotificationSettingItem
            icon="mail-outline"
            title="Email Notifications"
            subtitle="Receive updates and news via email"
            value={user?.preferences.emailNotifications || false}
            onValueChange={handleEmailToggle}
          />

          <NotificationSettingItem
            icon="notifications-outline"
            title="Push Notifications"
            subtitle={
              isPushDisabled
                ? "Enable in device settings to receive push notifications"
                : pushPermissionStatus === 'not-requested'
                ? "Tap to enable push notifications"
                : "Receive instant alerts on your device"
            }
            value={user?.preferences.pushNotifications || false}
            onValueChange={handlePushToggle}
            disabled={isPushDisabled}
          />
        </View>

        <View style={notificationsScreenStyles.infoSection}>
          <InfoCard message="You can customize notification settings for specific features within each section of the app." />
        </View>

        {pushPermissionStatus === 'granted' && (
          <View style={[notificationsScreenStyles.section, notificationsScreenStyles.testSection]}>
            <BodyText color={theme.textSecondary} style={notificationsScreenStyles.sectionTitle}>Testing</BodyText>
            <Button
              title="Test Notification"
              icon="notifications-outline"
              variant="secondary"
              size="medium"
              onPress={testNotification}
            />
            <BodyText color={theme.textSecondary} style={notificationsScreenStyles.testDescription}>
              Tap to test if notifications are working properly
            </BodyText>
          </View>
        )}

        {isPushDisabled && (
          <View style={notificationsScreenStyles.warningSection}>
            <WarningCard message="Push notifications are disabled in your device settings. Enable them to receive instant updates." />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsScreen;

