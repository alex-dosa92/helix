import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { Colors } from '../../constants/colors';
import { hapticService } from '../../services/hapticService';

export type ButtonVariant = 'primary' | 'secondary' | 'cancel' | 'modal-primary' | 'modal-cancel';
export type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      opacity: disabled ? 0.5 : 1,
    };

    // Size variations
    switch (size) {
      case 'small':
        baseStyle.paddingVertical = 8;
        baseStyle.paddingHorizontal = 16;
        break;
      case 'large':
        baseStyle.paddingVertical = 16;
        baseStyle.paddingHorizontal = 32;
        break;
      default: // medium
        baseStyle.paddingVertical = 12;
        baseStyle.paddingHorizontal = 24;
    }

    // Variant styles
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = theme.primary;
        break;
      case 'secondary':
        baseStyle.backgroundColor = theme.secondary;
        break;
      case 'cancel':
        baseStyle.backgroundColor = theme.card;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.border;
        break;
      case 'modal-primary':
        baseStyle.backgroundColor = theme.primary;
        baseStyle.borderRadius = 5;
        baseStyle.minWidth = 80;
        baseStyle.paddingVertical = 10;
        baseStyle.paddingHorizontal = 10;
        break;
      case 'modal-cancel':
        baseStyle.backgroundColor = theme.border;
        baseStyle.borderRadius = 5;
        baseStyle.minWidth = 80;
        baseStyle.paddingVertical = 10;
        baseStyle.paddingHorizontal = 10;
        break;
    }

    if (fullWidth) {
      baseStyle.flex = 1;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    // Size variations
    switch (size) {
      case 'small':
        baseTextStyle.fontSize = 14;
        break;
      case 'large':
        baseTextStyle.fontSize = 18;
        break;
      default: // medium
        baseTextStyle.fontSize = 16;
    }

    // Variant text colors
    switch (variant) {
      case 'primary':
      case 'modal-primary':
        baseTextStyle.color = theme.background;
        break;
      case 'secondary':
        baseTextStyle.color = theme.primary;
        break;
      case 'cancel':
      case 'modal-cancel':
        baseTextStyle.color = theme.text;
        break;
    }

    return baseTextStyle;
  };

  const getIconColor = (): string => {
    switch (variant) {
      case 'primary':
      case 'modal-primary':
        return theme.background;
      case 'secondary':
        return theme.primary;
      case 'cancel':
      case 'modal-cancel':
        return theme.text;
      default:
        return theme.text;
    }
  };

  const handlePress = () => {
    hapticService.triggerImpact('light');
    onPress();
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getIconColor()} />
      ) : (
        <>
          {icon && (
            <Icon 
              name={icon} 
              size={size === 'small' ? 16 : size === 'large' ? 24 : 20} 
              color={getIconColor()} 
              style={{ marginRight: title ? 8 : 0 }}
            />
          )}
          {title && (
            <Text style={[getTextStyle(), textStyle]}>
              {title}
            </Text>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base styles are handled dynamically in the component
});