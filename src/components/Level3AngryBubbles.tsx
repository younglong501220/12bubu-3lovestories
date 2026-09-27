import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Flame, Clock } from 'lucide-react';
import { CoupleProfile } from '../types/game';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';
import { DuduAvatar, BubuAvatar } from './BubuDuduAvatars';

interface Level3AngryBubblesProps {
  couple: CoupleProfile;
  onComplete: (stats: { bubbles: number; time: number }) => void;
  onGoToEnding: () => void;
}

interface GrumpyBubble {
  id: number;
  x: number;
  y: number;
  emoji: string;
  grumpText: string;
  sweetText: string;
  isPopped: boolean;
}

const GRUMPY_QUOTES = [
  { emoji: '😾', grump: '不理你啦！', sweet: '其實在等你抱我🥺' },
  { emoji: '🥔', grump: '快餵洋芋片！', sweet: '最喜歡你餵我了🥔' },
  { emoji: '🧋', grump: '珍奶不分你！', sweet: '第一口甜甜留給你喝🧋' },
  { emoji: '🐻', grump: '走開啦笨熊！', sweet: '牽緊你的手不放💓' },
  { emoji: '🐱', grump: '貓咪比較可愛！', sweet: '小貓跟你都好可愛🐱' },
  { emoji: '🎂', grump: '蛋糕被吃光了！', sweet: '一起吃草莓慶祝生日🎂' },
  { emoji: '💢', grump: '哼！大笨蛋！', sweet: '專屬於我的大笨蛋🥰' },
  { emoji: '🗯️', grump: '肚子餓扁了！', sweet: '想吃你親手準備的點心🥞' },
];

export const Level3AngryBubbles: React.FC<Level3AngryBubblesProps> = ({
  couple,
  onComplete,
  onGoToEnding,
}) => {
  const [bubbles, setBubbles] = useState<GrumpyBubble[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [showBigHeart, setShowBigHeart] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sweetPopups, setSweetPopups] = useState<{ id: number; x: number; y: number; text: string }[]>([]);

  const areaRef = useRef<HTMLDivElement | null>(null);
  const spawnerRef = useRef<number | null>(null);
  const poppedCountRef = useRef(0);
  const isFinishedRef = useRef(false);

  // Timer
  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!isFinishedRef.current) {
        setSeconds((s) => s + 1);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Spawner
  useEffect(() => {
    const spawnBubble = () => {
      if (poppedCountRef.current >= 15 || !areaRef.current || isFinishedRef.current) return;

      const area = areaRef.current;
      const width = area.clientWidth;
      const height = area.clientHeight;

      const template = GRUMPY_QUOTES[Math.floor(Math.random() * GRUMPY_QUOTES.length)];
      const size = 58;
      const x = Math.max(12, Math.random() * (width - size - 24));
      const y = Math.max(12, Math.random() * (height - size - 24));

      const newBubble: GrumpyBubble = {
        id: Date.now() + Math.random(),
        x,
        y,
        emoji: template.emoji,
        grumpText: template.grump,
        sweetText: template.sweet,
        isPopped: false,
      };

      setBubbles((prev) => {
        const filtered = prev.filter((b) => !b.isPopped).slice(-4);
        return [...filtered, newBubble];
      });
    };

    spawnerRef.current = window.setInterval(spawnBubble, 650);

    return () => {
      if (spawnerRef.current !== null) {
        clearInterval(spawnerRef.current);
      }
    };
  }, []);

  const handleBubbleClick = (bubble: GrumpyBubble) => {
    if (bubble.isPopped || isFinishedRef.current) return;

    sound.playBubblePop();

    setBubbles((prev) =>
      prev.map((b) => (b.id === bubble.id ? { ...b, isPopped: true } : b))
    );

    const popupId = Date.now();
    setSweetPopups((prev) => [
      ...prev,
      { id: popupId, x: bubble.x, y: bubble.y, text: bubble.sweetText },
    ]);
    setTimeout(() => {
      setSweetPopups((prev) => prev.filter((p) => p.id !== popupId));
    }, 1300);

    poppedCountRef.current += 1;
    const currentCount = poppedCountRef.current;
    setPoppedCount(currentCount);

    if (currentCount >= 15) {
      isFinishedRef.current = true;
      if (spawnerRef.current !== null) clearInterval(spawnerRef.current);
      setBubbles([]);
      setShowBigHeart(true);
      sound.playHeartbeat();
      onComplete({ bubbles: 15, time: seconds });
    }
  };

  const handleBigHeartClick = () => {
    sound.playVictory();
    fireConfetti(65);
    onGoToEnding();
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full relative">
      {/* Header and metadata */}
      <div className="w-full text-center mb-2">
        <h2 className="text-xl font-bold text-[#c9184a] mb-1">第三關：消滅小脾氣</h2>
        <p className="text-xs text-[#7a5555]">
          一二鼓起腮幫子生悶氣啦！點擊畫面中的生氣泡泡，化解所有的可愛小彆扭！
        </p>

        {/* Tabular Numerals Unboxed Stats */}
        <div className="flex items-center justify-center gap-3 text-xs text-[#7a5555] font-medium mt-2 tabular-nums">
          <div className="flex items-center gap-1 font-bold text-[#c9184a]">
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>已消除脾氣：{poppedCount} / 15 個</span>
          </div>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>用時：{seconds} 秒</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-[340px] h-2.5 bg-pink-100 rounded-full overflow-hidden mb-3 border border-pink-200">
        <div
          className="h-full bg-gradient-to-r from-rose-400 via-pink-500 to-[#c9184a] transition-all duration-200"
          style={{ width: `${Math.min(100, (poppedCount / 15) * 100)}%` }}
        />
      </div>

      {/* Bubble Play Arena */}
      <div
        ref={areaRef}
        className="w-full max-w-[340px] h-[360px] bg-gradient-to-b from-[#fff5f7] to-[#ffeef2] rounded-2xl border-2 border-dashed border-pink-300 relative overflow-hidden select-none shadow-inner mb-3"
      >
        {/* Soft watermark avatars */}
        <div className="absolute inset-0 flex items-center justify-center gap-8 opacity-15 pointer-events-none">
          <DuduAvatar size={90} expression="pout" />
          <BubuAvatar size={90} expression="open" />
        </div>

        {/* Floating Grumpy Bubbles */}
        {!showBigHeart &&
          bubbles
            .filter((b) => !b.isPopped)
            .map((b) => (
              <button
                key={b.id}
                onClick={() => handleBubbleClick(b)}
                style={{
                  left: `${b.x}px`,
                  top: `${b.y}px`,
                }}
                className="absolute flex flex-col items-center justify-center bg-[#2d2226] text-white rounded-full w-14 h-14 shadow-lg hover:scale-110 active:scale-90 transition-transform cursor-pointer animate-float duration-300 border-2 border-rose-300/40"
                aria-label={`消滅氣泡：${b.grumpText}`}
              >
                <span className="text-xl leading-none">{b.emoji}</span>
                <span className="text-[9px] font-bold text-rose-200 tracking-tighter truncate max-w-[48px]">
                  {b.grumpText}
                </span>
              </button>
            ))}

        {/* Floating Sweet Text Popup */}
        {sweetPopups.map((popup) => (
          <div
            key={popup.id}
            style={{
              left: `${popup.x}px`,
              top: `${popup.y - 12}px`,
            }}
            className="absolute pointer-events-none text-xs font-bold text-[#c9184a] bg-white/95 px-2.5 py-1 rounded-xl shadow-md border border-pink-200 animate-sweetRise whitespace-nowrap z-20"
          >
            {popup.text}
          </div>
        ))}

        {/* Big Heart of Reconciliation upon 15/15 clear */}
        {showBigHeart && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs animate-fadeIn z-30 p-4">
            {/* Cute Couple Avatars approaching each other */}
            <div className="flex items-center gap-3 mb-2 animate-bounce">
              <DuduAvatar size={48} expression="happy" />
              <span className="text-xl text-[#c9184a]">💕</span>
              <BubuAvatar size={48} expression="happy" />
            </div>

            <div className="text-xs font-bold text-[#c9184a] tracking-wide mb-2 flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              <span>所有小彆扭都化解啦！點擊真心大愛心</span>
              <Sparkles className="w-4 h-4" />
            </div>

            <button
              onClick={handleBigHeartClick}
              className="relative p-4 cursor-pointer hover:scale-115 active:scale-95 transition-all duration-300 group outline-none"
              aria-label="點擊大愛心完成和好"
            >
              <div className="text-7xl sm:text-8xl drop-shadow-xl animate-heartbeat">
                💖
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs bg-[#c9184a] text-white font-bold py-1 px-3 rounded-full shadow-lg">
                  和好抱抱！
                </span>
              </div>
            </button>

            <p className="text-xs text-[#7a5555] font-semibold mt-2">
              ✨ 點擊大愛心，給予最暖的熊熊抱抱 ✨
            </p>
          </div>
        )}
      </div>

      <div className="text-xs text-[#8d6b6b] text-center">
        {showBigHeart
          ? "一二與布布的心結已經解開，就差一個熱情的擁抱！"
          : "看到黑色生氣泡泡就趕緊戳爆它！"}
      </div>
    </div>
  );
};
