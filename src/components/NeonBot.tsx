import React from 'react';
import { BPM, COLORS, MascotMood } from '../constants';
import { Arm, Star } from './Primitives';

export interface NeonBotProps {
  x?: number;
  y?: number;
  s?: number;
  t?: number;
  mood?: MascotMood;
  dance?: boolean;
  glasses?: boolean;
  rotate?: number;
}

const HATCH_INDICES = Array.from({ length: 12 }, (_, i) => i);

/**
 * Original hand-drawn Gemini Neon Mascot ("小霓 · Neon Bot").
 */
export const NeonBot: React.FC<NeonBotProps> = ({
  x = 0,
  y = 0,
  s = 1,
  t = 0,
  mood = 'happy',
  dance = false,
  glasses = false,
  rotate = 0,
}) => {
  const beat = t * (BPM / 60) * Math.PI * 2;
  const sway = dance ? Math.sin(beat * 0.5) * 7.5 : Math.sin(t * 3.5) * 1.2;
  const hop = dance ? -Math.abs(Math.sin(beat * 0.5)) * 10 : 0;

  let eyes: React.ReactNode;
  if (mood === 'focus') {
    eyes = (
      <path
        d="M27 25 l12 3.5 M61 28.5 l12 -3.5"
        stroke={COLORS.INK}
        strokeWidth={4.2}
        strokeLinecap="round"
      />
    );
  } else if (mood === 'sleep') {
    eyes = (
      <path
        d="M27 29 h11 M62 29 h11"
        stroke={COLORS.INK}
        strokeWidth={3.8}
        strokeLinecap="round"
      />
    );
  } else if (mood === 'happy') {
    eyes = (
      <path
        d="M27 31 Q33 17 40 31 M60 31 Q66 17 73 31"
        fill="none"
        stroke={COLORS.INK}
        strokeWidth={3.5}
        strokeLinecap="round"
      />
    );
  } else {
    // wink
    eyes = (
      <>
        <ellipse cx={33} cy={28} rx={3.5} ry={7.5} fill={COLORS.INK} />
        <circle cx={34} cy={25} r={1.4} fill="#fff" stroke="none" />
        <path
          d="M60 30 Q66 18 73 30"
          fill="none"
          stroke={COLORS.INK}
          strokeWidth={3.4}
          strokeLinecap="round"
        />
      </>
    );
  }

  const showBlush = mood === 'happy' || mood === 'wink';

  return (
    <g
      transform={`translate(${x.toFixed(1)} ${(y + hop).toFixed(1)}) scale(${s}) rotate(${(rotate + sway).toFixed(2)} 50 35)`}
      stroke={COLORS.INK}
      strokeWidth={2.3}
      strokeLinejoin="round"
    >
      {dance && (
        <>
          <Arm x1={4} y1={34} x2={-16} y2={-6 + Math.sin(beat) * 7} bend={-14} />
          <Arm x1={96} y1={34} x2={116} y2={-10 - Math.sin(beat) * 7} bend={14} />
        </>
      )}
      {/* 4 stubby legs */}
      <path
        d="M13 60 L14 85 L23 86 L24 61 M29 61 L30 86 L39 85 L39 61 M63 61 L64 85 L73 86 L74 61 M78 60 L79 84 L88 84 L89 59"
        fill="url(#neon-bot-leg)"
      />
      {!dance && (
        <path
          d="M0 28 H-10 V40 H0 M100 28 H110 V40 H100"
          fill={COLORS.NEON_BLUE}
        />
      )}
      {/* Rounded-prism hand-drawn neon body */}
      <path
        d="M2 8 Q50 -4 98 8 L101 58 Q50 67 -1 58Z"
        fill="url(#neon-bot-body)"
      />
      {/* Top rim highlight */}
      <path
        d="M8 10 Q50 2 92 10"
        fill="none"
        stroke="#baf7ff"
        strokeWidth={2.8}
        opacity={0.85}
        strokeLinecap="round"
      />
      {/* Subtle diagonal hatch shading */}
      {HATCH_INDICES.map((i) => (
        <path
          key={i}
          d={`M${9 + i * 7} 13 l-4 11`}
          opacity={0.16}
          stroke="#c8f4ff"
          strokeWidth={1.2}
        />
      ))}
      {/* Gemini 4-point star emblem on forehead */}
      <Star x={50} y={12} r={8.5} fill="#fff8c9" opacity={0.96} stroke={COLORS.INK} />
      {eyes}
      {showBlush && (
        <>
          <ellipse
            cx={22}
            cy={40}
            rx={8.5}
            ry={4.2}
            fill="#f195b2"
            stroke="none"
            opacity={0.72}
          />
          <ellipse
            cx={78}
            cy={40}
            rx={8.5}
            ry={4.2}
            fill="#f195b2"
            stroke="none"
            opacity={0.72}
          />
        </>
      )}
      {showBlush && (
        <path
          d="M44 41 Q50 47 56 41"
          fill="none"
          stroke={COLORS.INK}
          strokeWidth={2.4}
          strokeLinecap="round"
        />
      )}
      {glasses && (
        <g transform="translate(19 -6) rotate(-4)">
          <path
            d="M0 0 H66 L60 14 H43 L33 5 L24 14 H8Z"
            fill={COLORS.INK}
            stroke={COLORS.INK}
            strokeWidth={1.5}
          />
          <path
            d="M12 3 l-5 7 m10 -7 l-5 7 m34 -7 l-5 7 m10 -7 l-5 7"
            stroke="#9df3ff"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </g>
      )}
    </g>
  );
};
