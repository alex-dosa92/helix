import { Colors } from './colors';

export interface Theme {
  // Main colors from the palette
  primary: string;
  secondary: string;
  tertiary: string;
  background: string;
  
  // Additional colors
  text: string;
  textSecondary: string;
  card: string;
  border: string;
  
  // UI elements
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;
  
  // Status colors
  error: string;
  success: string;
  warning: string;
  warningBackground: string;
  warningBorder: string;
  warningText: string;
}

export const lightTheme: Theme = {
  // Main palette colors
  primary: Colors.primary,
  secondary: Colors.secondary,
  tertiary: Colors.tertiary,
  background: Colors.background,
  
  // Additional colors for light mode
  text: Colors.primary,
  textSecondary: Colors.gray[600],
  card: Colors.white,
  border: Colors.gray[200],
  
  // UI elements
  tabBarBackground: Colors.white,
  tabBarActive: Colors.primary,
  tabBarInactive: Colors.gray[400],
  
  // Status colors
  error: Colors.error,
  success: Colors.success,
  warning: Colors.warning,
  warningBackground: '#FFF3CD',
  warningBorder: '#FFE69C',
  warningText: '#856404',
};

export const darkTheme: Theme = {
  // Main palette colors adapted for dark mode
  primary: Colors.white,
  secondary: Colors.secondary,
  tertiary: Colors.gray[700],
  background: Colors.primary,
  
  // Additional colors for dark mode
  text: Colors.white,
  textSecondary: Colors.white,
  card: Colors.gray[800],
  border: Colors.gray[700],
  
  // UI elements
  tabBarBackground: Colors.gray[800],
  tabBarActive: Colors.white,
  tabBarInactive: Colors.gray[500],
  
  // Status colors (slightly adjusted for dark mode)
  error: '#FF8A80',
  success: '#69F0AE',
  warning: '#FFD54F',
  warningBackground: '#2D2416',
  warningBorder: '#4A3B1A',
  warningText: '#D4B442',
};