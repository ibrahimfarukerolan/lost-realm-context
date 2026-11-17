import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../utils/i18n';

type Language = 'en' | 'tr';

type LanguageContextType = {
  language: Language;
  changeLanguage: (language: Language) => void;
};

const LanguageContext = createContext<
  LanguageContextType | undefined
>(undefined);

const LANGUAGE_KEY = '@lost_realm_language';

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [language, setLanguage] = useState<Language>('en');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const saved = await AsyncStorage.getItem(LANGUAGE_KEY);

        if (saved === 'en' || saved === 'tr') {
          setLanguage(saved);
          await i18n.changeLanguage(saved);
        }
      } catch (error) {
        console.log('Language loading error:', error);
      } finally {
        setLoaded(true);
      }
    };

    loadLanguage();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    i18n.changeLanguage(language);

    AsyncStorage.setItem(LANGUAGE_KEY, language).catch(
      console.log
    );
  }, [language, loaded]);

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{ language, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error(
      'useLanguage must be used inside LanguageProvider'
    );
  }

  return context;
}
