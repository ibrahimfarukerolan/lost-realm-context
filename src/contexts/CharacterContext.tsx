import React, {
    createContext,
    useContext,
    useState,
} from 'react';

type Character = {
  name: string;
  characterClass: string;
  hp: number;
  inventory: string[];
};

type CharacterContextType = {
  character: Character;
  setCharacterName: (name: string) => void;
  setCharacterClass: (characterClass: string) => void;
  takeDamage: (amount: number) => void;
  heal: (amount: number) => void;
  addItem: (item: string) => void;
  resetCharacter: () => void;
};

const initialCharacter: Character = {
  name: '',
  characterClass: 'Warrior',
  hp: 100,
  inventory: [],
};

const CharacterContext = createContext<
  CharacterContextType | undefined
>(undefined);

export function CharacterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [character, setCharacter] =
    useState<Character>(initialCharacter);

  const setCharacterName = (name: string) => {
    setCharacter((previous) => ({
      ...previous,
      name,
    }));
  };

  const setCharacterClass = (characterClass: string) => {
    setCharacter((previous) => ({
      ...previous,
      characterClass,
    }));
  };

  const takeDamage = (amount: number) => {
    setCharacter((previous) => ({
      ...previous,
      hp: Math.max(0, previous.hp - amount),
    }));
  };

  const heal = (amount: number) => {
    setCharacter((previous) => ({
      ...previous,
      hp: Math.min(100, previous.hp + amount),
    }));
  };

  const addItem = (item: string) => {
    setCharacter((previous) => ({
      ...previous,
      inventory: [...previous.inventory, item],
    }));
  };

  const resetCharacter = () => {
    setCharacter({ ...initialCharacter, inventory: [] });
  };

  return (
    <CharacterContext.Provider
      value={{
        character,
        setCharacterName,
        setCharacterClass,
        takeDamage,
        heal,
        addItem,
        resetCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
}

export function useCharacter() {
  const context = useContext(CharacterContext);

  if (!context) {
    throw new Error(
      'useCharacter must be used inside CharacterProvider'
    );
  }

  return context;
}
