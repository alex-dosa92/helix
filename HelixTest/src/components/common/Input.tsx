import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { AppText } from './AppText';

export interface InputProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  icon?: string;
  rightIcon?: string;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  multiline?: boolean;
  numberOfLines?: number;
  maxLength?: number;
  showCharCount?: boolean;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
  maxLength,
  showCharCount = false,
  required = false,
  value,
  onChangeText,
  ...props
}) => {
  const { theme } = useTheme();

  const getInputStyle = () => ({
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: theme.text,
    borderWidth: 1,
    borderColor: error ? theme.error : theme.border,
    textAlignVertical: multiline ? 'top' as const : 'center' as const,
    height: multiline ? (numberOfLines || 4) * 25 + 30 : undefined,
    paddingLeft: icon ? 50 : 15,
    paddingRight: rightIcon ? 50 : 15,
  });

  const getContainerStyle = () => ({
    marginBottom: 20,
  });

  return (
    <View style={[getContainerStyle(), containerStyle]}>
      {label && (
        <AppText variant="label" style={{ color: theme.text }}>
          {label}{required && ' *'}
        </AppText>
      )}
      
      <View style={styles.inputContainer}>
        {icon && (
          <Icon
            name={icon}
            size={20}
            color={theme.textSecondary}
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          style={[getInputStyle(), inputStyle]}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={theme.textSecondary}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          maxLength={maxLength}
          {...props}
        />
        
        {rightIcon && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={onRightIconPress}
            activeOpacity={0.7}
          >
            <Icon
              name={rightIcon}
              size={20}
              color={theme.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.bottomRow}>
        {error && (
          <AppText variant="error">{error}</AppText>
        )}
        
        {showCharCount && maxLength && (
          <AppText 
            variant="caption" 
            style={{
              ...styles.charCount,
              color: theme.textSecondary
            }}
          >
            {(value?.length || 0)}/{maxLength} characters
          </AppText>
        )}
      </View>
    </View>
  );
};

interface DateInputProps {
  label?: string;
  value?: Date;
  onPress: () => void;
  placeholder?: string;
  error?: string;
  containerStyle?: ViewStyle;
  required?: boolean;
}

export const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onPress,
  placeholder = 'Select date',
  error,
  containerStyle,
  required = false,
}) => {
  const { theme } = useTheme();

  const getDateInputStyle = () => ({
    backgroundColor: theme.card,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    borderWidth: 1,
    borderColor: error ? theme.error : theme.border,
  });

  return (
    <View style={[styles.inputGroup, containerStyle]}>
      {label && (
        <AppText variant="label" style={{ color: theme.text }}>
          {label}{required && ' *'}
        </AppText>
      )}
      
      <TouchableOpacity
        style={getDateInputStyle()}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <AppText 
          variant="body" 
          style={{ color: value ? theme.text : theme.textSecondary }}
        >
          {value ? value.toLocaleDateString() : placeholder}
        </AppText>
        <Icon name="calendar-outline" size={20} color={theme.textSecondary} />
      </TouchableOpacity>
      
      {error && (
        <AppText variant="error">{error}</AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
  },
  leftIcon: {
    position: 'absolute',
    left: 15,
    top: '50%',
    zIndex: 1,
    transform: [{ translateY: -10 }],
  },
  rightIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    zIndex: 1,
    transform: [{ translateY: -10 }],
    padding: 5,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  charCount: {
    textAlign: 'right',
    marginLeft: 'auto',
  },
  inputGroup: {
    marginBottom: 20,
  },
});