import React from 'react';
import {
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../../contexts/ThemeContext';
import { AppText } from './AppText';

export type CardVariant = 'default' | 'info' | 'warning' | 'gradient' | 'stats';

export interface CardProps {
  children?: React.ReactNode;
  variant?: CardVariant;
  style?: ViewStyle;
  icon?: string;
  title?: string;
  padding?: number;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  style,
  icon,
  title,
  padding = 16,
}) => {
  const { theme } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      padding,
    };

    switch (variant) {
      case 'default':
        baseStyle.backgroundColor = theme.card;
        break;
      case 'info':
        baseStyle.backgroundColor = theme.tertiary;
        baseStyle.flexDirection = 'row';
        baseStyle.alignItems = 'flex-start';
        break;
      case 'warning':
        baseStyle.backgroundColor = theme.warningBackground;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.warningBorder;
        baseStyle.flexDirection = 'row';
        baseStyle.alignItems = 'flex-start';
        break;
      case 'gradient':
        baseStyle.padding = 25;
        baseStyle.borderRadius = 20;
        baseStyle.marginBottom = 30;
        break;
      case 'stats':
        baseStyle.backgroundColor = theme.card;
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = theme.border;
        baseStyle.padding = 15;
        break;
    }

    return baseStyle;
  };

  const getIconColor = () => {
    switch (variant) {
      case 'info':
        return theme.secondary;
      case 'warning':
        return theme.warning;
      default:
        return theme.primary;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'warning':
        return theme.warningText;
      default:
        return theme.text;
    }
  };

  if (variant === 'gradient') {
    return (
      <LinearGradient
        colors={[theme.tertiary, theme.secondary]}
        style={[getCardStyle(), style]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {title && icon && (
          <View style={styles.gradientHeader}>
            <Icon name={icon} size={24} color={theme.primary} />
            <AppText 
              variant="title" 
              style={{
                ...styles.gradientTitle,
                color: theme.primary
              }}
            >
              {title}
            </AppText>
          </View>
        )}
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={[getCardStyle(), style]}>
      {(icon || title) && (variant === 'info' || variant === 'warning') && (
        <>
          {icon && (
            <Icon name={icon} size={24} color={getIconColor()} />
          )}
          <View style={styles.textContent}>
            {title && (
              <AppText 
                variant="body" 
                weight="semibold"
                style={{ color: getTextColor(), marginBottom: 8 }}
              >
                {title}
              </AppText>
            )}
            {children}
          </View>
        </>
      )}
      
      {!(icon || title) && children}
      
      {(icon || title) && variant !== 'info' && variant !== 'warning' && (
        <>
          {(icon || title) && (
            <View style={styles.header}>
              {icon && (
                <Icon name={icon} size={24} color={getIconColor()} />
              )}
              {title && (
                <AppText 
                  variant="title" 
                  style={{
                    ...styles.title,
                    color: getTextColor(),
                    marginLeft: icon ? 10 : 0
                  }}
                >
                  {title}
                </AppText>
              )}
            </View>
          )}
          {children}
        </>
      )}
    </View>
  );
};

interface InfoCardProps extends Omit<CardProps, 'variant'> {
  message: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  message,
  icon = "information-circle",
  ...props
}) => {
  
  return (
    <Card variant="info" icon={icon} {...props}>
      <AppText 
        variant="body" 
      >
        {message}
      </AppText>
    </Card>
  );
};

interface WarningCardProps extends Omit<CardProps, 'variant'> {
  message: string;
}

export const WarningCard: React.FC<WarningCardProps> = ({
  message,
  icon = "warning",
  ...props
}) => {
  
  return (
    <Card variant="warning" icon={icon} {...props}>
      <AppText 
        variant="body" 
      >
        {message}
      </AppText>
    </Card>
  );
};

interface StatsCardProps extends Omit<CardProps, 'variant'> {
  title: string;
  icon: string;
  children: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  icon,
  children,
  ...props
}) => {
  return (
    <Card variant="gradient" icon={icon} title={title} {...props}>
      {children}
    </Card>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
  },
  gradientHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  gradientTitle: {
    marginLeft: 10,
  },
  textContent: {
    flex: 1,
    marginLeft: 12,
  },
  messageText: {
  },
});