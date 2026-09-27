import React from 'react';
import { Heart, Sparkles, BookHeart, UserPen, Play } from 'lucide-react';
import { CoupleProfile } from '../types/game';
import { DuduAvatar, BubuAvatar } from './BubuDuduAvatars';

interface TitleMenuProps {
  couple: CoupleProfile;
  onStartGame: () => void;
  onOpenAlbum: () => void;
  onOpenSettings: () => void;
}

export const TitleMenu: React.FC<TitleMenuProps> = ({
  couple,
  onStartGame,
  onOpenAlbum,
  onOpenSettings,
}) => {
  return (
    <div className="flex flex-col items-center text-center max-w-lg mx-auto w-full">
      {/* Editorial Chapter Indicator (No pill) */}
      <div className="text-xs uppercase tracking-wider text-[#c9184a] font-semibold mb-2 flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        <span>一二 ＆ 布布·甜蜜日常戀愛互動小品</span>
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#c9184a] tracking-tight mb-3 text-balance">
        {couple.character1Name}和{couple.character2Name}的戀愛冒險三部曲
      </h1>

      <p className="text-sm text-[#7a5555] leading-relaxed max-w-md mb-6">
        今天{couple.character1Name}和{couple.character2Name}又鬧了點可愛的小彆扭～
        <br />
        一個氣鼓鼓嘟著嘴想吃洋芋片喝珍奶，一個著急地拿著零食想哄伴侶開心！
        <br />
        快來完成 3 道默契關卡，收集心意、化解怒氣，幫他們重新緊緊擁抱在一起吧！
      </p>

      {/* Hero Illustration Card featuring Bubu & Dudu */}
      <div className="w-full max-w-sm rounded-3xl overflow-hidden border-4 border-white shadow-xl shadow-pink-200/50 mb-6 bg-gradient-to-b from-pink-100 to-rose-50 relative group">
        <img
          src="/src/assets/images/bubu_dudu_cover_1790497156600.jpg"
          alt="一二和布布甜蜜下午茶"
          referrerPolicy="no-referrer"
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-white text-left">
          <div className="text-xs font-medium opacity-90">經典造型·布布與一二</div>
          <div className="text-sm font-bold flex items-center gap-1">
            <span>{couple.character1Name} (Dudu)</span>
            <span>❤️</span>
            <span>{couple.character2Name} (Bubu)</span>
          </div>
        </div>
      </div>

      {/* Characters Showcase with faithful SVGs */}
      <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-6">
        <div className="bg-white/90 p-3.5 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center mb-1">
            <DuduAvatar size={60} expression="tongue" />
          </div>
          <div className="font-bold text-sm text-[#c9184a]">{couple.character1Name}</div>
          <div className="text-[11px] text-[#8d6b6b] mt-1 leading-snug">
            圓滾白熊貓 · 黑耳朵粉腮紅
            <br />
            俏皮吐舌，最愛珍珠奶茶與洋芋片
          </div>
        </div>

        <div className="bg-white/90 p-3.5 rounded-2xl border-2 border-pink-200 shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center mb-1">
            <BubuAvatar size={60} expression="smile" />
          </div>
          <div className="font-bold text-sm text-[#c9184a]">{couple.character2Name}</div>
          <div className="text-[11px] text-[#8d6b6b] mt-1 leading-snug">
            暖心小棕熊 · 蜜桃色大腮紅
            <br />
            溫柔寵溺，總是隨時投餵滿滿點心
          </div>
        </div>
      </div>

      {/* Three Chapters Preview */}
      <div className="w-full max-w-sm bg-white/70 rounded-2xl p-3.5 border border-pink-100 mb-6 text-left text-xs text-[#7a5555] space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#c9184a]">第一部</span>
          <span>·</span>
          <span>心有靈犀翻牌：找出 8 對戀愛專屬紀念信物（珍奶、洋芋片、小橘貓等）</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#c9184a]">第二部</span>
          <span>·</span>
          <span>接住滿滿的愛：操控布布接取 100 點一二投出的零食與愛心能量</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#c9184a]">第三部</span>
          <span>·</span>
          <span>消滅小脾氣：消滅 15 個嘟嘴生氣泡泡，喚醒真心大愛心抱抱</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
        <button
          onClick={onStartGame}
          className="w-full sm:w-auto flex-1 py-3 px-6 bg-gradient-to-r from-[#ff758f] to-[#ff4d6d] text-white font-bold rounded-2xl shadow-lg shadow-pink-400/30 hover:shadow-pink-400/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 text-base"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>開始戀愛冒險</span>
          <Play className="w-3.5 h-3.5 fill-white" />
        </button>

        <button
          onClick={onOpenSettings}
          className="w-full sm:w-auto py-3 px-4 bg-white/80 hover:bg-white text-[#7a5555] hover:text-[#c9184a] font-semibold text-xs rounded-2xl border border-pink-200 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <UserPen className="w-3.5 h-3.5" />
          <span>自訂暱稱</span>
        </button>

        <button
          onClick={onOpenAlbum}
          className="w-full sm:w-auto py-3 px-4 bg-white/80 hover:bg-white text-[#7a5555] hover:text-[#c9184a] font-semibold text-xs rounded-2xl border border-pink-200 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
        >
          <BookHeart className="w-3.5 h-3.5" />
          <span>回憶相簿</span>
        </button>
      </div>
    </div>
  );
};
