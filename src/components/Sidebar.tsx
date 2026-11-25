import React from 'react';
import { COLORS, SIDEBAR_CARDS } from '../constants';
import { TimelineState } from '../timeline';
import { ArtTile } from './Artworks';
import { Box, Label, Star, Sticker, TransitionIcon } from './Primitives';

const TABS = ['素材', '特效', '字幕'] as const;
const FX_NAMES = ['旋转切', '霓虹故障', '翻页', '缩放冲击', '光束扫过', '星芒溶解'] as const;
const FX_COLORS = ['#d2edf8', '#e5dbf7', '#d8f0e4', '#fae2dc', '#f9ecc2', '#efe9dc'] as const;

export const Sidebar: React.FC<{ s: TimelineState }> = ({ s }) => {
  return (
    <g>
      <Box x={28} y={92} w={264} h={556} r={12} fill="#faf7ef" />
      {TABS.map((w, i) => (
        <g key={w}>
          <Box
            x={42 + i * 81}
            y={106}
            w={74}
            h={32}
            r={7}
            fill={s.tab === i ? COLORS.GOLD : '#efebe0'}
            sw={1.6}
          />
          <Label
            x={79 + i * 81}
            y={128}
            text={w}
            size={17}
            fill={s.tab === i ? COLORS.INK : '#928c7f'}
            anchor="middle"
            weight={s.tab === i ? 700 : 400}
          />
        </g>
      ))}

      {s.tab === 0 && (
        <>
          {SIDEBAR_CARDS.map((c, i) => {
            const cx = 42 + (i % 2) * 124;
            const cy = 152 + Math.floor(i / 2) * 176;
            const activeRing = s.t > 1.52 + i * 0.48 && s.t < 2.02 + i * 0.48;
            return (
              <g key={c.kind}>
                <Box x={cx} y={cy} w={112} h={132} r={8} fill="#fff" sw={2} />
                <ArtTile x={cx + 2} y={cy + 2} w={108} h={128} kind={c.kind} clipId={`sb-clip-${i}`} />
                <rect x={cx + 72} y={cy + 109} width={36} height={18} rx={5} fill="#302d27aa" />
                <Label x={cx + 90} y={cy + 122} text={c.dur} size={11} fill="#fff" anchor="middle" />
                <Label x={cx + 56} y={cy + 153} text={c.name} size={14} anchor="middle" weight={700} />
                {activeRing && (
                  <rect
                    x={cx - 4}
                    y={cy - 4}
                    width={120}
                    height={140}
                    rx={10}
                    fill="none"
                    stroke={COLORS.GOLD}
                    strokeWidth={3.6}
                  />
                )}
              </g>
            );
          })}
          <g>
            <rect
              x={42}
              y={514}
              width={236}
              height={114}
              rx={10}
              fill="none"
              stroke="#c3bcaf"
              strokeWidth={1.8}
              strokeDasharray="6 6"
            />
            <Star x={160} y={554} r={13} fill="#e4f6f9" opacity={1} stroke="#9c978b" />
            <Label x={160} y={590} text="＋ 拖入任意代码 / 文档" size={15} fill="#999487" anchor="middle" />
            <Label x={160} y={612} text="支持 1M Context 直出" size={12} fill="#b3ae9f" anchor="middle" />
          </g>
        </>
      )}

      {s.tab === 1 &&
        FX_NAMES.map((nm, i) => {
          const cx = 42 + (i % 2) * 124;
          const cy = 158 + Math.floor(i / 2) * 150;
          const hi =
            (i === 0 && s.t > 5.65 && s.t < 6.18) ||
            (i === 1 && s.t > 6.18 && s.t < 6.72);
          return (
            <g key={nm}>
              <Box x={cx} y={cy} w={112} h={102} r={8} fill={FX_COLORS[i]} sw={1.9} />
              <TransitionIcon idx={i} x={cx + 56} y={cy + 51} s={1.0} />
              <Label x={cx + 56} y={cy + 126} text={nm} size={15} anchor="middle" weight={700} />
              {hi && (
                <rect
                  x={cx - 4}
                  y={cy - 4}
                  width={120}
                  height={110}
                  rx={10}
                  fill="none"
                  stroke={COLORS.GOLD}
                  strokeWidth={3.6}
                />
              )}
            </g>
          );
        })}

      {s.tab === 2 && (
        <>
          <g>
            <Box x={42} y={158} w={236} h={138} r={10} fill="#fff3d2" sw={1.9} />
            <Label x={56} y={180} text="爆款贴纸" size={12} fill="#9c9684" />
            <Sticker x={160} y={230} text="XHigh 强推理!" size={24} fill={COLORS.GOLD} />
            <rect
              x={38}
              y={154}
              width={244}
              height={146}
              rx={12}
              fill="none"
              stroke={COLORS.GOLD}
              strokeWidth={3.2}
            />
          </g>
          <g>
            <Box x={42} y={314} w={236} h={138} r={10} fill="#e3f7f8" sw={1.9} />
            <Label x={56} y={336} text="效率气泡" size={12} fill="#9c9684" />
            <Box x={76} y={358} w={168} h={48} r={22} fill="#ffffff" stroke={COLORS.TEAL} sw={2.2} />
            <Label x={160} y={390} text="省 60% Token" size={22} fill="#2c8689" anchor="middle" weight={700} />
          </g>
          <g>
            <Box x={42} y={470} w={236} h={138} r={10} fill="#23203d" sw={1.9} />
            <Label x={56} y={492} text="霓虹发光" size={12} fill="#b6b0df" />
            <Label
              x={160}
              y={540}
              text="GEMINI NEON"
              size={25}
              fill={COLORS.CYAN}
              anchor="middle"
              weight={700}
              stroke={COLORS.NEON_VIOLET}
              strokeWidth={7}
              opacity={0.45}
            />
            <Label
              x={160}
              y={540}
              text="GEMINI NEON"
              size={25}
              fill="#f6fdff"
              anchor="middle"
              weight={700}
            />
          </g>
        </>
      )}
    </g>
  );
};
