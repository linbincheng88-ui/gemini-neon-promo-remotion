import React from 'react';
import { COLORS } from '../constants';
import { TimelineState } from '../timeline';
import { Box, Label, Star } from './Primitives';

export const SettingsPanel: React.FC<{ s: TimelineState }> = ({ s }) => {
  const thinkLabel = s.thinkVal > 0.82 ? 'XHigh' : s.thinkVal > 0.58 ? 'High' : 'Mid';
  const tokenDelta = Math.round((s.tokenCost - 0.84) * 100); // 0% -> -60%
  const rows = [
    { name: '推理深度', val: s.thinkVal, text: thinkLabel, bar: COLORS.NEON_VIOLET, hi: s.thinkVal > 0.82 },
    { name: '代码准确', val: s.codeAcc, text: `${Math.round(s.codeAcc * 100)}%`, bar: COLORS.TEAL, hi: false },
    { name: 'Token 消耗', val: s.tokenCost, text: tokenDelta < -5 ? `${tokenDelta}%` : '基准', bar: COLORS.MINT, hi: tokenDelta <= -40 },
    { name: '霓虹亮度', val: s.neonGlow, text: `${Math.round(s.neonGlow * 100)}%`, bar: COLORS.CYAN, hi: s.neonGlow > 0.9 },
  ];

  return (
    <g>
      <Box x={788} y={92} w={264} h={556} r={12} fill="#faf7ef" />
      <Label x={808} y={132} text="调参" size={24} weight={700} />
      <Star x={874} y={123} r={9.5} fill={COLORS.GOLD} />
      <Label x={1034} y={131} text="Neon 引擎" size={13} fill="#8f8b7f" anchor="end" />
      <path d="M806 150 H1034" stroke="#b3afa2" strokeWidth={1.2} />
      {rows.map((r, i) => {
        const y = 212 + i * 84;
        const kx = 808 + 222 * r.val;
        return (
          <g key={r.name}>
            <Label x={808} y={y - 22} text={r.name} size={18} weight={700} />
            {r.hi && (
              <rect
                x={974}
                y={y - 40}
                width={60}
                height={24}
                rx={7}
                fill={r.bar}
                opacity={0.26}
              />
            )}
            <Label
              x={1032}
              y={y - 22}
              text={r.text}
              size={16}
              fill={r.hi ? COLORS.INK : '#6f7066'}
              anchor="end"
              weight={r.hi ? 700 : 400}
            />
            <rect
              x={808}
              y={y - 4}
              width={222}
              height={9}
              rx={4.5}
              fill="#e2dfd4"
              stroke={COLORS.INK}
              strokeWidth={1.4}
            />
            <rect
              x={809}
              y={y - 2.5}
              width={+Math.max(8, 220 * r.val).toFixed(1)}
              height={6}
              rx={3}
              fill={r.bar}
            />
            <circle
              cx={+kx.toFixed(1)}
              cy={y + 0.5}
              r={10.5}
              fill="#fffdf6"
              stroke={COLORS.INK}
              strokeWidth={2}
            />
            <circle cx={+kx.toFixed(1)} cy={y + 0.5} r={2.3} fill={r.bar} />
          </g>
        );
      })}
      {/* Bottom Neon Spec Card */}
      <Box x={806} y={526} w={228} h={104} r={10} fill="#f2efe4" sw={1.8} />
      <Star x={828} y={554} r={10} fill={COLORS.CYAN} />
      <Label x={846} y={560} text="Gemini 4 · Neon" size={17} weight={700} />
      <Label x={820} y={586} text="深度推理 × 极速效率" size={14} fill="#6c6b62" />
      <rect
        x={820}
        y={600}
        width={200}
        height={12}
        rx={6}
        fill="#dfdacf"
        stroke={COLORS.INK}
        strokeWidth={1.2}
      />
      <rect
        x={821}
        y={601}
        width={+(198 * (0.45 + 0.55 * s.neonGlow)).toFixed(1)}
        height={10}
        rx={5}
        fill="url(#gemini-bar-grad)"
      />
    </g>
  );
};
