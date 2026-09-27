import React, { useRef, useEffect, useState, useCallback } from 'react';
import { ArrowRight, RotateCcw, Heart, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { CoupleProfile } from '../types/game';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';

interface Level2CatcherProps {
  couple: CoupleProfile;
  onComplete: (stats: { score: number; time: number }) => void;
  onGoToLevel3: () => void;
}

interface FallingItem {
  id: number;
  x: number;
  y: number;
  speed: number;
  type: 'heart' | 'boba' | 'chips' | 'cake' | 'bottle';
  symbol: string;
  name: string;
  points: number;
  size: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

export const Level2Catcher: React.FC<Level2CatcherProps> = ({
  couple,
  onComplete,
  onGoToLevel3,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [isCleared, setIsCleared] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [combo, setCombo] = useState(0);

  // Basket properties (Bubu holding a blue snack bowl)
  const basketWidth = 84;
  const basketHeight = 56;
  const basketXRef = useRef(128);
  const scoreRef = useRef(0);
  const isClearedRef = useRef(false);
  const itemsRef = useRef<FallingItem[]>([]);
  const particlesRef = useRef<SparkleParticle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Timer
  useEffect(() => {
    let timer: number | null = null;
    if (!isCleared) {
      timer = window.setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (timer !== null) clearInterval(timer);
    };
  }, [isCleared]);

  const resetGame = useCallback(() => {
    scoreRef.current = 0;
    setScore(0);
    setCombo(0);
    setSeconds(0);
    isClearedRef.current = false;
    setIsCleared(false);
    itemsRef.current = [];
    particlesRef.current = [];
    basketXRef.current = 128;
  }, []);

  // Spawn falling items from the photos (Boba, chips, cake, bottle, hearts)
  const spawnItem = useCallback(() => {
    if (isClearedRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rand = Math.random();
    let type: FallingItem['type'] = 'heart';
    let symbol = '💖';
    let name = '愛心';
    let points = 10;

    if (rand < 0.25) {
      type = 'boba';
      symbol = '🧋';
      name = '珍奶';
      points = 20;
    } else if (rand < 0.45) {
      type = 'chips';
      symbol = '🥔';
      name = '洋芋片';
      points = 15;
    } else if (rand < 0.6) {
      type = 'cake';
      symbol = '🎂';
      name = '蛋糕';
      points = 25;
    } else if (rand < 0.75) {
      type = 'bottle';
      symbol = '🍼';
      name = '水壺';
      points = 15;
    }

    const newItem: FallingItem = {
      id: Date.now() + Math.random(),
      x: Math.random() * (canvas.width - 36) + 6,
      y: -20,
      speed: 2.1 + Math.random() * 1.8,
      type,
      symbol,
      name,
      points,
      size: 26,
    };

    itemsRef.current.push(newItem);
  }, []);

  const createCatchBurst = (x: number, y: number) => {
    const colors = ['#ff758f', '#ffd166', '#ffb076', '#ffffff'];
    for (let i = 0; i < 9; i++) {
      particlesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 4.5,
        vy: (Math.random() - 0.7) * 4.5,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  };

  // Draw authentic Bubu on Canvas
  const drawBubu = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();

    // 1. Bear Ears
    // Left Ear
    ctx.fillStyle = '#a47551';
    ctx.strokeStyle = '#2d221e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x + 16, y + 8, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#835634';
    ctx.beginPath();
    ctx.arc(x + 16, y + 8, 5, 0, Math.PI * 2);
    ctx.fill();

    // Right Ear
    ctx.fillStyle = '#a47551';
    ctx.beginPath();
    ctx.arc(x + basketWidth - 16, y + 8, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#835634';
    ctx.beginPath();
    ctx.arc(x + basketWidth - 16, y + 8, 5, 0, Math.PI * 2);
    ctx.fill();

    // 2. Chubby Head & Upper Body
    ctx.fillStyle = '#cf9f76'; // Signature milk-tea brown
    ctx.strokeStyle = '#2d221e';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.roundRect(x + 6, y + 6, basketWidth - 12, basketHeight - 10, 18);
    ctx.fill();
    ctx.stroke();

    // 3. Signature Peach-Orange Cheeks
    ctx.fillStyle = '#ffb076';
    ctx.beginPath();
    ctx.ellipse(x + 18, y + 26, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(x + basketWidth - 18, y + 26, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 4. Black bead eyes
    ctx.fillStyle = '#2d221e';
    ctx.beginPath();
    ctx.arc(x + 27, y + 22, 3, 0, Math.PI * 2);
    ctx.arc(x + basketWidth - 27, y + 22, 3, 0, Math.PI * 2);
    ctx.fill();

    // Highlights
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(x + 26, y + 21, 1, 0, Math.PI * 2);
    ctx.arc(x + basketWidth - 28, y + 21, 1, 0, Math.PI * 2);
    ctx.fill();

    // 5. Cute 'w' mouth
    ctx.strokeStyle = '#2d221e';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    const midX = x + basketWidth / 2;
    ctx.arc(midX - 3.5, y + 25, 3.5, 0.1, Math.PI * 0.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(midX + 3.5, y + 25, 3.5, 0.1, Math.PI * 0.9);
    ctx.stroke();

    // 6. Holding the Blue Snack Bowl (from photo 3)
    ctx.fillStyle = '#70a1ff';
    ctx.strokeStyle = '#2d221e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(x + 12, y + 34, basketWidth - 24, 18, [0, 0, 10, 10]);
    ctx.fill();
    ctx.stroke();

    // Tiny bear paws holding the rim
    ctx.fillStyle = '#cf9f76';
    ctx.beginPath();
    ctx.arc(x + 15, y + 36, 4.5, 0, Math.PI * 2);
    ctx.arc(x + basketWidth - 15, y + 36, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let spawnTimer = 0;

    const render = () => {
      // 1. Soft pastel background
      ctx.fillStyle = '#fff7f9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Light grid dots for subtle sweetness
      ctx.fillStyle = '#ffe2eb';
      for (let gx = 15; gx < canvas.width; gx += 30) {
        for (let gy = 15; gy < canvas.height - 50; gy += 30) {
          ctx.beginPath();
          ctx.arc(gx, gy, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Ground shadow
      ctx.fillStyle = '#ffd1dc';
      ctx.beginPath();
      ctx.ellipse(basketXRef.current + basketWidth / 2, canvas.height - 8, basketWidth * 0.45, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Spawn tick
      spawnTimer++;
      if (spawnTimer % 34 === 0) {
        spawnItem();
      }

      // 3. Falling items
      const currentItems = itemsRef.current;
      const basketY = canvas.height - basketHeight - 12;
      const currentBasketX = basketXRef.current;

      for (let i = currentItems.length - 1; i >= 0; i--) {
        const item = currentItems[i];
        item.y += item.speed;

        ctx.font = `${item.size}px "Zen Maru Gothic", sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText(item.symbol, item.x + item.size / 2, item.y + item.size);

        // Catch check
        if (
          item.y + item.size >= basketY + 10 &&
          item.y <= basketY + basketHeight &&
          item.x + item.size >= currentBasketX &&
          item.x <= currentBasketX + basketWidth
        ) {
          sound.playCatchHeart();
          createCatchBurst(item.x + item.size / 2, basketY + 20);

          scoreRef.current += item.points;
          const newScore = Math.min(100, scoreRef.current);
          setScore(newScore);
          setCombo((c) => c + 1);

          currentItems.splice(i, 1);

          if (newScore >= 100 && !isClearedRef.current) {
            isClearedRef.current = true;
            setIsCleared(true);
            sound.playLevelClear();
            fireConfetti(45);
            onComplete({ score: 100, time: seconds });
            return;
          }
          continue;
        }

        if (item.y > canvas.height + 20) {
          currentItems.splice(i, 1);
          setCombo(0);
        }
      }

      // 4. Sparkle Particles
      const currentParticles = particlesRef.current;
      for (let p = currentParticles.length - 1; p >= 0; p--) {
        const particle = currentParticles[p];
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.alpha -= 0.04;

        if (particle.alpha <= 0) {
          currentParticles.splice(p, 1);
        } else {
          ctx.save();
          ctx.globalAlpha = particle.alpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 5. Draw Bubu Catcher
      drawBubu(ctx, currentBasketX, basketY);

      if (!isClearedRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [spawnItem, onComplete, seconds]);

  // Position update helper
  const moveBasketToX = useCallback((clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const rootX = (clientX - rect.left) * scaleX;
    const clampedX = Math.max(0, Math.min(canvas.width - basketWidth, rootX - basketWidth / 2));
    basketXRef.current = clampedX;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const step = 28;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        basketXRef.current = Math.max(0, basketXRef.current - step);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        basketXRef.current = Math.min(canvas.width - basketWidth, basketXRef.current + step);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const moveLeft = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    basketXRef.current = Math.max(0, basketXRef.current - 35);
  };

  const moveRight = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    basketXRef.current = Math.min(canvas.width - basketWidth, basketXRef.current + 35);
  };

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full relative">
      {/* Header and metadata */}
      <div className="w-full text-center mb-2">
        <h2 className="text-xl font-bold text-[#c9184a] mb-1">第二關：接住滿滿的愛</h2>
        <p className="text-xs text-[#7a5555]">
          滑動滑鼠或觸控螢幕，操控小棕熊{couple.character2Name}捧著碗接住珍奶與愛心
        </p>

        {/* Tabular Numerals Unboxed Stats */}
        <div className="flex items-center justify-center gap-3 text-xs text-[#7a5555] font-medium mt-2 tabular-nums">
          <div className="flex items-center gap-1 font-bold text-[#c9184a]">
            <Heart className="w-3.5 h-3.5 fill-[#c9184a]" />
            <span>能量：{score} / 100</span>
          </div>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <div className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>連擊：{combo} 連續</span>
          </div>
          <span aria-hidden="true" className="text-pink-300">·</span>
          <span>用時：{seconds} 秒</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-[340px] h-2.5 bg-pink-100 rounded-full overflow-hidden mb-3 border border-pink-200">
        <div
          className="h-full bg-gradient-to-r from-[#ff758f] via-[#ff4d6d] to-[#c9184a] transition-all duration-200"
          style={{ width: `${Math.min(100, (score / 100) * 100)}%` }}
        />
      </div>

      {/* Canvas Game Area */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-pink-200 shadow-md bg-[#fff8f9] mb-3 touch-none">
        <canvas
          ref={canvasRef}
          width={340}
          height={360}
          className="block w-full max-w-[340px] aspect-[340/360] cursor-grab active:cursor-grabbing"
          onMouseMove={(e) => moveBasketToX(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              moveBasketToX(e.touches[0].clientX);
            }
          }}
        />
      </div>

      {/* Touch Control Buttons */}
      <div className="flex items-center justify-between w-full max-w-[340px] gap-2 mb-2">
        <button
          onClick={moveLeft}
          className="flex-1 py-2.5 bg-white/90 hover:bg-pink-50 active:bg-pink-100 text-[#7a5555] rounded-xl border border-pink-200 flex items-center justify-center gap-1 text-xs font-semibold shadow-sm transition-all"
          aria-label="往左移動"
        >
          <ChevronLeft className="w-4 h-4 text-[#c9184a]" />
          <span>向左移動</span>
        </button>

        <button
          onClick={resetGame}
          className="p-2.5 bg-white/90 hover:bg-pink-50 text-[#7a5555] rounded-xl border border-pink-200 flex items-center justify-center shadow-sm"
          title="重新挑戰"
          aria-label="重新挑戰"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={moveRight}
          className="flex-1 py-2.5 bg-white/90 hover:bg-pink-50 active:bg-pink-100 text-[#7a5555] rounded-xl border border-pink-200 flex items-center justify-center gap-1 text-xs font-semibold shadow-sm transition-all"
          aria-label="往右移動"
        >
          <span>向右移動</span>
          <ChevronRight className="w-4 h-4 text-[#c9184a]" />
        </button>
      </div>

      {/* Item Guide from photos */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-[#8d6b6b] flex-wrap">
        <span>🧋 珍奶 +20</span>
        <span>·</span>
        <span>🥔 洋芋片 +15</span>
        <span>·</span>
        <span>🎂 蛋糕 +25</span>
        <span>·</span>
        <span>💖 愛心 +10</span>
      </div>

      {/* Victory Modal */}
      {isCleared && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl z-30 flex flex-col items-center justify-center p-6 text-center animate-fadeIn border-2 border-pink-200 shadow-2xl">
          <div className="text-5xl mb-2 animate-bounce">💌</div>
          <h3 className="text-xl font-bold text-[#c9184a] mb-1">愛心滿滿！第二關通關</h3>
          <p className="text-xs text-[#7a5555] mb-4 max-w-xs leading-relaxed">
            布布捧著碗接到了所有珍珠奶茶、洋芋片與愛意，滿意度突破 100 分！
          </p>

          <div className="bg-pink-50 rounded-xl p-3 w-full max-w-xs mb-5 text-xs text-[#7a5555] flex justify-around tabular-nums font-semibold">
            <div>
              <div className="text-[#8d6b6b] text-[10px]">愛心能量</div>
              <div className="text-sm text-[#c9184a]">100 滿分</div>
            </div>
            <div className="w-px bg-pink-200" />
            <div>
              <div className="text-[#8d6b6b] text-[10px]">耗費時間</div>
              <div className="text-sm text-[#c9184a]">{seconds} 秒</div>
            </div>
            <div className="w-px bg-pink-200" />
            <div>
              <div className="text-[#8d6b6b] text-[10px]">最高連擊</div>
              <div className="text-sm text-[#c9184a]">{combo} 連擊</div>
            </div>
          </div>

          <button
            onClick={onGoToLevel3}
            className="w-full max-w-xs py-3 px-6 bg-gradient-to-r from-[#ff758f] to-[#ff4d6d] text-white font-bold rounded-2xl shadow-lg shadow-pink-400/30 hover:shadow-pink-400/50 hover:scale-102 transition-all flex items-center justify-center gap-2 text-sm"
          >
            <span>進入第三關·消滅小脾氣</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
