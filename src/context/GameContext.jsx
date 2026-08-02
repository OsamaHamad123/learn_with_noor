import React, { createContext, useContext, useState, useEffect } from 'react';
import { speakText, playAudioTone } from '../services/speechService';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [playerName, setPlayerName] = useState('');
  const [avatar, setAvatar] = useState('noor3d');
  const [xp, setXp] = useState(0);
  const [coins, setCoins] = useState(10);
  const [streak, setStreak] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [questProgress, setQuestProgress] = useState(0);
  const [lootOpened, setLootOpened] = useState(false);
  const [activeScreen, setActiveScreen] = useState('story');
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentWorldId, setCurrentWorldId] = useState('seerah');
  const [activeModal, setActiveModal] = useState(null); // 'store', 'quests', 'secret', 'cert', etc.

  // Load State
  useEffect(() => {
    try {
      const saved = localStorage.getItem('noor_game_state_v3');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.playerName) setPlayerName(data.playerName);
        if (data.avatar) setAvatar(data.avatar);
        if (data.xp !== undefined) setXp(data.xp);
        if (data.coins !== undefined) setCoins(data.coins);
        if (data.streak !== undefined) setStreak(data.streak);
        if (data.inventory) setInventory(data.inventory);
        if (data.questProgress !== undefined) setQuestProgress(data.questProgress);
        if (data.lootOpened !== undefined) setLootOpened(data.lootOpened);
      }
    } catch (e) {
      console.error("Error loading save state", e);
    }
  }, []);

  // Save State
  const saveState = (overrides = {}) => {
    try {
      const stateToSave = {
        playerName: overrides.playerName !== undefined ? overrides.playerName : playerName,
        avatar: overrides.avatar !== undefined ? overrides.avatar : avatar,
        xp: overrides.xp !== undefined ? overrides.xp : xp,
        coins: overrides.coins !== undefined ? overrides.coins : coins,
        streak: overrides.streak !== undefined ? overrides.streak : streak,
        inventory: overrides.inventory !== undefined ? overrides.inventory : inventory,
        questProgress: overrides.questProgress !== undefined ? overrides.questProgress : questProgress,
        lootOpened: overrides.lootOpened !== undefined ? overrides.lootOpened : lootOpened,
      };
      localStorage.setItem('noor_game_state_v3', JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Error saving state", e);
    }
  };

  const addXpAndCoins = (earnedXp, earnedCoins) => {
    const newXp = xp + earnedXp;
    const newCoins = coins + earnedCoins;
    const newQuestProg = Math.min(3, questProgress + 1);
    setXp(newXp);
    setCoins(newCoins);
    setQuestProgress(newQuestProg);
    saveState({ xp: newXp, coins: newCoins, questProgress: newQuestProg });
    playAudioTone('success');
  };

  const getRank = () => {
    if (xp >= 300) return { title: 'عَالِم جَلِيل 👑', color: '#8B5CF6' };
    if (xp >= 150) return { title: 'مُفَكِّر ذَكِي 💎', color: '#3B82F6' };
    if (xp >= 50) return { title: 'مُكْتَشِف مُبْدِع ⭐', color: '#10B981' };
    return { title: 'طَالِب مَعْرِفَة 🌸', color: '#F59E0B' };
  };

  const speak = (txt) => {
    speakText(txt, audioEnabled);
  };

  return (
    <GameContext.Provider value={{
      playerName, setPlayerName,
      avatar, setAvatar,
      xp, coins, streak, inventory, setInventory,
      questProgress, lootOpened, setLootOpened,
      activeScreen, setActiveScreen,
      audioEnabled, setAudioEnabled,
      currentWorldId, setCurrentWorldId,
      activeModal, setActiveModal,
      addXpAndCoins, getRank, speak, saveState
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
