import React from 'react';
import { COLORS, ENDING_LINE1_FULL } from '../constants';
import {
  easeLinear,
  easeOutBack,
  easeOutCubic,
  lerp,
  progress,
  seed,
  TimelineState,
} from '../timeline';
import { NeonBot } from './NeonBot';
import { PhonePreview } from './PhonePreview';
import { Arm, Box, Label, Star } from './Primitives';

const RULED_LINES = Array.from({ length: 9 }, (_, i) => i);
const CONFETTI_INDICES = Array.from({ length: 42 }, (_, i) => i);
const CONFETTI_COLORS = [
  COLORS.GOLD,
  COLORS.CYAN,
  COLORS.NEON_VIOLET,
  COLORS.CORAL,
  COLORS.MINT,
];

interface CapabilityPill {
  text: string;
  bg: string;
  rot: number;
  at: number;
  icon: React.ReactNode;
}

const CAPABILITY_PILLS: ReadonlyArray<CapabilityPill> = [
  {
    text: 'XHigh 深度推理',
    bg: '#ece4fc',
    rot: -1.4,
    at: 12.35,
    icon: <Star x={32} y={28} r={12} fill="#8b6be8" opacity={1} stroke={COLORS.INK} />,
  },
  {
    text: 'Agentic 代码重构',
    bg: '#daf5f8',
    rot: 0.9,
    at: 12.55,
    icon: (
      <g
        stroke={COLORS.INK}
        strokeWidth={2.4}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M25 22 L18 28 L25 34" />
        <path d="M39 22 L46 28 L39 34" />
        <path d="M34 19 L30 37" stroke="#2d9fb0" />
      </g>
    ),
  },
  {
    text: '1M 上下文 · 省 60% Token',
    bg: '#fcf1cf',
    rot: -0.8,
    at: 12.75,
    icon: (
      <path
        d="M35 14 L22 30 H32 L29 42 L42 26 H32 Z"
        fill={COLORS.GOLD}
        stroke={COLORS.INK}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    ),
  },
];

/**
 * Grand 1080x1080 Ending (11.65s .. 14.00s).
 */
export const EndingScene: React.FC<{ s: TimelineState }> = ({ s }) => {
  const p = s.ending;
  if (p <= 0) {
    return null;
  }
  const t = s.t;

  // Interpolate Phone smoothly from workspace center -> Hero Right
  const px = lerp(378, 548, p);
  const py = lerp(104, 108, p);
  const pw = lerp(324, 452, p);
  const ph = lerp(496, 692, p);

  // Taped lined paper sticky note (left side)
  const noteIn = progress(t, 11.82, 12.22, easeOutBack);
  const noteOp = progress(t, 11.8, 12.12);
  const line1Text = ENDING_LINE1_FULL.slice(
    0,
    Math.floor(progress(t, 12.02, 12.6, easeLinear) * (ENDING_LINE1_FULL.length + 0.5)),
  );
  const heroOp = progress(t, 12.48, 12.82);
  const underlineP = progress(t, 12.72, 13.18, easeOutCubic);
  const signOp = progress(t, 13.05, 13.38);

  const confOp = progress(t, 11.8, 12.15);
  const waveX = 934 + Math.sin(t * 14) * 9;
  const waveY = 842 + Math.cos(t * 14) * 5;

  return (
    <g>
      {/* Hero enlarged Phone */}
      <PhonePreview s={s} x={px} y={py} w={pw} h={ph} final={p > 0.45} />

      {/* Taped Lined Paper Sticky Note */}
      <g
        opacity={+noteOp.toFixed(3)}
        transform={`translate(${lerp(-58, 0, noteIn).toFixed(1)} 0) rotate(-1.8 276 418)`}
      >
        <Box x={48} y={184} w={456} h={462} r={12} fill="#fffefa" sw={2.4} />
        {RULED_LINES.map((i) => (
          <path key={i} d={`M68 ${256 + i * 44} H482`} stroke="#e7e3da" strokeWidth={1.2} />
        ))}
        {/* Translucent gold masking tape */}
        <path d="M214 172 H342 L340 202 H212Z" fill={COLORS.GOLD} opacity={0.78} />
        <path d="M220 176 H334" stroke="#deb74b" opacity={0.65} strokeWidth={2.2} />

        <Label x={76} y={276} text={line1Text} size={37} fill="#5d5e57" weight={700} />
        <g opacity={+heroOp.toFixed(3)}>
          <Label
            x={76}
            y={372}
            text="Gemini 4"
            size={70}
            fill="#232421"
            weight={700}
            fontStyle="italic"
          />
          <Label
            x={78}
            y={462}
            text="Neon"
            size={84}
            fill="#2a5ad7"
            weight={700}
            fontStyle="italic"
          />
          {/* Sweeping hand-drawn double neon/coral underline */}
          <path
            d="M74 484 Q240 462 452 478"
            fill="none"
            stroke={COLORS.CORAL}
            strokeWidth={6.5}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={+(1 - underlineP).toFixed(3)}
          />
          <path
            d="M90 496 Q256 476 436 490"
            fill="none"
            stroke={COLORS.CYAN}
            strokeWidth={4.2}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={+(1 - underlineP).toFixed(3)}
          />
        </g>
        <g opacity={+signOp.toFixed(3)}>
          <Label x={226} y={598} text="— 小霓 收工" size={34} fill="#717268" weight={700} />
          <Star x={450} y={585} r={15} fill={COLORS.GOLD} />
        </g>
      </g>

      {/* Bottom-left 3 Capability Pills */}
      {CAPABILITY_PILLS.map((pl, i) => {
        const u = progress(t, pl.at, pl.at + 0.3, easeOutBack);
        const op = progress(t, pl.at, pl.at + 0.2);
        if (op <= 0) {
          return null;
        }
        return (
          <g
            key={pl.text}
            opacity={+op.toFixed(3)}
            transform={`translate(56 ${(694 + i * 74 + (1 - u) * 26).toFixed(1)}) rotate(${pl.rot} 220 28)`}
          >
            <Box x={0} y={0} w={438} h={56} r={14} fill={pl.bg} sw={2.2} />
            {pl.icon}
            <Label x={58} y={36} text={pl.text} size={24} fill={COLORS.INK} weight={700} />
          </g>
        );
      })}

      {/* Bottom-right Celebrating Mascot */}
      <g opacity={+p.toFixed(3)}>
        {t > 12.15 && <Arm x1={824} y1={922} x2={waveX} y2={waveY} bend={22} />}
        <NeonBot
          x={706}
          y={874}
          s={1.34}
          t={t}
          glasses
          mood={t > 12.7 ? 'wink' : 'happy'}
        />
        {t > 12.15 && (
          <>
            <Star
              x={waveX + 26}
              y={waveY - 12}
              r={11.5 + 2.5 * Math.sin(t * 10)}
              fill={COLORS.GOLD}
            />
            <Star x={waveX - 6} y={waveY - 28} r={6.5} fill={COLORS.CYAN} />
          </>
        )}
      </g>

      {/* Confetti Shower */}
      <g opacity={+confOp.toFixed(3)}>
        {CONFETTI_INDICES.map((i) => {
          const cx = 36 + seed(i + 800) * 1008;
          const cy =
            (((t - 11.65) * (65 + seed(i + 500) * 95) + seed(i + 710) * 980) % 1120) - 30;
          const cw = 6 + seed(i + 30) * 7;
          const rot = t * 90 + i * 29;
          return (
            <rect
              key={i}
              x={+cx.toFixed(1)}
              y={+cy.toFixed(1)}
              width={+cw.toFixed(1)}
              height={5.5}
              rx={1}
              transform={`rotate(${rot.toFixed(1)} ${cx.toFixed(1)} ${cy.toFixed(1)})`}
              fill={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
              stroke={COLORS.INK}
              strokeWidth={0.8}
            />
          );
        })}
      </g>
    </g>
  );
};
