import React from 'react';
import { ArtKind, BPM, COLORS } from '../constants';
import { progress, seed, TimelineState } from '../timeline';
import { ArtTile } from './Artworks';
import { Box, Label, TransitionIcon } from './Primitives';

const TICK_INDICES = Array.from({ length: 57 }, (_, i) => i);
const WAVE_BARS = Array.from({ length: 240 }, (_, i) => ({
  i,
  x: +(112 + i * 3.8).toFixed(1),
  a: (6 + seed(i + 90) * 26) * (i < 16 ? 0.45 : 1),
}));
const BEAT_MARKER_INDICES = Array.from({ length: 26 }, (_, i) => i);

export const TimelinePanel: React.FC<{ s: TimelineState }> = ({ s }) => {
  const clipData: Array<{
    kind: ArtKind;
    name: string;
    color: string;
    baseW: number;
  }> = [
    { kind: 'code', name: '代码重构.ts', color: '#5894f5', baseW: 196 },
    { kind: 'reason', name: '深度推理.ai', color: '#9e84ee', baseW: 292 - s.cut * 108 },
    { kind: 'context', name: '1M上下文.doc', color: '#70c8be', baseW: 194 },
    { kind: 'neon', name: 'Neon高能.mp4', color: '#d882be', baseW: 224 },
  ];

  let cx = 104;
  const starts = clipData.map((c) => {
    const x = cx;
    cx += c.baseW + 5;
    return x;
  });

  const playheadX = 104 + s.playhead * 920;

  return (
    <g>
      <Box x={28} y={664} w={1024} h={388} r={12} fill="#faf8f0" />
      <path d="M104 715 H1032" stroke="#55564c" strokeWidth={1.4} />
      {TICK_INDICES.map((i) => {
        const tx = 104 + i * 16.4;
        const major = i % 4 === 0;
        return (
          <React.Fragment key={i}>
            <path
              d={`M${tx.toFixed(1)} 715 v${major ? -16 : -7}`}
              stroke="#a7a496"
              strokeWidth={1.1}
            />
            {i % 8 === 0 && (
              <Label
                x={tx}
                y={694}
                text={`0:${String(i / 4).padStart(2, '0')}`}
                size={13}
                fill="#79796e"
                anchor="middle"
              />
            )}
          </React.Fragment>
        );
      })}

      {/* Track lane backgrounds */}
      <rect x={104} y={726} width={928} height={42} rx={6} fill="#eeece4" />
      <rect x={104} y={780} width={928} height={96} rx={6} fill="#edeae3" />
      <rect x={104} y={888} width={928} height={64} rx={6} fill="#efede7" />

      {/* Left track icons */}
      <Box x={42} y={726} w={48} h={42} r={7} fill="#faf0ce" sw={1.9} />
      <Label x={66} y={754} text="T" size={22} anchor="middle" weight={700} />
      <Box x={42} y={780} w={48} h={96} r={7} fill="#d6f0ea" sw={1.9} />
      <Label x={66} y={836} text="▶" size={24} anchor="middle" />
      <Box x={42} y={888} w={48} h={64} r={7} fill="#e6e0f7" sw={1.9} />
      <Label x={66} y={930} text="♪" size={30} anchor="middle" />

      {/* Video Clips */}
      {clipData.map((c, i) => {
        const appear = 1.85 + i * 0.48;
        if (s.t < appear) {
          return null;
        }
        const op = progress(s.t, appear, appear + 0.14);
        const count = i === 1 ? 4 : 3;
        const tileW = (c.baseW - 6) / count;
        return (
          <g key={c.kind} opacity={+op.toFixed(3)}>
            <Box x={starts[i]} y={781} w={c.baseW} h={94} r={7} fill={c.color} sw={2.1} />
            {Array.from({ length: count }, (_, k) => (
              <ArtTile
                key={k}
                x={starts[i] + 3 + k * tileW}
                y={784}
                w={tileW}
                h={88}
                kind={c.kind}
                clipId={`tl-${i}-${k}`}
              />
            ))}
            <rect
              x={+(starts[i] + 6).toFixed(1)}
              y={786}
              width={90}
              height={19}
              rx={7}
              fill="#fffdf5ee"
              stroke="#999182"
              strokeWidth={0.9}
            />
            <Label x={starts[i] + 13} y={800} text={c.name} size={12} weight={700} />
          </g>
        );
      })}

      {/* Bloat hatched section on Clip 2 (before & during cut) */}
      {s.t > 3.72 && s.t < 5.3 && (
        <g opacity={+(1 - s.cut).toFixed(3)}>
          <rect
            x={+(starts[1] + 126).toFixed(1)}
            y={784}
            width={+(108 * (1 - s.cut)).toFixed(1)}
            height={88}
            fill="#8b877c"
            opacity={0.82}
          />
          <rect
            x={+(starts[1] + 126).toFixed(1)}
            y={784}
            width={+(108 * (1 - s.cut)).toFixed(1)}
            height={88}
            fill="url(#hatch)"
          />
          <Label
            x={starts[1] + 180 - s.cut * 40}
            y={838}
            text="z z z"
            size={26}
            fill="#e5e1d4"
            anchor="middle"
            weight={700}
          />
        </g>
      )}

      {/* Crisp black cut seam line after snip */}
      {s.t >= 5.15 && (
        <path
          d={`M${(starts[1] + 126).toFixed(1)} 781 V875`}
          stroke={COLORS.INK}
          strokeWidth={2.8}
        />
      )}

      {/* Transition badges between clips */}
      {s.t >= 5.95 && (
        <g>
          <circle
            cx={+starts[2].toFixed(1)}
            cy={828}
            r={18}
            fill="#fffdf4"
            stroke={COLORS.INK}
            strokeWidth={2}
          />
          <TransitionIcon idx={0} x={starts[2]} y={828} s={0.56} />
        </g>
      )}
      {s.t >= 6.45 && (
        <g>
          <circle
            cx={+starts[3].toFixed(1)}
            cy={828}
            r={18}
            fill="#fffdf4"
            stroke={COLORS.INK}
            strokeWidth={2}
          />
          <TransitionIcon idx={1} x={starts[3]} y={828} s={0.56} />
        </g>
      )}

      {/* Caption block on T1 */}
      {s.t >= 6.76 && (
        <g>
          <Box x={starts[2] + 2} y={730} w={220} h={34} r={6} fill={COLORS.GOLD} sw={1.7} />
          <Label
            x={starts[2] + 12}
            y={753}
            text={`T  ${s.captionFull.slice(0, s.captionLen)}`}
            size={15}
            weight={700}
          />
        </g>
      )}

      {/* Audio Waveform Clip */}
      {s.t >= 3.35 && (
        <g opacity={+progress(s.t, 3.35, 3.62).toFixed(3)}>
          <Box x={104} y={891} w={924} h={58} r={7} fill="#eae3f7" sw={1.8} />
          <Label
            x={116}
            y={907}
            text="♪ neon_beat_128bpm.wav"
            size={12}
            fill="#57507a"
            weight={700}
          />
          {WAVE_BARS.map(({ i, x, a }) => {
            const beatGlow = s.t >= 9.35 && (i + Math.floor(s.t * 20)) % 9 === 0;
            return (
              <path
                key={i}
                d={`M${x} ${(924 - a / 2).toFixed(1)} v${a.toFixed(1)}`}
                stroke={beatGlow ? '#f0b835' : '#8e84c6'}
                strokeWidth={1.7}
              />
            );
          })}
        </g>
      )}

      {/* Beat markers */}
      {s.t >= 9.35 && (
        <g opacity={+progress(s.t, 9.35, 9.65).toFixed(3)}>
          {BEAT_MARKER_INDICES.map((i) => {
            const active = Math.floor((s.t - 9.35) * (BPM / 60) * 2) % 26 === i;
            return (
              <path
                key={i}
                d={`M${108 + i * 35.5} 964 l7 13 7 -13Z`}
                fill={active ? COLORS.CYAN : COLORS.GOLD}
                stroke={COLORS.INK}
                strokeWidth={1.2}
              />
            );
          })}
          <Box x={916} y={896} w={108} h={48} r={8} fill={COLORS.GOLD} sw={2} />
          <Label x={970} y={927} text="▽ 卡点" size={20} anchor="middle" weight={700} />
        </g>
      )}

      {/* Playhead */}
      <path d={`M${playheadX.toFixed(1)} 690 V962`} stroke="#e45e78" strokeWidth={2.6} />
      <path
        d={`M${(playheadX - 8).toFixed(1)} 686 h16 v12 l-8 8 -8 -8Z`}
        fill="#e6677e"
        stroke={COLORS.INK}
        strokeWidth={1.6}
      />

      {/* Footer zoom bar & summary */}
      <path d="M52 1018 h8 m12 0 h96 m16 -5 v10 m-5 -5 h10" stroke="#b6b3a8" strokeWidth={1.5} />
      <circle cx={118} cy={1018} r={5} fill="#fffdf9" stroke="#9d998d" strokeWidth={1.4} />
      <Label
        x={1026}
        y={1023}
        text={`片段 4 · 1080×1080 · 总时长 0:${(15.8 - s.cut * 1.8).toFixed(1)}s`}
        size={14}
        fill="#9f9b8f"
        anchor="end"
      />
    </g>
  );
};
