import { Easing, interpolate } from 'remotion';
import { ArtKind, CAPTION_FULL } from './constants';

export const clamp = (v: number, lo = 0, hi = 1): number =>
  Math.max(lo, Math.min(hi, v));

export const lerp = (a: number, b: number, t: number): number =>
  interpolate(t, [0, 1], [a, b]);

export const easeLinear = (x: number): number => x;
export const easeOutCubic = Easing.out(Easing.cubic);
export const easeInOutCubic = Easing.inOut(Easing.cubic);
export const easeOutBack = Easing.out(Easing.back(1.70158));

export const progress = (
  t: number,
  a: number,
  b: number,
  easing: (x: number) => number = easeInOutCubic,
): number =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing,
  });

export const seed = (n: number): number => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453123;
  return x - Math.floor(x);
};

export interface TimelineState {
  t: number;
  frame: number;
  fps: number;
  cut: number;
  tab: 0 | 1 | 2;
  thinkVal: number;
  codeAcc: number;
  tokenCost: number;
  neonGlow: number;
  exportProgress: number;
  ending: number;
  kind: ArtKind;
  captionFull: string;
  captionLen: number;
  playhead: number;
  punch: number;
  flash: number;
}

export interface CameraState {
  zoom: number;
  tx: number;
  ty: number;
}

/**
 * Pure frame-driven timeline state machine (14.0s = 420 frames @ 30fps).
 */
export const stateAt = (frame: number, fps: number): TimelineState => {
  const t = frame / fps;

  // Cut progress (snipping out slow bloat at 4.72..5.22s)
  const cut = progress(t, 4.72, 5.22, easeInOutCubic);

  // Sidebar active tab: 0=素材, 1=特效, 2=字幕
  const tab: 0 | 1 | 2 = t < 5.55 ? 0 : t < 6.72 ? 1 : 2;

  // Right panel sliders (animated 7.55..9.25s)
  const thinkVal = lerp(0.42, 0.96, progress(t, 7.55, 8.0));
  const codeAcc = lerp(0.68, 0.99, progress(t, 8.0, 8.42));
  const tokenCost = lerp(0.84, 0.24, progress(t, 8.42, 8.85)); // slides DOWN to save 60%
  const neonGlow = lerp(0.32, 1.0, progress(t, 8.85, 9.25));

  // Export progress (10.82..11.52s)
  const exportProgress = progress(t, 10.82, 11.52, easeOutCubic);
  // Ending transition (11.65..12.15s)
  const ending = progress(t, 11.65, 12.15, easeInOutCubic);

  // Active artwork in Center Preview Phone
  let kind: ArtKind = 'code';
  if (ending > 0.3) {
    if (t < 12.05) kind = 'code';
    else if (t < 12.35) kind = 'reason';
    else if (t < 12.65) kind = 'context';
    else kind = 'neon';
  } else if (t < 2.25) kind = 'code';
  else if (t < 2.75) kind = 'reason';
  else if (t < 3.25) kind = 'context';
  else if (t < 3.7) kind = 'neon';
  else if (t < 5.55) kind = 'reason';
  else if (t < 6.45) kind = 'context';
  else if (t < 7.45) kind = 'context';
  else kind = 'neon';

  // Typing caption length ("XHigh 强推理!")
  const captionFull = CAPTION_FULL;
  const captionLen =
    t < 6.78
      ? 0
      : Math.min(
          captionFull.length,
          Math.floor(progress(t, 6.78, 7.36, easeLinear) * (captionFull.length + 0.5)),
        );

  // Playhead position along timeline (0..1 visual track progress)
  let playhead = 0.05;
  if (t >= 1.5 && t < 3.7) {
    playhead = lerp(0.05, 0.52, progress(t, 1.5, 3.7, easeLinear));
  } else if (t >= 3.7 && t < 5.55) {
    playhead = lerp(0.34, 0.42, progress(t, 3.7, 5.55, easeLinear));
  } else if (t >= 5.55 && t < 7.45) {
    playhead = lerp(0.44, 0.72, progress(t, 5.55, 7.45, easeLinear));
  } else if (t >= 7.45 && t < 11.65) {
    playhead = lerp(0.72, 0.96, progress(t, 7.45, 11.65, easeLinear));
  } else if (t >= 11.65) {
    playhead = 0.96;
  }

  // Punch & flash intensities for Neon Stage
  const punch = t >= 9.35 ? 1 : progress(t, 8.85, 9.35);
  const flash = neonGlow;

  return {
    t,
    frame,
    fps,
    cut,
    tab,
    thinkVal,
    codeAcc,
    tokenCost,
    neonGlow,
    exportProgress,
    ending,
    kind,
    captionFull,
    captionLen,
    playhead,
    punch,
    flash,
  };
};

// Keyframes: [time, zoom, cx, cy] where (cx, cy) is focal point in 1080x1080 space
const CAMERA_KEYS: ReadonlyArray<readonly [number, number, number, number]> = [
  [0.0, 1.0, 540, 540],
  [1.35, 1.0, 540, 540],
  [1.75, 1.08, 430, 580], // Focus left sidebar + timeline dragging
  [3.55, 1.08, 470, 610],
  [3.95, 1.16, 520, 535], // Zoom into center phone & bloat cut
  [5.35, 1.16, 515, 565],
  [5.75, 1.12, 430, 480], // Left transitions + phone + caption
  [7.2, 1.12, 470, 460],
  [7.6, 1.22, 765, 425], // Pan right to 调参 sliders
  [9.15, 1.22, 755, 445],
  [9.55, 1.09, 560, 600], // Pull back for Beat Drop dance
  [10.6, 1.09, 595, 575],
  [10.95, 1.04, 640, 420], // Pan slightly up-right for Export click
  [11.55, 1.0, 540, 540], // Settle wide for Grand Finale
  [14.0, 1.0, 540, 540],
];

/**
 * Smooth virtual camera pan & zoom clamped inside the 1080x1080 stage.
 */
export const cameraAt = (t: number): CameraState => {
  let k0 = CAMERA_KEYS[0];
  let k1 = CAMERA_KEYS[CAMERA_KEYS.length - 1];
  for (let i = 0; i < CAMERA_KEYS.length - 1; i++) {
    if (t >= CAMERA_KEYS[i][0] && t <= CAMERA_KEYS[i + 1][0]) {
      k0 = CAMERA_KEYS[i];
      k1 = CAMERA_KEYS[i + 1];
      break;
    }
  }
  const u = k1[0] === k0[0] ? 0 : progress(t, k0[0], k1[0], easeInOutCubic);
  const zoom = lerp(k0[1], k1[1], u);
  const cx = lerp(k0[2], k1[2], u);
  const cy = lerp(k0[3], k1[3], u);
  const minT = 1080 - 1080 * zoom;
  const tx = clamp(540 - cx * zoom, minT, 0);
  const ty = clamp(540 - cy * zoom, minT, 0);
  return { zoom, tx, ty };
};
