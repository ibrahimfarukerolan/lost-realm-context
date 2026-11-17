
import { useState } from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useCharacter } from '../contexts/CharacterContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useThemeContext } from '../contexts/ThemeContext';

type Stage = 1 | 2 | 3 | 4;
type Choice = 'explore' | 'rest' | 'fight' | 'search' | null;

export default function GameScreen() {
  const { t } = useTranslation();
  const { language, changeLanguage } = useLanguage();
  const { theme, changeTheme, colors } = useThemeContext();

  const {
    character,
    takeDamage,
    heal,
    addItem,
    resetCharacter,
    setCharacterName,
  } = useCharacter();

  const [stage, setStage] = useState<Stage>(1);
  const [choice, setChoice] = useState<Choice>(null);

  const isDark = theme === 'dark';
  const isGameOver = character.hp <= 0;

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'tr' : 'en');
  };

  const toggleTheme = () => {
    changeTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleExplore = () => {
    if (choice) return;
    takeDamage(15);
    addItem('ancientSword');
    setChoice('explore');
  };

  const handleRest = () => {
    if (choice) return;
    heal(20);
    setChoice('rest');
  };

  const handleFight = () => {
    if (choice) return;
    takeDamage(25);
    setChoice('fight');
  };

  const handleSearch = () => {
    if (choice) return;
    heal(15);
    addItem('healingPotion');
    setChoice('search');
  };

  const nextStage = () => {
    if (stage === 1) setStage(2);
    if (stage === 2) setStage(3);
    setChoice(null);
  };

  const finishAdventure = () => {
    addItem('magicCrystal');
    setStage(4);
  };

  const restartAdventure = () => {
    const savedName = character.name;
    resetCharacter();
    setCharacterName(savedName);
    setStage(1);
    setChoice(null);
  };

  const getStoryTitle = () => {
    if (stage === 1) return t('forestTitle');
    if (stage === 2) return t('castleTitle');
    if (stage === 3) return t('finalTitle');
    return t('victoryTitle');
  };

  const getStoryText = () => {
    if (stage === 1) return t('storyText');
    if (stage === 2) return t('castleStory');
    if (stage === 3) return t('finalStory');

    return t('victoryMessage', {
      playerName: character.name,
      hp: character.hp,
    });
  };

  const ActionButton = ({
    title,
    onPress,
    secondary = false,
  }: {
    title: string;
    onPress: () => void;
    secondary?: boolean;
  }) => (
    <TouchableOpacity
      style={[
        styles.actionButton,
        {
          backgroundColor: secondary
            ? colors.card
            : colors.primary,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.actionText,
          {
            color: secondary
              ? colors.text
              : isDark
                ? '#18131F'
                : '#FFFFFF',
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={toggleLanguage}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>
              🌍 {language === 'en' ? 'EN' : 'TR'} ⇄
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleTheme}>
            <Text style={{ color: colors.primary, fontSize: 16 }}>
              {isDark ? '🌙 Dark' : '☀️ Light'} ⇄
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.gameTitle,
            { color: colors.primary },
          ]}
        >
          ⚔️ {t('gameTitle')}
        </Text>

        <View
          style={[
            styles.characterCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.primary },
            ]}
          >
            🧙 {t('characterInfo')}
          </Text>

          <Text
            style={[
              styles.characterText,
              { color: colors.text },
            ]}
          >
            {t('playerGreeting', {
              playerName: character.name,
              hp: character.hp,
            })}
          </Text>

          <Text
            style={[
              styles.characterText,
              { color: colors.secondaryText },
            ]}
          >
            {t('characterClass', {
              className: t('warrior'),
            })}
          </Text>

          <View
            style={[
              styles.healthBarBackground,
              { backgroundColor: colors.border },
            ]}
          >
            <View
              style={[
                styles.healthBar,
                {
                  width: `${character.hp}%`,
                  backgroundColor:
                    character.hp > 50
                      ? '#42B883'
                      : character.hp > 25
                        ? '#E5A63C'
                        : '#D9534F',
                },
              ]}
            />
          </View>

          <Text
            style={{
              color: colors.secondaryText,
              marginTop: 8,
            }}
          >
            {t('health', { hp: character.hp })}
          </Text>
        </View>

        <View
          style={[
            styles.storyCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          {stage <= 3 && (
            <Text
              style={{
                color: colors.secondaryText,
                textAlign: 'center',
                marginBottom: 10,
              }}
            >
              {t('currentStage', { stage })}
            </Text>
          )}

          <Text style={styles.storyEmoji}>
            {isGameOver
              ? '💀'
              : stage === 1
                ? '🌲'
                : stage === 2
                  ? '🏰'
                  : stage === 3
                    ? '💎'
                    : '🏆'}
          </Text>

          <Text
            style={[
              styles.storyTitle,
              { color: colors.primary },
            ]}
          >
            {isGameOver ? t('gameOverTitle') : getStoryTitle()}
          </Text>

          <Text
            style={[
              styles.storyText,
              { color: colors.text },
            ]}
          >
            {isGameOver
              ? t('gameOverMessage', {
                  playerName: character.name,
                })
              : getStoryText()}
          </Text>

          {!isGameOver && choice && stage <= 2 && (
            <View
              style={[
                styles.resultBox,
                { backgroundColor: colors.background },
              ]}
            >
              <Text
                style={{
                  color: colors.text,
                  textAlign: 'center',
                  lineHeight: 23,
                }}
              >
                {t(
                  choice === 'explore'
                    ? 'exploreResult'
                    : choice === 'rest'
                      ? 'restResult'
                      : choice === 'fight'
                        ? 'fightResult'
                        : 'searchResult'
                )}
              </Text>
            </View>
          )}

          {isGameOver ? (
            <ActionButton
              title={`🔄 ${t('restart')}`}
              onPress={restartAdventure}
            />
          ) : stage === 1 ? (
            choice ? (
              <ActionButton
                title={`➡️ ${t('continue')}`}
                onPress={nextStage}
              />
            ) : (
              <>
                <ActionButton
                  title={`🌲 ${t('explore')}`}
                  onPress={handleExplore}
                />
                <ActionButton
                  title={`🌿 ${t('rest')}`}
                  onPress={handleRest}
                  secondary
                />
              </>
            )
          ) : stage === 2 ? (
            choice ? (
              <ActionButton
                title={`➡️ ${t('continue')}`}
                onPress={nextStage}
              />
            ) : (
              <>
                <ActionButton
                  title={`⚔️ ${t('fight')}`}
                  onPress={handleFight}
                />
                <ActionButton
                  title={`🧰 ${t('search')}`}
                  onPress={handleSearch}
                  secondary
                />
              </>
            )
          ) : stage === 3 ? (
            <ActionButton
              title={`💎 ${t('takeCrystal')}`}
              onPress={finishAdventure}
            />
          ) : (
            <ActionButton
              title={`🔄 ${t('restart')}`}
              onPress={restartAdventure}
            />
          )}
        </View>

        <View
          style={[
            styles.inventoryCard,
            {
              backgroundColor: colors.card,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: colors.primary },
            ]}
          >
            🎒 {t('inventory')}
          </Text>

          {character.inventory.length === 0 ? (
            <Text style={{ color: colors.secondaryText }}>
              {t('emptyInventory')}
            </Text>
          ) : (
            character.inventory.map((item, index) => (
              <Text
                key={`${item}-${index}`}
                style={[
                  styles.inventoryItem,
                  { color: colors.text },
                ]}
              >
                • {t(item)}
              </Text>
            ))
          )}
        </View>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text
            style={{
              color: colors.secondaryText,
              fontSize: 15,
            }}
          >
            ← {t('back')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 22,
    paddingTop: 55,
    paddingBottom: 45,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  gameTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  characterCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  characterText: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 6,
  },
  healthBarBackground: {
    height: 13,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 12,
  },
  healthBar: {
    height: '100%',
    borderRadius: 10,
  },
  storyCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
  },
  storyEmoji: {
    fontSize: 55,
    textAlign: 'center',
    marginBottom: 15,
  },
  storyTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  storyText: {
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 20,
  },
  resultBox: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  actionButton: {
    minHeight: 52,
    borderWidth: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inventoryCard: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 20,
    marginBottom: 20,
  },
  inventoryItem: {
    fontSize: 15,
    marginBottom: 7,
  },
  backButton: {
    alignItems: 'center',
    padding: 12,
  },
});
