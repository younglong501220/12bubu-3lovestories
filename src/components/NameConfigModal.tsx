import React, { useState } from 'react';
import { X, Check, RotateCcw, HeartHandshake } from 'lucide-react';
import { CoupleProfile } from '../types/game';

interface NameConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  couple: CoupleProfile;
  onSave: (newCouple: CoupleProfile) => void;
}

export const NameConfigModal: React.FC<NameConfigModalProps> = ({
  isOpen,
  onClose,
  couple,
  onSave,
}) => {
  const [c1Name, setC1Name] = useState(couple.character1Name);
  const [c2Name, setC2Name] = useState(couple.character2Name);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...couple,
      character1Name: c1Name.trim() || '一二',
      character2Name: c2Name.trim() || '布布',
    });
    onClose();
  };

  const handleResetToDefault = () => {
    setC1Name('一二');
    setC2Name('布布');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-pink-200">
        <div className="flex items-center justify-between mb-4 border-b border-pink-100 pb-3">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-5 h-5 text-[#c9184a]" />
            <h3 className="font-bold text-base text-[#c9184a]">自訂專屬情侶暱稱</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-700"
            aria-label="關閉"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-[#7a5555] mb-4 leading-relaxed">
          您可以保留原創角色「一二」與「布布」，或是換成你與另一半的專屬暱稱，進行甜蜜通關！
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#c9184a] mb-1">
              一二（Dudu · 圓滾白熊貓 🐼）
            </label>
            <input
              type="text"
              value={c1Name}
              maxLength={8}
              onChange={(e) => setC1Name(e.target.value)}
              className="w-full px-3 py-2 bg-pink-50/60 border border-pink-200 rounded-xl text-sm text-[#592929] focus:outline-none focus:border-[#ff758f] focus:ring-1 focus:ring-[#ff758f]"
              placeholder="例如：一二、小美、兔兔"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#c9184a] mb-1">
              布布（Bubu · 奶茶色小棕熊 🐻）
            </label>
            <input
              type="text"
              value={c2Name}
              maxLength={8}
              onChange={(e) => setC2Name(e.target.value)}
              className="w-full px-3 py-2 bg-pink-50/60 border border-pink-200 rounded-xl text-sm text-[#592929] focus:outline-none focus:border-[#ff758f] focus:ring-1 focus:ring-[#ff758f]"
              placeholder="例如：布布、阿強、大熊"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleResetToDefault}
              className="text-xs text-[#8d6b6b] hover:text-[#c9184a] flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>恢復預設（一二 & 布布）</span>
            </button>

            <button
              type="submit"
              className="py-2 px-5 bg-gradient-to-r from-[#ff758f] to-[#ff4d6d] text-white font-bold rounded-xl text-xs shadow-sm hover:opacity-90 flex items-center gap-1.5 transition-opacity"
            >
              <Check className="w-3.5 h-3.5" />
              <span>保存暱稱</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
