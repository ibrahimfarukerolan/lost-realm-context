# The Lost Realm — Context API Edition

## Laboratory 5 — Usage of Context API

**Course:** Development of Hybrid Mobile Applications

### Project Description

The Lost Realm is a fantasy paragraph adventure game developed using React Native, Expo, and TypeScript.

The project demonstrates the use of React Context API to manage language preferences, application themes, and character information across multiple screens.

### Features

- Welcome screen with character name input
- English and Turkish language support
- Light and dark themes
- Independent language and theme selection
- Three React Context API providers
- Dynamic translations using react-i18next
- JSON-based translation files
- Dynamic player name and HP interpolation
- Character health and inventory management
- Three-chapter fantasy adventure
- Persistent language and theme preferences using AsyncStorage

### Context API Implementation

**1. LanguageContext**

Manages the selected language (English or Turkish) and integrates with react-i18next to update translations dynamically.

**2. ThemeContext**

Manages light and dark themes independently from the language settings. Provides shared color values to application screens.

**3. CharacterContext**

Manages the character's state, including:

- Character name
- Character class
- Current hit points (HP)
- Inventory

The context provides functions for taking damage, healing, collecting items, and resetting the character.

### Dynamic Translation

The application uses JSON translation files with react-i18next interpolation.

Example:

```json
{
  "playerGreeting": "Hello, {{playerName}}! You have {{hp}} hit points."
}
```

The placeholders are replaced dynamically with values stored in CharacterContext.

### Game Chapters

1. **The Mysterious Forest:** Explore the forest or rest.
2. **The Ancient Castle:** Fight the guardian or search a chest.
3. **The Final Chamber:** Collect the magical crystal and complete the adventure.

Character choices update HP and inventory using React Context API.

### Technologies

- React Native
- Expo SDK 58
- TypeScript
- React Context API
- react-i18next
- i18next
- AsyncStorage
- Expo Router

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

Start the application:

```bash
npx expo start
```

Open the application using Expo Go on a compatible mobile device.

### Project Structure

```text
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── game.tsx
├── contexts/
│   ├── LanguageContext.tsx
│   ├── ThemeContext.tsx
│   └── CharacterContext.tsx
├── translations/
│   ├── en.json
│   └── tr.json
└── utils/
    └── i18n.ts
```

### Laboratory Requirements

The application implements the required language and theme selection using React Context API. Both settings operate independently.

CharacterContext stores the character's state, while react-i18next loads translations from JSON files and replaces dynamic placeholders with current character values.

### Testing

The application was manually tested for navigation, language switching, theme switching, character HP updates, inventory management, and adventure completion.
