import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';

type ThemeContextType = {
  theme: ThemeMode;
  changeTheme: (theme: ThemeMode) => void;
  colors: {
    background: string;
    card: string;
    text: string;
    secondaryText: string;
    primary: string;
    border: string;
    input: string;
  };
};

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

const THEME_KEY = '@lost_realm_theme';

const palettes = {
  light: {
    background: '#F5F0E8',
    card: '#FFFFFF',
    text: '#292333',
    secondaryText: '#625C68',
    primary: '#8056A6',
    border: '#D8CEDD',
    input: '#FFFFFF',
  },
  dark: {
    background: '#14121C',
    card: '#252131',
    text: '#FFFFFF',
    secondaryText: '#B7B0C4',
    primary: '#E8BE65',
    border: '#55476B',
    input: '#302B3B',
  },
};

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const saved = await AsyncStorage.getItem(THEME_KEY);

        if (saved === 'light' || saved === 'dark') {
          setTheme(saved);
        }
      } catch (error) {
        console.log('Theme loading error:', error);
      } finally {
        setLoaded(true);
      }
    };

    loadTheme();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(THEME_KEY, theme).catch(console.log);
  }, [theme, loaded]);

  const changeTheme = (newTheme: ThemeMode) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
        colors: palettes[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'useThemeContext must be used inside ThemeProvider'
    );
  }

  return context;
}
