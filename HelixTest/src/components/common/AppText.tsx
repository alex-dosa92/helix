import React from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

export type TextVariant = 
  | 'header' 
  | 'title' 
  | 'subtitle' 
  | 'body' 
  | 'caption' 
  | 'label'
  | 'section-title'
  | 'greeting'
  | 'time'
  | 'date'
  | 'hint'
  | 'error';

export type TextWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold';

interface AppTextProps {
  children: React.ReactNode;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  center?: boolean;
  italic?: boolean;
}

export const AppText: React.FC<AppTextProps> = ({
  children,
  variant = 'body',
  weight,
  color,
  style,
  numberOfLines,
  center = false,
  italic = false,
}) => {
  const { theme } = useTheme();

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      textAlign: center ? 'center' : 'left',
      fontStyle: italic ? 'italic' : 'normal',
    };

    // Variant styles
    switch (variant) {
      case 'header':
        baseStyle.fontSize = 32;
        baseStyle.fontWeight = 'bold';
        baseStyle.color = color || theme.text;
        break;
      case 'title':
        baseStyle.fontSize = 18;
        baseStyle.fontWeight = '600';
        baseStyle.color = color || theme.text;
        break;
      case 'subtitle':
        baseStyle.fontSize = 16;
        baseStyle.fontWeight = '500';
        baseStyle.color = color || theme.textSecondary;
        break;
      case 'body':
        baseStyle.fontSize = 16;
        baseStyle.fontWeight = 'normal';
        baseStyle.color = color || theme.text;
        break;
      case 'caption':
        baseStyle.fontSize = 12;
        baseStyle.fontWeight = 'normal';
        baseStyle.color = color || theme.textSecondary;
        break;
      case 'label':
        baseStyle.fontSize = 14;
        baseStyle.fontWeight = '600';
        baseStyle.color = color || theme.text;
        baseStyle.marginBottom = 8;
        break;
      case 'section-title':
        baseStyle.fontSize = 14;
        baseStyle.fontWeight = '600';
        baseStyle.color = color || theme.textSecondary;
        baseStyle.textTransform = 'uppercase';
        baseStyle.letterSpacing = 0.5;
        baseStyle.marginBottom = 10;
        baseStyle.marginLeft = 10;
        break;
      case 'greeting':
        baseStyle.fontSize = 28;
        baseStyle.fontWeight = '300';
        baseStyle.color = color || theme.textSecondary;
        break;
      case 'time':
        baseStyle.fontSize = 42;
        baseStyle.fontWeight = '200';
        baseStyle.color = color || theme.text;
        baseStyle.marginBottom = 5;
        break;
      case 'date':
        baseStyle.fontSize = 16;
        baseStyle.color = color || theme.textSecondary;
        break;
      case 'hint':
        baseStyle.fontSize = 14;
        baseStyle.color = color || theme.textSecondary;
        baseStyle.fontStyle = 'italic';
        break;
      case 'error':
        baseStyle.fontSize = 12;
        baseStyle.color = color || theme.error;
        baseStyle.marginTop = 5;
        break;
    }

    // Weight override
    if (weight) {
      switch (weight) {
        case 'light':
          baseStyle.fontWeight = '300';
          break;
        case 'normal':
          baseStyle.fontWeight = 'normal';
          break;
        case 'medium':
          baseStyle.fontWeight = '500';
          break;
        case 'semibold':
          baseStyle.fontWeight = '600';
          break;
        case 'bold':
          baseStyle.fontWeight = 'bold';
          break;
      }
    }

    return baseStyle;
  };

  return (
    <Text 
      style={[getTextStyle(), style]} 
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export const HeaderText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="header" {...props} />
);

export const TitleText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="title" {...props} />
);

export const SubtitleText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="subtitle" {...props} />
);

export const BodyText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="body" {...props} />
);

export const CaptionText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="caption" {...props} />
);

export const LabelText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="label" {...props} />
);

export const ErrorText: React.FC<Omit<AppTextProps, 'variant'>> = (props) => (
  <AppText variant="error" {...props} />
);

const styles = StyleSheet.create({
  // Base styles are handled dynamically in the component
});