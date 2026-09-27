import React, { useState, useEffect } from 'react';
import { RotateCcw, ArrowRight, Sparkles, Clock, MoveHorizontal } from 'lucide-react';
import { CoupleProfile } from '../types/game';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';
import { DuduAvatar, BubuAvatar } from './BubuDuduAvatars';

interface CardItem {
  id: number;
  type: string;
  symbol?: string;
  name: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface Level1MemoryProps {
  couple: CoupleProfile;
  onComplete: (stats: { moves: number; time: number }) => void;
  onGoToLevel2: () => void;
}

export const Level1Memory: React.FC<Level1MemoryProps> = ({
  couple,
  onComplete,
  onGoToLevel2,
}) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isCleared, setIsCleared] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Initialize deck matching the uploaded photos
  const initializeCards = () => {
    const rawDeck = [
      { type: 'dudu', name: couple.character1Name },
      { type: 'bubu', name: couple.character2Name },
      { type: 'boba', symbol: '🧋', name: '珍珠奶茶' },
      { type: 'chips', symbol: '🥔', name: '脆洋芋片' },
      { type: 'cake', symbol: '🎂', name: '生日蛋糕' },
      { type: 'cat', symbol: '🐱', name: '流浪小橘' },
      { type: 'bottle', symbol: '🍼', name: '貼心水壺' },
      { type: 'heart', symbol: '💖', name: '甜蜜愛心' },
    ];

    const pairedDeck: CardItem[] = [];
    rawDeck.forEach((item, index) => {
      pairedDeck.push({
        id: index * 2,
        type: item.type,
        symbol: item.symbol,
        name: item.name,
        isFlipped: false,
        isMatched: false,
      });
      pairedDeck.push({
        id: index * 2 + 1,
        type: item.type,
        symbol: item.symbol,
        name: item.name,
        isFlipped: false,
        isMatched: false,
      });
    });

    const shuffled = [...pairedDeck].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMoves(0);
    setMatchedPairs(0);
    setIsLocked(false);
    setIsCleared(false);
    setSeconds(0);
    setIsActive(true);
  };

  useEffect(() => {
    initializeCards();
  }, [couple.character1Name, couple.character2Name]);

  // Timer
  useEffect(() => {
    let interval: number | null = null;
    if (isActive && !isCleared) {
      interval = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval !== null) clearInterval(interval);
    };
  }, [isActive, isCleared]);

  const handleCardClick = (index: number) => {
    if (isLocked) return;
    const card = cards[index];
    if (card.isFlipped || card.isMatched) return;

    sound.playCardFlip();

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      setIsLocked(true);
      const [idx1, idx2] = newFlipped;
      const card1 = newCards[idx1];
      const card2 = newCards[idx2];

      if (card1.type === card2.type) {
        setTimeout(() => {
          sound.playCardMatch();
          newCards[idx1].isMatched = true;
          newCards[idx2].isMatched = true;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);
          const newMatched = matchedPairs + 1;
          setMatchedPairs(newMatched);

          if (newMatched === 8) {
            setIsCleared(true);
            setIsActive(false);
            sound.playLevelClear();
            fireConfetti(40);
            onComplete({ moves: moves + 1, time: seconds });
          }
        }, 350);
      } else {
        setTimeout(() => {
          sound.playCardMismatch();
          newCards[idx1].isFlipped = false;
          newCards[idx2].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
          setIsLocked(false);
        }, 750);
      }
    }
  };

  const renderCardContent = (card: CardItem) => {
    if (card.type === 'dudu') {
      return (
        <div className="flex flex-col items-center justify-center p-0.5">
          <DuduAvatar size={34} expression="tongue" />
          <span className="text-[10px] text-[#7a5555] font-bold mt-0.5 truncate max-w-full">
            {card.name}
          </span>
        </div>
      );
    }
    if (card.type === 'bubu') {
      return (
        <div className="flex flex-col items-center justify-center p-0.5">
          <BubuAvatar size={34} expression="smile" />
          <span className="text-[10px] text-[#7a5555] font-bold mt-0.5 truncate max-w-full">
            {card.name}
          </span>
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center p-1">
        <span className="text-2xl sm:text-3xl leading-none">{card.symbol}</span>
        <span className="text-[10px] text-[#7a5555] font-semibold mt-1 truncate max-w-full">
          {card.name}
        </span>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full relative">
      {/* Header and metadata */}
      <div className="w-full text-center mb-3">
        <h2 className="text-xl font-bold text-[#c9184a] mb-1">第一關：心有靈犀翻牌</h2>
        <p className="text-xs text-[#7a5555]">
          找出 8 對{couple.character1Name}與{couple.character2Name}的日常回憶信物
        </p>

        {/* Tabular Numerals Unboxed Stats */}
        <div className="flex items-center justify-center gap-3 text-xs text-[#7a5555] font-medium mt-2 tabular-nums">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>已配對：{matchedPairs} / 8 對</span>
          </div>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <div className="flex items-center gap-1">
            <MoveHorizontal className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>翻牌：{moves} 次</span>
          </div>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#ff758f]" />
            <span>時間：{seconds} 秒</span>
          </div>
        </div>
      </div>

      {/* 4x4 Grid */}
      <div className="grid grid-cols-4 gap-2.5 w-full max-w-[340px] p-2 bg-pink-100/50 rounded-2xl border border-pink-200 shadow-inner mb-4">
        {cards.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(idx)}
            disabled={card.isMatched || isLocked}
            className={`aspect-square rounded-xl relative transition-all duration-300 select-none transform cursor-pointer ${
              card.isMatched
                ? 'bg-emerald-50 border-2 border-emerald-300 shadow-sm opacity-90 scale-95'
                : card.isFlipped
                ? 'bg-white border-2 border-[#ff758f] shadow-md scale-100'
                : 'bg-gradient-to-br from-[#ffccd5] to-[#ffb3c1] border-2 border-white shadow-sm hover:scale-102 active:scale-95'
            }`}
            style={{
              perspective: '600px',
            }}
            aria-label={card.isFlipped || card.isMatched ? card.name : `翻開第 ${idx + 1} 張卡片`}
          >
            {card.isFlipped || card.isMatched ? (
              <div className="w-full h-full flex flex-col items-center justify-center animate-fadeIn">
                {renderCardContent(card)}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/90 text-xl font-bold">
                🐾
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-between w-full max-w-[340px]">
        <button
          onClick={initializeCards}
          className="py-2 px-3 text-xs text-[#7a5555] hover:text-[#c9184a] bg-white/80 hover:bg-white rounded-xl border border-pink-200 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>重新洗牌</span>
        </button>

        <span className="text-xs text-[#8d6b6b]">
          珍奶、蛋糕、洋芋片與小橘貓
        </span>
      </div>

      {/* Victory Modal */}
      {isCleared && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl z-30 flex flex-col items-center justify-center p-6 text-center animate-fadeIn border-2 border-pink-200 shadow-2xl">
          <div className="text-5xl mb-2 animate-bounce">🎉</div>
          <h3 className="text-xl font-bold text-[#c9184a] mb-1">心有靈犀！第一關通關</h3>
          <p className="text-xs text-[#7a5555] mb-4 max-w-xs leading-relaxed">
            太棒了！{couple.character1Name}和{couple.character2Name}的共同回憶全都被成功喚醒了！
          </p>

          <div className="bg-pink-50 rounded-xl p-3 w-full max-w-xs mb-5 text-xs text-[#7a5555] flex justify-around tabular-nums font-semibold">
            <div>
              <div className="text-[#8d6b6b] text-[10px]">翻牌總數</div>
              <div className="text-sm text-[#c9184a]">{moves} 次</div>
            </div>
            <div className="w-px bg-pink-200" />
            <div>
              <div className="text-[#8d6b6b] text-[10px]">耗費時間</div>
              <div className="text-sm text-[#c9184a]">{seconds} 秒</div>
            </div>
            <div className="w-px bg-pink-200" />
            <div>
              <div className="text-[#8d6b6b] text-[10px]">默契評分</div>
              <div className="text-sm text-[#c9184a]">
                {moves <= 14 ? 'SSS 級' : moves <= 18 ? 'SS 級' : 'S 級'}
              </div>
            </div>
          </div>

          <button
            onClick={onGoToLevel2}
            className="w-full max-w-xs py-3 px-6 bg-gradient-to-r from-[#ff758f] to-[#ff4d6d] text-white font-bold rounded-2xl shadow-lg shadow-pink-400/30 hover:shadow-pink-400/50 hover:scale-102 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>進入第二關·接住心意</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
