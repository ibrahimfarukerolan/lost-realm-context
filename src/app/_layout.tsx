import { Stack } from 'expo-router';

import '../utils/i18n';

import { CharacterProvider } from '../contexts/CharacterContext';
import { LanguageProvider } from '../contexts/LanguageContext';
import { ThemeProvider } from '../contexts/ThemeContext';

export default function RootLayout() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <CharacterProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </CharacterProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
