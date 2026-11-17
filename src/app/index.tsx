import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useLanguage } from '../contexts/LanguageContext';
import { useThemeContext } from '../contexts/ThemeContext';
import { useCharacter } from '../contexts/CharacterContext';

export default function WelcomeScreen() {
  const { t } = useTranslation();

  const { language, changeLanguage } = useLanguage();
  const { theme, changeTheme, colors } = useThemeContext();

  const { character, setCharacterName } = useCharacter();

  const [playerName, setPlayerName] = useState(character.name);

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'tr' : 'en');
  };

  const toggleTheme = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const startAdventure = () => {
    const name = playerName.trim();

    if (!name) {
      return;
    }

    setCharacterName(name);
    router.push('/game');
  };

  const isDark = theme === 'dark';

  return (
    <KeyboardAvoidingView
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={styles.emoji}>🏰</Text>

          <Text
            style={[
              styles.title,
              { color: colors.primary },
            ]}
          >
            {t('gameTitle')}
          </Text>

          <Text
            style={[
              styles.welcome,
              { color: colors.text },
            ]}
          >
            {t('welcome')}
          </Text>

          <Text
            style={[
              styles.subtitle,
              { color: colors.secondaryText },
            ]}
          >
            {t('subtitle')}
          </Text>

          <View style={styles.divider} />

          <Text
            style={[
              styles.label,
              { color: colors.text },
            ]}
          >
            {t('enterName')}
          </Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.input,
                color: colors.text,
                borderColor: colors.border,
              },
            ]}
            placeholder={t('enterName')}
            placeholderTextColor={colors.secondaryText}
            value={playerName}
            onChangeText={setPlayerName}
            maxLength={24}
            autoCapitalize="words"
          />

          <Text
            style={[
              styles.label,
              { color: colors.text },
            ]}
          >
            🌍 {t('selectLanguage')}
          </Text>

          <TouchableOpacity
            style={[
              styles.selectionButton,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
            onPress={toggleLanguage}
          >
            <Text
              style={[
                styles.selectionText,
                { color: colors.text },
              ]}
            >
              {language === 'en'
                ? '🇬🇧 English'
                : '🇹🇷 Türkçe'}
            </Text>

            <Text
              style={[
                styles.changeIcon,
                { color: colors.primary },
              ]}
            >
              ⇄
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.label,
              { color: colors.text },
            ]}
          >
            🎨 {t('selectTheme')}
          </Text>

          <TouchableOpacity
            style={[
              styles.selectionButton,
              {
                backgroundColor: colors.background,
                borderColor: colors.border,
              },
            ]}
            onPress={toggleTheme}
          >
            <Text
              style={[
                styles.selectionText,
                { color: colors.text },
              ]}
            >
              {theme === 'dark'
                ? `🌙 ${t('dark')}`
                : `☀️ ${t('light')}`}
            </Text>

            <Text
              style={[
                styles.changeIcon,
                { color: colors.primary },
              ]}
            >
              ⇄
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.startButton,
              {
                backgroundColor: colors.primary,
                opacity: playerName.trim() ? 1 : 0.5,
              },
            ]}
            onPress={startAdventure}
            disabled={!playerName.trim()}
          >
            <Text
              style={[
                styles.startButtonText,
                { color: isDark ? '#18131F' : '#FFFFFF' },
              ]}
            >
              ⚔️ {t('startGame')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 22,
  },
  card: {
    borderWidth: 1,
    borderRadius: 22,
    padding: 25,
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  welcome: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 12,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#77777733',
    marginVertical: 22,
  },
  label: {
    width: '100%',
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 9,
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  selectionButton: {
    width: '100%',
    height: 54,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  changeIcon: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  startButton: {
    width: '100%',
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  startButtonText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
});
