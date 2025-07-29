import { useTheme } from '../contexts/ThemeContext';

export const useThemedStyles = () => {
  const { theme } = useTheme();
  
  return {
    container: {
      backgroundColor: theme.background,
    },
    text: {
      color: theme.text,
    },
    textSecondary: {
      color: theme.textSecondary,
    },
    card: {
      backgroundColor: theme.card,
    },
    border: {
      borderColor: theme.border,
    },
    input: {
      backgroundColor: theme.card,
      color: theme.text,
      borderColor: theme.border,
    },
  };
};