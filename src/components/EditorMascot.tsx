import React from 'react';
import { ArtKind, BPM, COLORS, MascotMood } from '../constants';
import {
  clamp,
  easeLinear,
  easeOutBack,
  lerp,
  progress,
  TimelineState,
} from '../timeline';
import { ArtTile } from './Artworks';
import { NeonBot } from './NeonBot';
import { Arm, Box, Label, Sticker, TransitionIcon } from './Primitives';

const DRAG_KINDS: ReadonlyArray<ArtKind> = ['code', 'reason', 'context', 'neon'];

export const EditorMascot: React.FC<{ s: TimelineState }> = ({ s }) => {
  const t = s.t;
  if (t < 1.35 || s.ending >= 0.99) {
    return null;
  }
  const op = progress(t, 1.35, 1.6) * (1 - s.ending);

  // Mascot position along the desk / timeline rail
  let x = 152;
  let y = 696;
  if (t >= 3.7 && t < 5.55) {
    x = lerp(152, 270, progress(t, 3.7, 4.1));
    y = 702;
  }
  if (t >= 5.55 && t < 7.4) {
    x = lerp(270, 175, progress(t, 5.55, 5.85));
    y = 698;
  }
  if (t >= 7.4 && t < 9.35) {
    x = lerp(175, 628, progress(t, 7.4, 7.72));
    y = 678;
  }
  if (t >= 9.35 && t < 10.72) {
    x = lerp(628, 760, progress(t, 9.35, 10.72, easeLinear));
    y = 700 - 11 * Math.abs(Math.sin(t * (BPM / 60) * Math.PI));
  }
  if (t >= 10.72) {
    x = lerp(760, 825, progress(t, 10.72, 11.05));
    y = 678;
  }

  const sx = x + 66;
  const sy = y + 30;
  let target: [number, number] | null = null;
  let heldNode: React.ReactNode = null;

  // Dragging 4 capability cards (1.52..3.44s)
  if (t >= 1.52 && t < 3.44) {
    const i = clamp(Math.floor((t - 1.52) / 0.48), 0, 3);
    const p = ((t - 1.52) / 0.48) % 1;
    const u = progress(p, 0.25, 0.88);
    const fromX = 98 + (i % 2) * 124;
    const fromY = 218 + Math.floor(i / 2) * 176;
    const toX = 195 + i * 212;
    const toY = 826;
    target = [lerp(fromX, toX, u), lerp(fromY, toY, u)];
    heldNode = (
      <g
        transform={`rotate(${(Math.sin(t * 9) * 8).toFixed(1)} ${target[0].toFixed(1)} ${target[1].toFixed(1)})`}
      >
        <Box
          x={target[0] - 34}
          y={target[1] - 42}
          w={68}
          h={84}
          r={5}
          fill={COLORS.GOLD}
          sw={1.7}
        />
        <ArtTile
          x={target[0] - 32}
          y={target[1] - 40}
          w={64}
          h={80}
          kind={DRAG_KINDS[i]}
          clipId="held-card"
        />
      </g>
    );
  }

  // Scissor snip bloat (4.52..5.08s)
  if (t >= 4.52 && t < 5.08) {
    const u = progress(t, 4.52, 4.82);
    target = [lerp(370, 434, u), lerp(760, 838, u)];
  }

  // Dragging transitions (5.68..6.60s)
  if (t >= 5.68 && t < 6.12) {
    const u = progress(t, 5.75, 6.08);
    target = [lerp(98, 495, u), lerp(208, 828, u)];
    heldNode = (
      <g>
        <circle
          cx={+target[0].toFixed(1)}
          cy={+target[1].toFixed(1)}
          r={20}
          fill="#fffdf4"
          stroke={COLORS.INK}
          strokeWidth={1.9}
        />
        <TransitionIcon idx={0} x={target[0]} y={target[1]} s={0.65} />
      </g>
    );
  } else if (t >= 6.18 && t < 6.6) {
    const u = progress(t, 6.22, 6.55);
    target = [lerp(222, 694, u), lerp(208, 828, u)];
    heldNode = (
      <g>
        <circle
          cx={+target[0].toFixed(1)}
          cy={+target[1].toFixed(1)}
          r={20}
          fill="#fffdf4"
          stroke={COLORS.INK}
          strokeWidth={1.9}
        />
        <TransitionIcon idx={1} x={target[0]} y={target[1]} s={0.65} />
      </g>
    );
  }

  // Dragging 4 right sliders (7.55..9.25s)
  if (t >= 7.55 && t < 8.0) target = [808 + 222 * s.thinkVal, 212];
  else if (t >= 8.0 && t < 8.42) target = [808 + 222 * s.codeAcc, 296];
  else if (t >= 8.42 && t < 8.85) target = [808 + 222 * s.tokenCost, 380];
  else if (t >= 8.85 && t < 9.25) target = [808 + 222 * s.neonGlow, 464];

  // Clicking Export (10.78..11.25s)
  if (t >= 10.78 && t < 11.25) {
    const u = progress(t, 10.78, 10.95);
    target = [lerp(890, 950, u), lerp(300, 54, u)];
  }

  const mood: MascotMood =
    t < 3.6 ? 'wink' : t < 4.5 ? 'sleep' : t < 7.5 ? 'focus' : 'happy';

  return (
    <g opacity={+op.toFixed(3)}>
      {target && (
        <Arm
          x1={sx}
          y1={sy}
          x2={target[0]}
          y2={target[1]}
          bend={target[0] > sx ? 14 : -14}
        />
      )}
      {heldNode}
      {t >= 7.55 && t < 9.25 && target && (
        <circle
          cx={+target[0].toFixed(1)}
          cy={+target[1].toFixed(1)}
          r={15}
          fill="none"
          stroke={COLORS.GOLD}
          strokeWidth={4.2}
          opacity={0.88}
        />
      )}
      <NeonBot
        x={x}
        y={y}
        s={0.86}
        t={t}
        mood={mood}
        glasses={t >= 9.28}
        dance={t >= 9.35 && t < 10.72}
      />

      {/* Speech bubble for bloat gag */}
      {t > 3.85 && t < 4.65 && (
        <g
          transform={`translate(362 728) scale(${progress(t, 3.85, 4.1, easeOutBack).toFixed(3)})`}
        >
          <path
            d="M0 -42 H178 Q188 -42 188 -32 V-10 Q188 0 176 0 H96 L86 13 76 0 H0 Q-10 0 -10 -10 V-32 Q-10 -42 0 -42Z"
            fill="#fffdf5"
            stroke={COLORS.INK}
            strokeWidth={2.2}
          />
          <Label x={89} y={-15} text="太耗 Token zzz" size={19} anchor="middle" weight={700} />
        </g>
      )}

      {/* Comic slash + "咔嚓!" sticker during cut */}
      {t > 4.66 && t < 5.3 && (
        <g>
          <Sticker x={472} y={744} text="咔嚓!" fill="#f29eb6" size={38} rotate={-10} />
          <path
            d="M432 780 Q466 814 432 868 Q448 824 432 780Z"
            fill="#fffceb"
            stroke={COLORS.INK}
            strokeWidth={1.8}
          />
        </g>
      )}

      {/* Green rubber stamp: "省 60% Token" */}
      {t > 5.08 && t < 5.75 && (
        <g
          transform={`translate(620 692) rotate(-10) scale(${progress(t, 5.08, 5.26, easeOutBack).toFixed(3)})`}
        >
          <rect
            x={-86}
            y={-28}
            width={172}
            height={50}
            rx={6}
            fill="#f6f3e9dd"
            stroke="#539e7a"
            strokeWidth={3.5}
          />
          <rect
            x={-80}
            y={-22}
            width={160}
            height={38}
            rx={4}
            fill="none"
            stroke="#539e7a"
            strokeWidth={1.5}
          />
          <Label x={0} y={7} text="省 60% Token" size={23} fill="#3e8965" anchor="middle" weight={700} />
        </g>
      )}

      {/* Beat Drop "卡点!" sticker */}
      {t > 9.45 && t < 10.65 && (
        <g
          transform={`translate(278 732) scale(${progress(t, 9.45, 9.68, easeOutBack).toFixed(3)})`}
        >
          <Sticker x={0} y={0} text="卡点!" fill={COLORS.CYAN} size={42} rotate={-8} />
        </g>
      )}
    </g>
  );
};
