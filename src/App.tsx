/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GameScreen, CoupleProfile, GameStats } from './types/game';
import { HeaderBar } from './components/HeaderBar';
import { TitleMenu } from './components/TitleMenu';
import { Level1Memory } from './components/Level1Memory';
import { Level2Catcher } from './components/Level2Catcher';
import { Level3AngryBubbles } from './components/Level3AngryBubbles';
import { EndingScreen } from './components/EndingScreen';
import { MemoryAlbumModal } from './components/MemoryAlbumModal';
import { NameConfigModal } from './components/NameConfigModal';
import { sound } from './utils/audio';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('MENU');
  const [isMuted, setIsMuted] = useState(false);
  const [isBgmOn, setIsBgmOn] = useState(false);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Couple Profile (Canon default: 一二 & 布布)
  const [couple, setCouple] = useState<CoupleProfile>({
    character1Name: '一二',
    character1Emoji: '🐼',
    character1Title: '圓滾白熊貓 · Dudu',
    character2Name: '布布',
    character2Emoji: '🐻',
    character2Title: '暖心小棕熊 · Bubu',
  });

  // Game Stats
  const [stats, setStats] = useState<GameStats>({
    level1Moves: 0,
    level1Time: 0,
    level2Score: 0,
    level2Time: 0,
    level3Bubbles: 0,
    level3Time: 0,
    totalTime: 0,
  });

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (nextMuted) {
      setIsBgmOn(false);
    }
  };

  const handleToggleBgm = () => {
    if (isMuted) {
      setIsMuted(false);
      sound.setMuted(false);
    }
    const state = sound.toggleBgm();
    setIsBgmOn(state);
  };

  const handleStartGame = () => {
    sound.playCatchHeart();
    setCurrentScreen('LEVEL1');
  };

  const handleLevel1Complete = (levelStats: { moves: number; time: number }) => {
    setStats((prev) => ({
      ...prev,
      level1Moves: levelStats.moves,
      level1Time: levelStats.time,
    }));
  };

  const handleLevel2Complete = (levelStats: { score: number; time: number }) => {
    setStats((prev) => ({
      ...prev,
      level2Score: levelStats.score,
      level2Time: levelStats.time,
    }));
  };

  const handleLevel3Complete = (levelStats: { bubbles: number; time: number }) => {
    setStats((prev) => ({
      ...prev,
      level3Bubbles: levelStats.bubbles,
      level3Time: levelStats.time,
      totalTime: prev.level1Time + prev.level2Time + levelStats.time,
    }));
  };

  const handleResetGame = () => {
    sound.playCatchHeart();
    setCurrentScreen('MENU');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff0f3] via-[#ffe5ec] to-[#fcd5ce] text-[#592929] flex flex-col items-center justify-between p-3 sm:p-6 relative selection:bg-pink-200 selection:text-pink-900">
      {/* Background Floating Petals Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-35 z-0">
        <div className="absolute top-12 left-10 text-2xl animate-float">🌸</div>
        <div className="absolute top-1/4 right-12 text-xl animate-float" style={{ animationDelay: '1s' }}>🌸</div>
        <div className="absolute bottom-1/3 left-16 text-lg animate-float" style={{ animationDelay: '1.5s' }}>💕</div>
        <div className="absolute bottom-12 right-20 text-2xl animate-float" style={{ animationDelay: '0.5s' }}>🌸</div>
      </div>

      {/* Top Bar */}
      <div className="w-full z-10">
        <HeaderBar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          isBgmOn={isBgmOn}
          onToggleBgm={handleToggleBgm}
          onOpenAlbum={() => setIsAlbumOpen(true)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      </div>

      {/* Main Game Container */}
      <main className="w-full max-w-lg min-h-[580px] bg-white/92 backdrop-blur-md rounded-3xl border-4 border-white shadow-2xl shadow-pink-300/30 p-5 sm:p-7 relative z-10 flex flex-col justify-center my-auto">
        {currentScreen === 'MENU' && (
          <TitleMenu
            couple={couple}
            onStartGame={handleStartGame}
            onOpenAlbum={() => setIsAlbumOpen(true)}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {currentScreen === 'LEVEL1' && (
          <Level1Memory
            couple={couple}
            onComplete={handleLevel1Complete}
            onGoToLevel2={() => setCurrentScreen('LEVEL2')}
          />
        )}

        {currentScreen === 'LEVEL2' && (
          <Level2Catcher
            couple={couple}
            onComplete={handleLevel2Complete}
            onGoToLevel3={() => setCurrentScreen('LEVEL3')}
          />
        )}

        {currentScreen === 'LEVEL3' && (
          <Level3AngryBubbles
            couple={couple}
            onComplete={handleLevel3Complete}
            onGoToEnding={() => setCurrentScreen('ENDING')}
          />
        )}

        {currentScreen === 'ENDING' && (
          <EndingScreen
            couple={couple}
            stats={stats}
            onReset={handleResetGame}
            onOpenAlbum={() => setIsAlbumOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      <MemoryAlbumModal
        isOpen={isAlbumOpen}
        onClose={() => setIsAlbumOpen(false)}
        couple={couple}
      />

      <NameConfigModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        couple={couple}
        onSave={(newCouple) => setCouple(newCouple)}
      />

      {/* Clean quiet footer */}
      <footer className="w-full max-w-lg text-center py-4 text-xs text-[#8d6b6b] z-10 flex items-center justify-center gap-2">
        <span>一二 🐼（Dudu） & 布布 🐻（Bubu） 戀愛冒險</span>
        <span aria-hidden="true">·</span>
        <span>甜蜜暖心和好大作戰</span>
      </footer>
    </div>
  );
}
