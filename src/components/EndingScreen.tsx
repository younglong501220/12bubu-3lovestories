import React, { useRef } from 'react';
import { RotateCcw, Award, Share2, Sparkles, BookHeart } from 'lucide-react';
import { CoupleProfile, GameStats } from '../types/game';
import { sound } from '../utils/audio';
import { fireConfetti } from '../utils/confetti';
import { DuduAvatar, BubuAvatar } from './BubuDuduAvatars';

interface EndingScreenProps {
  couple: CoupleProfile;
  stats: GameStats;
  onReset: () => void;
  onOpenAlbum: () => void;
}

export const EndingScreen: React.FC<EndingScreenProps> = ({
  couple,
  stats,
  onReset,
  onOpenAlbum,
}) => {
  const certificateRef = useRef<HTMLDivElement | null>(null);

  const calculateGrade = () => {
    const totalTime = stats.level1Time + stats.level2Time + stats.level3Time;
    if (totalTime <= 45 && stats.level1Moves <= 14) return 'SSS 級 神仙眷侶';
    if (totalTime <= 70) return 'SS 級 天作之合';
    return 'S 級 甜蜜伴侶';
  };

  const handleShare = () => {
    sound.playCatchHeart();
    fireConfetti(35);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `🎉 我們在《${couple.character1Name}和${couple.character2Name}的戀愛冒險三部曲》中通關了！獲得了【${calculateGrade()}】認證～一二與布布和好啦！💖`
      );
      alert('已複製甜蜜通關戰績到剪貼簿，可以分享給另一半囉！💕');
    }
  };

  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto w-full animate-fadeIn pb-6">
      {/* Editorial Chapter Indicator */}
      <div className="text-xs uppercase tracking-wider text-[#c9184a] font-semibold mb-2 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        <span>世紀大和好·完美大結局</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#c9184a] tracking-tight mb-2 text-balance">
        {couple.character1Name}和{couple.character2Name}和好成功！
      </h1>

      <p className="text-xs sm:text-sm text-[#7a5555] leading-relaxed max-w-md mb-5">
        在你的默契協助下，所有小彆扭與小脾氣全都被暖暖化解啦！
        <br />
        小熊貓一二和小棕熊布布緊緊抱在一起，今天也是無比甜蜜幸福的一天～✨
      </p>

      {/* Hero Victory Image featuring the authentic Bubu & Dudu Hug */}
      <div className="w-full max-w-sm rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-pink-200/50 mb-6 bg-gradient-to-b from-pink-100 to-rose-50 relative group">
        <img
          src="/src/assets/images/bubu_dudu_hug_1790497172545.jpg"
          alt="一二和布布溫馨擁抱"
          referrerPolicy="no-referrer"
          className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 text-white text-left">
          <div className="text-xs font-semibold text-pink-200">世紀大和好留影</div>
          <div className="text-base font-bold">
            「不管有什麼小脾氣，只要一個大大的抱抱就好啦！」
          </div>
        </div>
      </div>

      {/* Official Love Certificate */}
      <div
        ref={certificateRef}
        className="w-full max-w-sm bg-white/95 rounded-2xl p-5 border-2 border-pink-300 shadow-md mb-6 text-left relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3 border-b border-pink-100 pb-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#c9184a]" />
            <h2 className="text-base font-bold text-[#c9184a]">
              戀愛冒險·和好特級認證書
            </h2>
          </div>
          <div className="flex items-center gap-1">
            <DuduAvatar size={24} expression="happy" />
            <BubuAvatar size={24} expression="happy" />
          </div>
        </div>

        <div className="space-y-2 text-xs text-[#7a5555]">
          <div className="flex justify-between border-b border-pink-100 pb-1.5">
            <span className="text-[#8d6b6b]">認證眷侶</span>
            <span className="font-bold text-[#c9184a]">
              {couple.character1Name}（Dudu 🐼）× {couple.character2Name}（Bubu 🐻）
            </span>
          </div>

          <div className="flex justify-between border-b border-pink-100 pb-1.5 tabular-nums">
            <span className="text-[#8d6b6b]">第一關·信物翻牌</span>
            <span className="font-medium text-[#592929]">
              {stats.level1Moves} 步完成（{stats.level1Time} 秒）
            </span>
          </div>

          <div className="flex justify-between border-b border-pink-100 pb-1.5 tabular-nums">
            <span className="text-[#8d6b6b]">第二關·心意接籃</span>
            <span className="font-medium text-[#592929]">
              滿分 100 能量（{stats.level2Time} 秒）
            </span>
          </div>

          <div className="flex justify-between border-b border-pink-100 pb-1.5 tabular-nums">
            <span className="text-[#8d6b6b]">第三關·消滅脾氣</span>
            <span className="font-medium text-[#592929]">
              擊碎 15 個脾氣泡泡（{stats.level3Time} 秒）
            </span>
          </div>

          <div className="flex justify-between pt-1 font-bold text-sm">
            <span className="text-[#c9184a]">默契總評</span>
            <span className="text-[#c9184a] flex items-center gap-1">
              <Sparkles className="w-4 h-4 fill-pink-300" />
              <span>{calculateGrade()}</span>
            </span>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-pink-200 text-center text-[11px] text-[#8d6b6b]">
          特此頒發本證書，願兩位心意相通、歲歲常歡愉、年年皆勝意！✨
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
        <button
          onClick={onReset}
          className="w-full sm:w-auto flex-1 py-3 px-6 bg-gradient-to-r from-[#ff758f] to-[#ff4d6d] text-white font-bold rounded-2xl shadow-lg shadow-pink-400/30 hover:shadow-pink-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>再玩一次</span>
        </button>

        <button
          onClick={handleShare}
          className="w-full sm:w-auto py-3 px-4 bg-white/90 hover:bg-white text-[#c9184a] font-semibold text-xs rounded-2xl border border-pink-200 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>分享證書</span>
        </button>

        <button
          onClick={onOpenAlbum}
          className="w-full sm:w-auto py-3 px-4 bg-white/90 hover:bg-white text-[#7a5555] hover:text-[#c9184a] font-semibold text-xs rounded-2xl border border-pink-200 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <BookHeart className="w-3.5 h-3.5" />
          <span>回憶相簿</span>
        </button>
      </div>
    </div>
  );
};
