export const COMPOSITION_ID = 'GeminiNeonPromo';
export const VIDEO_WIDTH = 1080;
export const VIDEO_HEIGHT = 1080;
export const FPS = 30;
export const DURATION_IN_FRAMES = 420; // 14.0s @ 30fps
export const BPM = 128;

// Palette: cream paper + charcoal ink + Gemini Neon luminous accents
export const COLORS = {
  INK: '#302d27',
  PAPER: '#f6f3e9',
  TEAL: '#6bc6c2',
  CYAN: '#46d1e6',
  NEON_BLUE: '#5894f5',
  NEON_VIOLET: '#9e84ee',
  GOLD: '#f2cf65',
  CORAL: '#d8735e',
  MINT: '#7ed1b6',
} as const;

export type ArtKind = 'code' | 'reason' | 'context' | 'neon';
export type MascotMood = 'happy' | 'wink' | 'focus' | 'sleep';

export const CAPTION_FULL = 'XHigh 强推理!';
export const ENDING_LINE1_FULL = '14 秒极速搞定，';

export const SIDEBAR_CARDS: ReadonlyArray<{
  kind: ArtKind;
  name: string;
  dur: string;
}> = [
  { kind: 'code', name: '代码重构.ts', dur: '2.2s' },
  { kind: 'reason', name: '深度推理.ai', dur: '3.4s' },
  { kind: 'context', name: '1M上下文.doc', dur: '2.6s' },
  { kind: 'neon', name: 'Neon高能.mp4', dur: '3.8s' },
];
