import React from 'react';
import { useGame } from './context/GameContext';
import TopBar from './components/TopBar';
import IntroStory from './components/IntroStory';
import UniverseGalaxy from './components/UniverseGalaxy';
import ClassroomSuite from './components/ClassroomSuite';
import MemoryGame from './games/MemoryGame';
import DragDropGame from './games/DragDropGame';
import BalloonPopGame from './games/BalloonPopGame';
import DrawingBoard from './games/DrawingBoard';
import SpinningWheel from './games/SpinningWheel';
import CatchGoodiesGame from './games/CatchGoodiesGame';
import WordPuzzleGame from './games/WordPuzzleGame';
import HiddenObjectGame from './games/HiddenObjectGame';
import SoundMatchGame from './games/SoundMatchGame';
import SpaceRocketGame from './games/SpaceRocketGame';
import TowerBuilderGame from './games/TowerBuilderGame';
import ChefNoorGame from './games/ChefNoorGame';
import RacingGame from './games/RacingGame';
import WhackHabitGame from './games/WhackHabitGame';
import ShieldDefenseGame from './games/ShieldDefenseGame';
import BrickBreakerGame from './games/BrickBreakerGame';
import WordSearchGame from './games/WordSearchGame';
import MizanBalanceGame from './games/MizanBalanceGame';
import ScienceLabGame from './games/ScienceLabGame';
import PianoRhythmGame from './games/PianoRhythmGame';
import StoreModal from './components/Modals/StoreModal';
import QuestsModal from './components/Modals/QuestsModal';
import CertificateModal from './components/Modals/CertificateModal';
import VoiceSubtitleOverlay from './components/VoiceSubtitleOverlay';

export default function App() {
  const { activeScreen } = useGame();

  return (
    <>
      <TopBar />

      {activeScreen === 'story' && <IntroStory />}
      {activeScreen === 'universe' && <UniverseGalaxy />}
      {activeScreen === 'classroom' && <ClassroomSuite />}
      {activeScreen === 'game_memory' && <MemoryGame />}
      {activeScreen === 'game_dragdrop' && <DragDropGame />}
      {activeScreen === 'game_balloon' && <BalloonPopGame />}
      {activeScreen === 'game_drawing' && <DrawingBoard />}
      {activeScreen === 'game_wheel' && <SpinningWheel />}
      {activeScreen === 'game_catch' && <CatchGoodiesGame />}
      {activeScreen === 'game_wordpuzzle' && <WordPuzzleGame />}
      {activeScreen === 'game_hidden' && <HiddenObjectGame />}
      {activeScreen === 'game_sound' && <SoundMatchGame />}
      {activeScreen === 'game_space' && <SpaceRocketGame />}
      {activeScreen === 'game_tower' && <TowerBuilderGame />}
      {activeScreen === 'game_chef' && <ChefNoorGame />}
      {activeScreen === 'game_racing' && <RacingGame />}
      {activeScreen === 'game_whack' && <WhackHabitGame />}
      {activeScreen === 'game_shield' && <ShieldDefenseGame />}
      {activeScreen === 'game_brick' && <BrickBreakerGame />}
      {activeScreen === 'game_wordsearch' && <WordSearchGame />}
      {activeScreen === 'game_mizan' && <MizanBalanceGame />}
      {activeScreen === 'game_science' && <ScienceLabGame />}
      {activeScreen === 'game_piano' && <PianoRhythmGame />}

      {/* Global Subtitle Overlay */}
      <VoiceSubtitleOverlay />

      {/* Global Modals */}
      <StoreModal />
      <QuestsModal />
      <CertificateModal />
    </>
  );
}
