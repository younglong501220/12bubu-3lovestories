export type GameScreen = 'MENU' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'ENDING';

export interface CoupleProfile {
  character1Name: string; // Default: 一二
  character1Emoji: string; // 🐼🎀
  character1Title: string; // 樂觀小貓熊
  character2Name: string; // Default: 布布
  character2Emoji: string; // 🐻❤️
  character2Title: string; // 溫柔小棕熊
}

export interface GameStats {
  level1Moves: number;
  level1Time: number; // in seconds
  level2Score: number;
  level2Time: number;
  level3Bubbles: number;
  level3Time: number;
  totalTime: number;
}
