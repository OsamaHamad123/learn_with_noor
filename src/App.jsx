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
import StoreModal from './components/Modals/StoreModal';
import QuestsModal from './components/Modals/QuestsModal';
import CertificateModal from './components/Modals/CertificateModal';

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

      {/* Global Modals */}
      <StoreModal />
      <QuestsModal />
      <CertificateModal />
    </>
  );
}
