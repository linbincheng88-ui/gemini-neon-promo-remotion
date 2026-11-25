import React from 'react';
import { COLORS } from '../constants';
import { easeInOutCubic, easeLinear, lerp, progress } from '../timeline';

/**
 * Opening hand-drawn pencil tracing the sidebar border (0.16..1.32s).
 */
export const PencilIntro: React.FC<{ t: number }> = ({ t }) => {
  if (t >= 1.32) {
    return null;
  }
  const draw = progress(t, 0.16, 1.05, easeInOutCubic);
  const px = t < 0.62 ? lerp(42, 292, progress(t, 0.16, 0.62, easeLinear)) : 292;
  const py = t < 0.62 ? 92 : lerp(92, 646, progress(t, 0.62, 1.05, easeLinear));
  const opacity = 1 - progress(t, 1.08, 1.3);

  return (
    <g opacity={+opacity.toFixed(3)}>
      <rect
        x={28}
        y={92}
        width={264}
        height={556}
        rx={12}
        fill="#eee9df"
        opacity={+(draw * 0.72).toFixed(3)}
      />
      <rect
        x={28}
        y={92}
        width={264}
        height={556}
        rx={12}
        fill="none"
        stroke={COLORS.INK}
        strokeWidth={2.7}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={+(1 - draw).toFixed(3)}
      />
      <g transform={`translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(-28) scale(1.35)`}>
        <path
          d="M0 0 h24 v8 H0 l-8 -4Z"
          fill={COLORS.GOLD}
          stroke={COLORS.INK}
          strokeWidth={1.4}
        />
        <path
          d="M20 0 h6 v8 h-6"
          fill="#e28ea1"
          stroke={COLORS.INK}
          strokeWidth={1.3}
        />
        <path d="M-8 4 l3 -1.6 v3.2Z" fill={COLORS.INK} />
      </g>
    </g>
  );
};
