import React from 'react';
import { COLORS } from '../constants';
import { FONT_FAMILY } from '../fonts';

export interface LabelProps {
  x: number;
  y: number;
  text: string;
  size?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  weight?: number;
  stroke?: string;
  strokeWidth?: number;
  strokeLinejoin?: 'miter' | 'round' | 'bevel';
  paintOrder?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique';
  opacity?: number;
}

export const Label: React.FC<LabelProps> = ({
  x,
  y,
  text,
  size = 18,
  fill = COLORS.INK,
  anchor = 'start',
  weight = 400,
  stroke,
  strokeWidth,
  strokeLinejoin,
  paintOrder,
  fontStyle,
  opacity,
}) => (
  <text
    x={x}
    y={y}
    fill={fill}
    fontFamily={FONT_FAMILY}
    fontSize={size}
    fontWeight={weight}
    fontStyle={fontStyle}
    textAnchor={anchor}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinejoin={strokeLinejoin}
    paintOrder={paintOrder}
    opacity={opacity}
  >
    {text}
  </text>
);

export interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  fill?: string;
  stroke?: string;
  sw?: number;
  opacity?: number;
}

export const Box: React.FC<BoxProps> = ({
  x,
  y,
  w,
  h,
  r = 9,
  fill = COLORS.PAPER,
  stroke = COLORS.INK,
  sw = 2.3,
  opacity = 1,
}) => {
  const sketchPath = `M ${(x + r + 3).toFixed(1)} ${(y + 1.5).toFixed(1)} Q ${(x + w * 0.52).toFixed(1)} ${(y - 1.1).toFixed(1)} ${(x + w - r).toFixed(1)} ${(y + 1.1).toFixed(1)} M ${(x + 1.1).toFixed(1)} ${(y + r).toFixed(1)} Q ${(x - 1.0).toFixed(1)} ${(y + h * 0.58).toFixed(1)} ${(x + 1.8).toFixed(1)} ${(y + h - r).toFixed(1)}`;
  return (
    <g opacity={opacity}>
      <rect
        x={+(x + 1.8).toFixed(1)}
        y={+(y + 1.6).toFixed(1)}
        width={+w.toFixed(1)}
        height={+h.toFixed(1)}
        rx={r}
        fill={stroke}
        opacity={0.09}
      />
      <rect
        x={+x.toFixed(1)}
        y={+y.toFixed(1)}
        width={+w.toFixed(1)}
        height={+h.toFixed(1)}
        rx={r}
        fill={fill}
        stroke={stroke}
        strokeWidth={sw}
      />
      <path
        d={sketchPath}
        fill="none"
        stroke={stroke}
        strokeWidth={0.6}
        opacity={0.36}
      />
    </g>
  );
};

export interface StarProps {
  x: number;
  y: number;
  r?: number;
  fill?: string;
  opacity?: number;
  stroke?: string;
}

export const Star: React.FC<StarProps> = ({
  x,
  y,
  r = 8,
  fill = '#fff7d2',
  opacity = 1,
  stroke = COLORS.INK,
}) => {
  if (r <= 0) {
    return null;
  }
  const d = `M${x} ${y - r} Q${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y} Q${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r} Q${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y} Q${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r}Z`;
  return (
    <path
      d={d}
      fill={fill}
      stroke={stroke}
      strokeWidth={+Math.max(1, r * 0.14).toFixed(2)}
      opacity={opacity}
    />
  );
};

export interface HeartProps {
  x: number;
  y: number;
  s?: number;
  fill?: string;
}

export const Heart: React.FC<HeartProps> = ({
  x,
  y,
  s = 1,
  fill = '#ee8ea8',
}) => (
  <path
    transform={`translate(${x} ${y}) scale(${s})`}
    d="M0 5 C-17 -7 -13 -20 -5 -19 C-1 -19 0 -13 0 -13 C1 -22 16 -23 13 -9 C11 -2 5 3 0 8Z"
    fill={fill}
    stroke={COLORS.INK}
    strokeWidth={2.2}
  />
);

export interface StickerProps {
  x: number;
  y: number;
  text: string;
  size?: number;
  fill?: string;
  rotate?: number;
}

export const Sticker: React.FC<StickerProps> = ({
  x,
  y,
  text,
  size = 32,
  fill = COLORS.GOLD,
  rotate = 0,
}) => (
  <g transform={`rotate(${rotate} ${x} ${y})`}>
    <Label
      x={x + 1.5}
      y={y + 3.5}
      text={text}
      size={size}
      anchor="middle"
      fill={COLORS.INK}
      weight={700}
      stroke={COLORS.INK}
      strokeWidth={8}
      strokeLinejoin="round"
    />
    <Label
      x={x}
      y={y}
      text={text}
      size={size}
      anchor="middle"
      fill={fill}
      weight={700}
      stroke={COLORS.INK}
      strokeWidth={4.4}
      paintOrder="stroke"
      strokeLinejoin="round"
    />
  </g>
);

export interface ArmProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  bend?: number;
}

/** Stretchy rubber-hose arm matching hand-drawn studio aesthetic */
export const Arm: React.FC<ArmProps> = ({ x1, y1, x2, y2, bend = 0 }) => {
  const mx = (x1 + x2) / 2 + bend;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.08;
  const d = `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={COLORS.INK} strokeWidth={13} />
      <path d={d} stroke={COLORS.NEON_BLUE} strokeWidth={8.2} />
      <circle
        cx={+x2.toFixed(1)}
        cy={+y2.toFixed(1)}
        r={7.5}
        fill={COLORS.CYAN}
        stroke={COLORS.INK}
        strokeWidth={2.2}
      />
    </g>
  );
};

export interface TransitionIconProps {
  idx: number;
  x: number;
  y: number;
  s?: number;
}

export const TransitionIcon: React.FC<TransitionIconProps> = ({
  idx,
  x,
  y,
  s = 1,
}) => {
  let body: React.ReactNode;
  if (idx === 0) {
    // Spiral spin
    body = (
      <>
        <path
          d="M9 -16 C-10 -24 -24 1 -10 14 C5 29 26 7 14 -6 C3 -19 -11 -3 -1 6 C8 15 14 0 6 -3"
          fill="none"
          stroke={COLORS.CYAN}
          strokeWidth={8}
        />
        <path
          d="M9 -16 C-10 -24 -24 1 -10 14 C5 29 26 7 14 -6 C3 -19 -11 -3 -1 6 C8 15 14 0 6 -3"
          fill="none"
        />
        <path d="M3 -20 l10 -1 -2 11" fill={COLORS.CYAN} />
      </>
    );
  } else if (idx === 1) {
    // Neon Glitch
    body = (
      <>
        <rect x={-16} y={-12} width={32} height={25} rx={5} fill="#b4a3ee" />
        <path
          d="M-21 -6 v10 m42 -11 v7 M-8 -12 h8 m-3 25 h9"
          stroke={COLORS.CYAN}
          strokeWidth={4.2}
        />
        <path d="M-8 -3 v3 m13 -3 v3 m-10 6 h7" />
      </>
    );
  } else if (idx === 2) {
    // Page flip
    body = (
      <>
        <path d="M-13 -17 L15 -18 L14 17 L-13 16Z" fill="#fffef5" />
        <path d="M-7 -11 H9 M-7 -4 H9 M-7 3 H6 M-7 10 H1" />
        <path d="M14 4 L3 16 L4 5Z" fill="#e4decc" />
      </>
    );
  } else if (idx === 3) {
    // Zoom punch
    body = (
      <>
        <circle cx={-3} cy={-4} r={13} fill="#e2f7fa" />
        <path d="M6 7 l16 16" stroke={COLORS.CORAL} strokeWidth={8.5} />
        <path d="M-3 -10 v12 m-6 -6 h12" />
      </>
    );
  } else if (idx === 4) {
    // Slide beam
    body = (
      <>
        <rect
          x={-12}
          y={-14}
          width={27}
          height={29}
          rx={3}
          fill={COLORS.TEAL}
        />
        <path
          d="M-1 -7 l8 8 -8 7"
          fill="none"
          stroke="#fff"
          strokeWidth={4}
        />
        <path d="M-25 -9 h8 m-10 8 h10 m-8 8 h7" />
      </>
    );
  } else {
    // Star dissolve
    body = <Star x={0} y={0} r={17} fill={COLORS.GOLD} />;
  }

  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      stroke={COLORS.INK}
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {body}
    </g>
  );
};
