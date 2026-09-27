import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { CoupleProfile } from '../types/game';

interface MemoryAlbumModalProps {
  isOpen: boolean;
  onClose: () => void;
  couple: CoupleProfile;
}

export const MemoryAlbumModal: React.FC<MemoryAlbumModalProps> = ({
  isOpen,
  onClose,
  couple,
}) => {
  if (!isOpen) return null;

  const memories = [
    {
      title: '甜蜜下午茶·投餵洋芋片與珍奶',
      date: '照片回憶錄 · 甜蜜日常',
      image: '/src/assets/images/bubu_dudu_cover_1790497156600.jpg',
      caption: `「${couple.character2Name}（布布）端著藍色碗，一片一片把香脆洋芋片餵進${couple.character1Name}（一二）的嘴裡；一二一邊吸著珍珠奶茶，開心地眼睛瞇成了彎月～」`,
      symbol: '🧋🥔',
    },
    {
      title: '溫暖的慶典·雙層草莓生日蛋糕',
      date: '照片回憶錄 · 紀念日',
      image: '/src/assets/images/bubu_dudu_cake_1790497189009.jpg',
      caption: `「桌上擺著粉紅奶油的草莓雙層蛋糕，上面還有兩隻專屬的小偶人！${couple.character1Name}比著小樹杈手勢，${couple.character2Name}雙手合十祈許年年有今日～」`,
      symbol: '🎂✨',
    },
    {
      title: '世紀大和好·緊緊相擁的熊熊抱抱',
      date: '照片回憶錄 · 永遠相愛',
      image: '/src/assets/images/bubu_dudu_hug_1790497172545.jpg',
      caption: `「小脾氣和生氣泡泡全都戳破消散啦！${couple.character2Name}張開溫暖的雙臂緊緊抱住${couple.character1Name}，『就算生氣也是最愛你，快抱緊我～』」`,
      symbol: '🫂❤️',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-4 border-pink-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-pink-100 flex items-center justify-between bg-pink-50/70">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#c9184a] fill-[#c9184a]" />
            <h3 className="font-bold text-base text-[#c9184a]">
              {couple.character1Name}（Dudu）與{couple.character2Name}（Bubu）的照片相簿
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-pink-100 text-gray-400 hover:text-gray-700 transition-colors"
            aria-label="關閉相簿"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Polaroid List */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-gradient-to-b from-[#fffafb] to-white">
          {memories.map((memo, idx) => (
            <div
              key={idx}
              className="bg-white p-4 rounded-2xl shadow-md border border-pink-200/80 transform hover:-rotate-1 transition-transform"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-3 bg-pink-100 relative group">
                <img
                  src={memo.image}
                  alt={memo.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="flex items-baseline justify-between mb-1">
                <h4 className="font-bold text-sm text-[#c9184a] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>{memo.title}</span>
                </h4>
                <span className="text-[11px] text-[#8d6b6b]">{memo.date}</span>
              </div>

              <p className="text-xs text-[#7a5555] leading-relaxed italic">
                {memo.caption}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-pink-100 bg-pink-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-gradient-to-r from-[#ff758f] to-[#ff4d6d] text-white font-bold rounded-xl text-xs shadow-sm hover:opacity-90 transition-opacity"
          >
            關閉相簿
          </button>
        </div>
      </div>
    </div>
  );
};
