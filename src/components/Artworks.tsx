import React from 'react';
import { ArtKind, BPM, COLORS } from '../constants';
import { seed } from '../timeline';
import { NeonBot } from './NeonBot';
import { Heart, Label, Star } from './Primitives';

const CODE_LINES: ReadonlyArray<{
  y: number;
  w: number;
  c: string;
  indent: number;
  strike?: boolean;
  plus?: boolean;
}> = [
  { y: 58, w: 68, c: '#79c0ff', indent: 0 },
  { y: 74, w: 112, c: '#c8b6ff', indent: 12 },
  { y: 90, w: 94, c: '#f2cf65', indent: 12 },
  { y: 108, w: 126, c: '#e57c73', indent: 22, strike: true },
  { y: 126, w: 132, c: '#66e3b8', indent: 22, plus: true },
  { y: 144, w: 118, c: '#66e3b8', indent: 22, plus: true },
  { y: 162, w: 84, c: '#79c0ff', indent: 12 },
  { y: 178, w: 104, c: '#56e0f0', indent: 12 },
  { y: 196, w: 60, c: '#c8b6ff', indent: 0 },
];

export const ArtCode: React.FC<{ t: number; small?: boolean }> = ({
  t,
  small = false,
}) => {
  const scanY = 58 + ((t * 48) % 168);
  return (
    <>
      <rect width={200} height={300} fill="url(#art-code-bg)" />
      {!small &&
        Array.from({ length: 10 }, (_, i) => (
          <path
            key={i}
            d={`M0 ${i * 32} H200 M${i * 22} 0 V300`}
            stroke="#4f6799"
            strokeWidth={0.6}
            opacity={0.18}
          />
        ))}
      {/* Hand-drawn IDE Window inside phone */}
      <rect
        x={14}
        y={28}
        width={172}
        height={196}
        rx={12}
        fill="#1e2238"
        stroke={COLORS.INK}
        strokeWidth={2.5}
      />
      <rect
        x={14}
        y={28}
        width={172}
        height={22}
        rx={10}
        fill="#2d3354"
        stroke={COLORS.INK}
        strokeWidth={2}
      />
      <circle cx={26} cy={39} r={3} fill="#e57c73" />
      <circle cx={36} cy={39} r={3} fill={COLORS.GOLD} />
      <circle cx={46} cy={39} r={3} fill={COLORS.MINT} />
      {!small && (
        <Label
          x={108}
          y={42}
          text="agent_refactor.ts"
          size={8.5}
          fill="#b9c6e6"
          anchor="middle"
        />
      )}
      {CODE_LINES.map((ln, i) => {
        const pulse = ln.plus ? 0.78 + 0.22 * Math.sin(t * 7 + i) : 0.92;
        return (
          <React.Fragment key={i}>
            {ln.plus && (
              <rect
                x={20}
                y={ln.y - 8}
                width={160}
                height={14}
                rx={3}
                fill="#32b88c"
                opacity={0.22}
              />
            )}
            {ln.strike && (
              <rect
                x={20}
                y={ln.y - 8}
                width={160}
                height={14}
                rx={3}
                fill="#e06666"
                opacity={0.2}
              />
            )}
            <rect
              x={26 + ln.indent}
              y={ln.y - 4}
              width={ln.w}
              height={6.5}
              rx={3.2}
              fill={ln.c}
              opacity={+pulse.toFixed(2)}
            />
            {ln.plus && !small && (
              <text x={23} y={ln.y + 2} fontSize={9} fill="#6ff2c5" fontWeight={700}>
                +
              </text>
            )}
            {ln.strike && !small && (
              <text x={23} y={ln.y + 2} fontSize={9} fill="#f08982" fontWeight={700}>
                -
              </text>
            )}
          </React.Fragment>
        );
      })}
      {!small && (
        <rect
          x={18}
          y={+scanY.toFixed(1)}
          width={164}
          height={3}
          fill={COLORS.CYAN}
          opacity={0.65}
        />
      )}
      {/* Floating Pass Badge */}
      <g transform={`translate(18 ${238 + Math.sin(t * 5) * 3})`}>
        <rect
          x={0}
          y={0}
          width={164}
          height={38}
          rx={10}
          fill="#e9fbf3"
          stroke={COLORS.INK}
          strokeWidth={2.2}
        />
        <circle
          cx={22}
          cy={19}
          r={10}
          fill={COLORS.MINT}
          stroke={COLORS.INK}
          strokeWidth={1.8}
        />
        <path
          d="M17 19 l4 4 7 -8"
          fill="none"
          stroke={COLORS.INK}
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Label x={40} y={17} text="42 Tests Passed" size={12.5} fill={COLORS.INK} weight={700} />
        <Label x={40} y={31} text="一次重构 · 零报错" size={10.5} fill="#4e7769" />
      </g>
      {!small && (
        <>
          <Star x={174} y={62} r={6} fill={COLORS.GOLD} />
          <Star x={24} y={212} r={5} fill={COLORS.CYAN} />
        </>
      )}
    </>
  );
};

const REASON_NODES: ReadonlyArray<readonly [number, number]> = [
  [44, 72],
  [156, 76],
  [34, 152],
  [166, 148],
  [52, 224],
  [148, 220],
  [100, 52],
  [100, 248],
];

export const ArtReason: React.FC<{ t: number; small?: boolean }> = ({
  t,
  small = false,
}) => {
  const pulse = 1 + 0.08 * Math.sin(t * 6);
  const starCount = small ? 12 : 28;
  return (
    <>
      <rect width={200} height={300} fill="url(#art-reason-bg)" />
      {Array.from({ length: starCount }, (_, i) => (
        <circle
          key={i}
          cx={+(seed(i + 11) * 196).toFixed(1)}
          cy={+(seed(i + 41) * 290).toFixed(1)}
          r={i % 4 === 0 ? 1.6 : 0.8}
          fill="#e8f9ff"
          opacity={+(0.45 + 0.45 * Math.sin(t * 3 + i)).toFixed(2)}
        />
      ))}
      <circle cx={100} cy={148} r={+(58 * pulse).toFixed(1)} fill={COLORS.CYAN} opacity={0.14} />
      <circle
        cx={100}
        cy={148}
        r={+(38 * pulse).toFixed(1)}
        fill={COLORS.NEON_VIOLET}
        opacity={0.22}
      />
      {REASON_NODES.map(([nx, ny], i) => (
        <React.Fragment key={i}>
          <line
            x1={100}
            y1={148}
            x2={nx}
            y2={ny}
            stroke={i % 2 ? COLORS.CYAN : '#d2baff'}
            strokeWidth={1.8}
            strokeDasharray="4 4"
            opacity={0.65}
          />
          <circle
            cx={nx}
            cy={ny}
            r={+(6 + Math.sin(t * 4 + i) * 1.5).toFixed(1)}
            fill={i % 3 === 0 ? COLORS.GOLD : i % 3 === 1 ? COLORS.CYAN : '#d7b8ff'}
            stroke={COLORS.INK}
            strokeWidth={1.7}
          />
        </React.Fragment>
      ))}
      <g
        transform={`translate(100 148) rotate(${(Math.sin(t * 2.2) * 8).toFixed(1)}) scale(${pulse.toFixed(3)})`}
      >
        <path
          d="M0 -42 Q9 -9 42 0 Q9 9 0 42 Q-9 9 -42 0 Q-9 -9 0 -42Z"
          fill="url(#gemini-star-grad)"
          stroke={COLORS.INK}
          strokeWidth={2.6}
        />
        <path
          d="M0 -22 Q5 -5 22 0 Q5 5 0 22 Q-5 5 -22 0 Q-5 -5 0 -22Z"
          fill="#fffdf5"
          opacity={0.88}
        />
      </g>
      {!small && (
        <g transform="translate(26 258)">
          <rect
            width={148}
            height={28}
            rx={14}
            fill="#fffdf4"
            stroke={COLORS.INK}
            strokeWidth={2}
          />
          <Label
            x={74}
            y={19}
            text="XHigh 深度推理"
            size={13}
            fill={COLORS.INK}
            anchor="middle"
            weight={700}
          />
        </g>
      )}
    </>
  );
};

const CONTEXT_DOCS: ReadonlyArray<{
  x: number;
  y: number;
  rot: number;
  c: string;
  tag: string;
}> = [
  { x: 34, y: 76, rot: -6, c: '#fffdf4', tag: 'API' },
  { x: 56, y: 98, rot: 4, c: '#e5f9fb', tag: 'PDF' },
  { x: 42, y: 126, rot: -3, c: '#f2ebff', tag: 'REPO' },
  { x: 52, y: 158, rot: 2, c: '#fff8db', tag: '1M' },
];

export const ArtContext: React.FC<{ t: number; small?: boolean }> = ({
  t,
  small = false,
}) => {
  const beamY = 74 + Math.sin(t * 3.4) * 56 + 56;
  return (
    <>
      <rect width={200} height={300} fill="url(#art-ctx-bg)" />
      {!small &&
        Array.from({ length: 24 }, (_, i) => (
          <circle
            key={i}
            cx={+(seed(i + 71) * 195).toFixed(1)}
            cy={+(seed(i + 91) * 290).toFixed(1)}
            r={2.2}
            fill="#fff"
            opacity={0.45}
          />
        ))}
      <rect x={34} y={24} width={132} height={32} rx={16} fill="#302d27" />
      <Label
        x={100}
        y={45}
        text="1,000,000 Tokens"
        size={13}
        fill={COLORS.CYAN}
        anchor="middle"
        weight={700}
      />
      {CONTEXT_DOCS.map((d, i) => (
        <g
          key={i}
          transform={`translate(${d.x} ${(d.y + Math.sin(t * 3 + i) * 3).toFixed(1)}) rotate(${d.rot} 55 30)`}
        >
          <rect
            x={0}
            y={0}
            width={112}
            height={62}
            rx={8}
            fill={d.c}
            stroke={COLORS.INK}
            strokeWidth={2.2}
          />
          <path
            d="M12 18 H72 M12 30 H96 M12 42 H82"
            stroke={COLORS.INK}
            strokeWidth={2}
            opacity={0.35}
            strokeLinecap="round"
          />
          <rect
            x={74}
            y={8}
            width={30}
            height={15}
            rx={5}
            fill={i === 3 ? COLORS.GOLD : COLORS.CYAN}
            stroke={COLORS.INK}
            strokeWidth={1.3}
          />
          <Label
            x={89}
            y={19}
            text={d.tag}
            size={9.5}
            fill={COLORS.INK}
            anchor="middle"
            weight={700}
          />
        </g>
      ))}
      <rect
        x={16}
        y={+beamY.toFixed(1)}
        width={168}
        height={5}
        rx={2.5}
        fill={COLORS.CYAN}
        opacity={0.9}
      />
      <rect
        x={16}
        y={+(beamY - 8).toFixed(1)}
        width={168}
        height={21}
        fill={COLORS.CYAN}
        opacity={0.18}
      />
      {!small && (
        <>
          <Heart x={168} y={86 + Math.sin(t * 4) * 5} s={0.58} fill="#ee8ea8" />
          <Star x={28} y={224} r={7} fill={COLORS.GOLD} />
        </>
      )}
    </>
  );
};

const STAGE_TILE_COLORS = [
  '#48c9e0',
  '#608ef5',
  '#9c7ef0',
  '#3d4c8c',
  '#57b8c6',
  '#f2cf65',
  '#c880cf',
];

export const ArtNeonStage: React.FC<{
  t: number;
  small?: boolean;
  punch?: number;
  flash?: number;
}> = ({ t, small = false, punch = 0, flash = 0 }) => {
  const beat = t * (BPM / 60) * Math.PI * 2;
  const scaleBounce = 1 + punch * (0.14 + 0.08 * Math.abs(Math.sin(beat * 0.5)));

  const tiles: React.ReactNode[] = [];
  for (let row = 0; row < 6; row++) {
    const y1 = 206 + Math.pow(row / 6, 1.65) * 94;
    const y2 = 206 + Math.pow((row + 1) / 6, 1.65) * 94;
    const w1 = 36 + (y1 - 206) * 2.1;
    const w2 = 36 + (y2 - 206) * 2.1;
    for (let col = 0; col < 8; col++) {
      const c =
        STAGE_TILE_COLORS[(row * 3 + col + Math.floor(t * 4)) % STAGE_TILE_COLORS.length];
      const d = `M${(100 - w1 / 2 + (col * w1) / 8).toFixed(1)} ${y1.toFixed(1)} L${(100 - w1 / 2 + ((col + 1) * w1) / 8).toFixed(1)} ${y1.toFixed(1)} L${(100 - w2 / 2 + ((col + 1) * w2) / 8).toFixed(1)} ${y2.toFixed(1)} L${(100 - w2 / 2 + (col * w2) / 8).toFixed(1)} ${y2.toFixed(1)}Z`;
      tiles.push(
        <path
          key={`${row}-${col}`}
          d={d}
          fill={c}
          opacity={0.88}
          stroke="#222749"
          strokeWidth={0.6}
        />,
      );
    }
  }

  return (
    <>
      <rect width={200} height={300} fill="url(#art-neon-bg)" />
      {/* Sweeping neon spotlights */}
      <g opacity={+(0.18 + flash * 0.16).toFixed(2)}>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            transform={`rotate(${(Math.sin(t * 2.5 + i * 1.4) * 24).toFixed(1)} 100 44)`}
            d={`M100 44 L${-75 + i * 115} 214 L${-25 + i * 115} 214Z`}
            fill={i === 1 ? '#ffe899' : i === 0 ? '#79f2ff' : '#d2b0ff'}
          />
        ))}
      </g>
      {/* Neon perspective floor */}
      <path d="M0 206 H200 V300 H0Z" fill="#1e2447" />
      {tiles}
      {/* Hanging Faceted Gemini Neon Prism */}
      <path d="M100 0 V24" stroke={COLORS.INK} strokeWidth={2.2} />
      <g transform={`translate(100 46) rotate(${(Math.sin(t * 3) * 10).toFixed(1)})`}>
        <circle
          cx={0}
          cy={0}
          r={24}
          fill={COLORS.CYAN}
          opacity={+(0.18 + flash * 0.15).toFixed(2)}
        />
        <path
          d="M0 -22 Q5 -5 22 0 Q5 5 0 22 Q-5 5 -22 0 Q-5 -5 0 -22Z"
          fill="url(#gemini-star-grad)"
          stroke={COLORS.INK}
          strokeWidth={2}
        />
        <Star x={-7} y={-7} r={4.5} fill="#fff" opacity={0.95} stroke={COLORS.INK} />
      </g>
      {/* Dancing Neon Bot on stage */}
      <g
        transform={`translate(100 202) scale(${scaleBounce.toFixed(3)}) translate(-100 -202)`}
      >
        <NeonBot
          x={64}
          y={158}
          s={0.72}
          t={t}
          dance
          mood="happy"
          glasses={flash > 0.65}
        />
      </g>
      {!small &&
        [0, 1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            x={18 + seed(i + 210) * 164}
            y={62 + seed(i + 240) * 195}
            r={3 + (2 + flash * 3.5) * (0.5 + 0.5 * Math.sin(t * 5 + i * 2))}
            fill={i % 2 ? COLORS.GOLD : '#dffbff'}
          />
        ))}
    </>
  );
};

export const ArtworkRenderer: React.FC<{
  kind: ArtKind;
  t: number;
  small?: boolean;
  punch?: number;
  flash?: number;
}> = ({ kind, t, small = false, punch = 0, flash = 0 }) => {
  if (kind === 'code') return <ArtCode t={t} small={small} />;
  if (kind === 'reason') return <ArtReason t={t} small={small} />;
  if (kind === 'context') return <ArtContext t={t} small={small} />;
  return <ArtNeonStage t={t} small={small} punch={punch} flash={flash} />;
};

export const ArtTile: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  kind: ArtKind;
  clipId: string;
}> = ({ x, y, w, h, kind, clipId }) => (
  <g>
    <defs>
      <clipPath id={clipId}>
        <rect x={x} y={y} width={w} height={h} rx={5} />
      </clipPath>
    </defs>
    <g clipPath={`url(#${clipId})`}>
      <svg
        x={x}
        y={y}
        width={w}
        height={h}
        viewBox="0 0 200 300"
        preserveAspectRatio="xMidYMid slice"
      >
        <use href={`#thumb-${kind}`} />
      </svg>
    </g>
  </g>
);
