import React from 'react';
import { seed } from '../timeline';
import { ArtCode, ArtContext, ArtNeonStage, ArtReason } from './Artworks';

const PAPER_GRAIN_DOTS = Array.from({ length: 28 }, (_, i) => ({
  cx: +(seed(i) * 80).toFixed(1),
  cy: +(seed(i + 80) * 80).toFixed(1),
  r: +(0.35 + seed(i + 160) * 0.75).toFixed(2),
}));

/**
 * Static SVG defs: gradients, hatch & paper-grain patterns, and cached thumbnails.
 */
export const SvgDefs: React.FC = () => (
  <defs>
    <linearGradient id="neon-bot-body" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#5d96f7" />
      <stop offset="55%" stopColor="#4fc6e8" />
      <stop offset="100%" stopColor="#7c8ef4" />
    </linearGradient>
    <linearGradient id="neon-bot-leg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#4e83de" />
      <stop offset="100%" stopColor="#697ce0" />
    </linearGradient>
    <linearGradient id="gemini-star-grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#6ff2ff" />
      <stop offset="50%" stopColor="#6e98ff" />
      <stop offset="100%" stopColor="#c693ff" />
    </linearGradient>
    <linearGradient id="gemini-bar-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stopColor="#4ed4e8" />
      <stop offset="50%" stopColor="#6992f5" />
      <stop offset="100%" stopColor="#a884f2" />
    </linearGradient>
    <linearGradient id="art-code-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#283159" />
      <stop offset="100%" stopColor="#495387" />
    </linearGradient>
    <linearGradient id="art-reason-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#272654" />
      <stop offset="60%" stopColor="#4d4487" />
      <stop offset="100%" stopColor="#353c6e" />
    </linearGradient>
    <linearGradient id="art-ctx-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#c6efe7" />
      <stop offset="100%" stopColor="#e8f6d7" />
    </linearGradient>
    <linearGradient id="art-neon-bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#2c3169" />
      <stop offset="58%" stopColor="#6b569e" />
      <stop offset="100%" stopColor="#3a3369" />
    </linearGradient>
    <pattern
      id="hatch"
      width={9}
      height={9}
      patternUnits="userSpaceOnUse"
      patternTransform="rotate(40)"
    >
      <path d="M0 0 V9 M3.5 0 V9" stroke="#302d27" strokeWidth={1} opacity={0.28} />
    </pattern>
    <pattern id="paper-grain" width={80} height={80} patternUnits="userSpaceOnUse">
      {PAPER_GRAIN_DOTS.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r={d.r} fill="#8b7c63" opacity={0.16} />
      ))}
    </pattern>
    <g id="thumb-code">
      <ArtCode t={1} small />
    </g>
    <g id="thumb-reason">
      <ArtReason t={1} small />
    </g>
    <g id="thumb-context">
      <ArtContext t={1} small />
    </g>
    <g id="thumb-neon">
      <ArtNeonStage t={1} small punch={0.4} flash={0.7} />
    </g>
  </defs>
);
