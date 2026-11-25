import React from 'react';
import { COLORS } from '../constants';
import { easeLinear, progress, TimelineState } from '../timeline';
import { NeonBot } from './NeonBot';
import { Box, Label, Star } from './Primitives';

const TRAFFIC_LIGHTS = ['#de8587', '#edcf77', '#94be99'];

export const Toolbar: React.FC<{ s: TimelineState }> = ({ s }) => {
  const sec = Math.floor(s.frame / s.fps);
  const fr = s.frame % s.fps;
  const tc = `00:00:${String(sec).padStart(2, '0')}:${String(fr).padStart(2, '0')}`;
  const btnFill = s.t < 10.82 ? COLORS.TEAL : s.t < 11.52 ? COLORS.GOLD : '#82d4b4';
  const btnText =
    s.t < 10.82
      ? '↥ 导出'
      : s.t < 11.52
        ? `渲染 ${Math.round(s.exportProgress * 99)}%`
        : '完成 ✓';
  const btnTextColor = s.t < 10.82 ? '#ffffff' : COLORS.INK;
  const finishSparkle =
    s.t >= 11.45 && s.t < 12.1
      ? Math.sin(progress(s.t, 11.45, 12.1, easeLinear) * Math.PI)
      : 0;

  return (
    <g>
      <Box x={28} y={26} w={1024} h={52} r={12} fill="#fcfaf4" />
      {TRAFFIC_LIGHTS.map((c, i) => (
        <circle
          key={i}
          cx={48 + i * 18}
          cy={52}
          r={5.2}
          fill={c}
          stroke={COLORS.INK}
          strokeWidth={1.2}
        />
      ))}
      <NeonBot x={104} y={40} s={0.23} t={s.t} mood="happy" />
      <Label x={140} y={58} text="Gemini_Neon_宣传片_v4.mp4" size={20} weight={700} />
      <Box x={454} y={34} w={156} h={36} r={8} fill="#35332d" sw={2} />
      <Label x={532} y={58} text={tc} size={19} fill="#f7f0e4" anchor="middle" />
      <Label x={626} y={57} text="· 1M 上下文" size={14} fill="#8e8b80" />
      <Box x={742} y={36} w={106} h={32} r={8} fill="#efeadc" sw={1.7} />
      <Label x={795} y={57} text="1080×1080" size={15} anchor="middle" weight={700} />
      <Box x={862} y={34} w={176} h={36} r={9} fill={btnFill} sw={2.1} />
      {s.t >= 10.82 && s.t < 11.52 && (
        <rect
          x={864}
          y={36}
          width={+(172 * s.exportProgress).toFixed(1)}
          height={32}
          rx={7}
          fill={COLORS.MINT}
          opacity={0.55}
        />
      )}
      <Label
        x={950}
        y={58}
        text={btnText}
        size={18}
        fill={btnTextColor}
        anchor="middle"
        weight={700}
      />
      {finishSparkle > 0 && (
        <>
          <Star x={1038} y={34} r={11 * finishSparkle} fill={COLORS.GOLD} />
          <Star x={864} y={70} r={8 * finishSparkle} fill={COLORS.CYAN} />
        </>
      )}
    </g>
  );
};
