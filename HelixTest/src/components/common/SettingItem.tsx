import React from 'react';
import {
  View,
  TouchableOpacity,
  Switch,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { AppText } from './AppText';
import { hapticService } from '../../services/hapticService';

export interface SettingItemProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  disabled = false,
  style,
}) => {
  const { theme } = useTheme();

  const getItemStyle = () => ({
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    backgroundColor: theme.card,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    opacity: disabled ? 0.6 : 1,
  });

  const getIconContainerStyle = () => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: disabled ? theme.border : theme.tertiary,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    marginRight: 15,
  });

  const getIconColor = () => {
    return disabled ? theme.textSecondary : theme.primary;
  };

  const handlePress = () => {
    if (onPress) {
      hapticService.triggerSelection();
      onPress();
    }
  };

  return (
    <TouchableOpacity
      style={[getItemStyle(), style]}
      onPress={handlePress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress && !rightElement || disabled}
    >
      <View style={styles.settingLeft}>
        <View style={getIconContainerStyle()}>
          <Icon name={icon} size={22} color={getIconColor()} />
        </View>
        <View style={styles.textContainer}>
          <AppText 
            variant="body" 
            weight="semibold"
            style={{
              ...styles.settingTitle,
              color: disabled ? theme.textSecondary : theme.text
            }}
          >
            {title}
          </AppText>
          {subtitle && (
            <AppText 
              variant="caption" 
              style={{
                ...styles.settingSubtitle,
                color: disabled ? theme.textSecondary : theme.textSecondary,
                lineHeight: 18,
              }}
            >
              {subtitle}
            </AppText>
          )}
        </View>
      </View>
      {rightElement || (onPress && (
        <Icon name="chevron-forward" size={20} color={theme.textSecondary} />
      ))}
    </TouchableOpacity>
  );
};

interface SwitchSettingItemProps extends Omit<SettingItemProps, 'rightElement' | 'onPress'> {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const SwitchSettingItem: React.FC<SwitchSettingItemProps> = ({
  value,
  onValueChange,
  disabled = false,
  ...props
}) => {
  const { theme } = useTheme();

  const handleSwitchChange = (newValue: boolean) => {
    hapticService.triggerSelection();
    onValueChange(newValue);
  };

  return (
    <SettingItem
      {...props}
      disabled={disabled}
      rightElement={
        <Switch
          value={value}
          onValueChange={handleSwitchChange}
          trackColor={{ false: theme.border, true: theme.secondary }}
          thumbColor={value ? theme.primary : theme.card}
          disabled={disabled}
        />
      }
    />
  );
};

interface NotificationSettingItemProps extends Omit<SettingItemProps, 'rightElement' | 'onPress'> {
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export const NotificationSettingItem: React.FC<NotificationSettingItemProps> = ({
  value,
  onValueChange,
  disabled = false,
  ...props
}) => {
  const { theme } = useTheme();

  const handleNotificationSwitchChange = (newValue: boolean) => {
    hapticService.triggerSelection();
    onValueChange(newValue);
  };

  return (
    <View style={[
      styles.notificationItem,
      { backgroundColor: theme.card },
      disabled && styles.disabledItem
    ]}>
      <View style={styles.itemLeft}>
        <View style={[
          styles.iconContainer,
          { backgroundColor: disabled ? theme.border : theme.tertiary }
        ]}>
          <Icon 
            name={props.icon} 
            size={22} 
            color={disabled ? theme.textSecondary : theme.primary} 
          />
        </View>
        <View style={styles.textContainer}>
          <AppText 
            variant="body" 
            weight="semibold"
            style={{
              ...styles.itemTitle,
              color: disabled ? theme.textSecondary : theme.text
            }}
          >
            {props.title}
          </AppText>
          {props.subtitle && (
            <AppText 
              variant="caption" 
              style={{
                ...styles.itemSubtitle,
                color: disabled ? theme.textSecondary : theme.textSecondary,
                lineHeight: 18,
              }}
            >
              {props.subtitle}
            </AppText>
          )}
        </View>
      </View>
      <Switch
        value={value}
        onValueChange={handleNotificationSwitchChange}
        trackColor={{ false: theme.border, true: theme.secondary }}
        thumbColor={value ? theme.primary : theme.card}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  textContainer: {
    flex: 1,
  },
  settingTitle: {
    marginBottom: 2,
  },
  settingSubtitle: {
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  disabledItem: {
    opacity: 0.6,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  itemTitle: {
    marginBottom: 2,
  },
  itemSubtitle: {
  },
});