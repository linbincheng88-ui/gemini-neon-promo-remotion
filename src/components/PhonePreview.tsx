import React from 'react';
import { COLORS } from '../constants';
import { easeInOutCubic, progress, seed, TimelineState } from '../timeline';
import { ArtworkRenderer } from './Artworks';
import { Box, Heart, Label, Star, Sticker } from './Primitives';

export interface PhonePreviewProps {
  s: TimelineState;
  x?: number;
  y?: number;
  w?: number;
  h?: number;
  final?: boolean;
}

const GLITCH_INDICES = Array.from({ length: 8 }, (_, i) => i);
const FINAL_STARS = Array.from({ length: 6 }, (_, i) => i);

export const PhonePreview: React.FC<PhonePreviewProps> = ({
  s,
  x = 378,
  y = 104,
  w = 324,
  h = 496,
  final = false,
}) => {
  const focusGag = s.t > 3.78 && s.t < 4.82 && !final;
  const spinDeg =
    s.t > 5.88 && s.t < 6.26 && !final
      ? progress(s.t, 5.88, 6.26, easeInOutCubic) * 360
      : 0;
  const glitchOn = s.t > 6.38 && s.t < 6.66 && !final;
  const typedCap = s.captionFull.slice(0, s.captionLen);
  const clipId = final ? 'phone-screen-final' : 'phone-screen-edit';

  const screenFilter = focusGag
    ? 'grayscale(1) blur(2.6px)'
    : s.kind === 'neon'
      ? `saturate(${(0.95 + s.neonGlow * 0.42).toFixed(2)})`
      : undefined;

  return (
    <g
      transform={`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(w / 210).toFixed(4)} ${(h / 314).toFixed(4)})`}
    >
      <Box x={0} y={0} w={210} h={314} r={26} fill="#2a2829" sw={2.8} />
      <rect
        x={5}
        y={4}
        width={200}
        height={305}
        rx={23}
        fill="#373437"
        stroke="#6a6155"
        strokeWidth={1.1}
      />
      <path
        d="M-2 58 v18 M-2 92 v24 M211 76 v36"
        stroke={COLORS.INK}
        strokeWidth={2.7}
        strokeLinecap="round"
      />
      <defs>
        <clipPath id={clipId}>
          <rect x={11} y={11} width={188} height={292} rx={19} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <svg
          x={11}
          y={11}
          width={188}
          height={292}
          viewBox="0 0 200 300"
          preserveAspectRatio="none"
        >
          <g
            style={screenFilter ? { filter: screenFilter } : undefined}
            transform={`rotate(${spinDeg.toFixed(1)} 100 150)`}
          >
            <ArtworkRenderer
              kind={s.kind}
              t={s.t}
              small={false}
              punch={s.punch}
              flash={s.flash}
            />
          </g>
          {glitchOn &&
            GLITCH_INDICES.map((i) => (
              <rect
                key={i}
                x={i % 2 ? 0 : 18}
                y={i * 38}
                width={185}
                height={8 + (i % 3) * 4}
                fill={i % 2 ? COLORS.CYAN : '#e39ed4'}
                opacity={0.62}
              />
            ))}
          {focusGag && (
            <g>
              <path
                d="M30 68 v-16 h20 M170 68 v-16 h-20 M30 168 v16 h20 M170 168 v16 h-20"
                fill="none"
                stroke={COLORS.INK}
                strokeWidth={5.2}
              />
              <path
                d="M30 68 v-16 h20 M170 68 v-16 h-20 M30 168 v16 h20 M170 168 v16 h-20"
                fill="none"
                stroke="#fffef4"
                strokeWidth={3}
              />
              <circle
                cx={100}
                cy={108}
                r={16}
                fill="none"
                stroke="#e2dfd1"
                strokeWidth={4}
                opacity={0.55}
              />
              <path
                d="M100 92 a16 16 0 0 0 -13 25"
                fill="none"
                stroke="#fff"
                strokeWidth={4}
                transform={`rotate(${(s.t * 210).toFixed(1)} 100 108)`}
              />
              <Sticker x={100} y={152} text="冗长思考中.." size={19} fill="#fffdf4" />
            </g>
          )}
          {!final && s.t >= 6.8 && s.t < 9.35 && typedCap && (
            <Sticker x={100} y={232} text={typedCap} size={22} fill={COLORS.GOLD} />
          )}
          {final && (
            <>
              <g fill="#fffcec" stroke={COLORS.INK} strokeWidth={1.2}>
                <circle
                  cx={174}
                  cy={52}
                  r={14}
                  fill={COLORS.NEON_BLUE}
                  stroke="#fff8ea"
                  strokeWidth={2}
                />
                <Star x={174} y={52} r={8} fill="#fff7c4" opacity={1} stroke={COLORS.INK} />
                <circle cx={174} cy={67} r={5} fill="#ec747b" stroke="none" />
                <Heart x={174} y={102} s={0.72} fill="#ee8aa6" />
                <rect x={163} y={138} width={22} height={15} rx={5} fill="#fffdf3" />
                <path d="M168 152 v5 l6 -5" fill="#fffdf3" />
                <path d="M169 145 h1 m4 0 h1 m4 0 h1" strokeWidth={2} />
                <path d="M163 194 q3 -13 15 -15 v-5 l11 9 -11 9 v-5 q-9 -1 -15 7Z" />
              </g>
              <Label
                x={174}
                y={124}
                text={s.t < 13.0 ? '9.8w' : '10.2w'}
                size={10}
                fill="#fff"
                anchor="middle"
                stroke={COLORS.INK}
                strokeWidth={2.2}
                paintOrder="stroke"
              />
              <Label
                x={174}
                y={168}
                text="2333"
                size={10}
                fill="#fff"
                anchor="middle"
                stroke={COLORS.INK}
                strokeWidth={2.2}
                paintOrder="stroke"
              />
              <Label
                x={174}
                y={208}
                text="分享"
                size={10}
                fill="#fff"
                anchor="middle"
                stroke={COLORS.INK}
                strokeWidth={2.2}
                paintOrder="stroke"
              />
              {s.kind === 'neon' && (
                <Sticker x={98} y={126} text="拿捏了!" size={34} fill={COLORS.GOLD} rotate={-5} />
              )}
              {FINAL_STARS.map((i) => (
                <Star
                  key={i}
                  x={14 + seed(i + 860) * 140}
                  y={22 + seed(i + 670) * 232}
                  r={3.5 + seed(i + 860) * 5.5}
                  fill={i % 2 ? COLORS.GOLD : '#c9fbff'}
                  opacity={0.65 + 0.35 * Math.sin(s.t * 6 + i)}
                />
              ))}
              <Label
                x={12}
                y={268}
                text="@Gemini · 4 Neon"
                size={12.5}
                fill="#fff"
                weight={700}
                stroke={COLORS.INK}
                strokeWidth={2.4}
                paintOrder="stroke"
              />
              <Label
                x={12}
                y={286}
                text="#AI编程 #强推理 #极速出片"
                size={10}
                fill="#fff"
                stroke={COLORS.INK}
                strokeWidth={1.8}
                paintOrder="stroke"
              />
            </>
          )}
        </svg>
      </g>
      {/* Dynamic island pill */}
      <rect x={85} y={17} width={40} height={10.5} rx={5.2} fill="#222123" />
      {!final && (
        <g>
          <Label x={74} y={336} text="Ⅰ◀" size={13.5} fill="#7c7e72" anchor="middle" />
          <circle cx={105} cy={331} r={10.5} fill="none" stroke="#7c7e72" strokeWidth={1.5} />
          <Label
            x={105}
            y={336}
            text={s.t > 2.2 ? 'Ⅱ' : '▶'}
            size={13.5}
            fill="#7c7e72"
            anchor="middle"
          />
          <Label x={136} y={336} text="▶Ⅰ" size={13.5} fill="#7c7e72" anchor="middle" />
        </g>
      )}
    </g>
  );
};
