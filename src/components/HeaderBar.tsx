import React from 'react';
import { Volume2, VolumeX, Music, BookOpen, Settings } from 'lucide-react';
import { GameScreen } from '../types/game';
import { sound } from '../utils/audio';

interface HeaderBarProps {
  currentScreen: GameScreen;
  onNavigate: (screen: GameScreen) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isBgmOn: boolean;
  onToggleBgm: () => void;
  onOpenAlbum: () => void;
  onOpenSettings: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  currentScreen,
  onNavigate,
  isMuted,
  onToggleMute,
  isBgmOn,
  onToggleBgm,
  onOpenAlbum,
  onOpenSettings,
}) => {
  return (
    <header className="w-full max-w-4xl mx-auto px-4 py-3 flex items-center justify-between border-b border-pink-200/60 bg-white/70 backdrop-blur-md rounded-2xl mb-4 shadow-sm">
      {/* Zone 1: Brand title wordmark */}
      <button
        onClick={() => onNavigate('MENU')}
        className="text-base sm:text-lg font-bold tracking-tight text-[#c9184a] hover:opacity-80 transition-opacity flex items-center gap-1.5"
      >
        <span>一二和布布的戀愛冒險</span>
      </button>

      {/* Zone 2: Clean navigation links */}
      <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-[#7a5555]">
        <button
          onClick={() => onNavigate('MENU')}
          className={`hover:text-[#c9184a] transition-colors ${currentScreen === 'MENU' ? 'text-[#c9184a] font-semibold' : ''}`}
        >
          故事首頁
        </button>
        <button
          onClick={() => onNavigate('LEVEL1')}
          className={`hover:text-[#c9184a] transition-colors ${currentScreen === 'LEVEL1' ? 'text-[#c9184a] font-semibold' : ''}`}
        >
          第一部·默契翻牌
        </button>
        <button
          onClick={() => onNavigate('LEVEL2')}
          className={`hover:text-[#c9184a] transition-colors ${currentScreen === 'LEVEL2' ? 'text-[#c9184a] font-semibold' : ''}`}
        >
          第二部·接住心意
        </button>
        <button
          onClick={() => onNavigate('LEVEL3')}
          className={`hover:text-[#c9184a] transition-colors ${currentScreen === 'LEVEL3' ? 'text-[#c9184a] font-semibold' : ''}`}
        >
          第三部·化解脾氣
        </button>
      </nav>

      {/* Zone 3: Primary actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleBgm}
          title={isBgmOn ? "關閉音樂盒旋律" : "開啟音樂盒旋律"}
          className={`p-2 rounded-xl border transition-all ${
            isBgmOn
              ? 'bg-[#ffe5ec] text-[#c9184a] border-pink-300 shadow-sm'
              : 'bg-white/80 text-gray-500 border-gray-200 hover:bg-pink-50'
          }`}
          aria-label="音樂開關"
        >
          <Music className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleMute}
          title={isMuted ? "解除靜音" : "靜音音效"}
          className={`p-2 rounded-xl border transition-all ${
            isMuted
              ? 'bg-gray-100 text-gray-400 border-gray-200'
              : 'bg-white/80 text-[#c9184a] border-pink-200 hover:bg-pink-50 shadow-sm'
          }`}
          aria-label="音效開關"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={onOpenAlbum}
          title="回憶相簿"
          className="p-2 rounded-xl border border-pink-200 bg-white/80 text-[#c9184a] hover:bg-pink-50 transition-all shadow-sm"
          aria-label="相簿"
        >
          <BookOpen className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenSettings}
          title="自訂情侶名稱"
          className="p-2 rounded-xl border border-pink-200 bg-white/80 text-[#c9184a] hover:bg-pink-50 transition-all shadow-sm"
          aria-label="設定"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
