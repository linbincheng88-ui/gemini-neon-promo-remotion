import React from 'react';
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import { EditorMascot } from './components/EditorMascot';
import { EndingScene } from './components/EndingScene';
import { PencilIntro } from './components/PencilIntro';
import { PhonePreview } from './components/PhonePreview';
import { Box } from './components/Primitives';
import { SettingsPanel } from './components/SettingsPanel';
import { Sidebar } from './components/Sidebar';
import { SvgDefs } from './components/SvgDefs';
import { TimelinePanel } from './components/TimelinePanel';
import { Toolbar } from './components/Toolbar';
import { COLORS, VIDEO_HEIGHT, VIDEO_WIDTH } from './constants';
import { FONT_FAMILY, useLoadWenkaiFonts } from './fonts';
import {
  cameraAt,
  clamp,
  easeOutBack,
  easeOutCubic,
  lerp,
  progress,
  stateAt,
} from './timeline';

export const GeminiNeonPromo: React.FC = () => {
  useLoadWenkaiFonts();

  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const s = stateAt(frame, fps);
  const cam = cameraAt(s.t);

  const uiFade = 1 - s.ending * 0.74;
  const panelsIn = progress(s.t, 0.88, 1.35, easeOutCubic);
  const phoneIn = progress(s.t, 1.05, 1.45, easeOutBack);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.PAPER }}>
      <Audio src={staticFile('audio/soundtrack.wav')} />
      <svg
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
        viewBox={`0 0 ${VIDEO_WIDTH} ${VIDEO_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          fontFamily: FONT_FAMILY,
        }}
      >
        <SvgDefs />
        <rect width={VIDEO_WIDTH} height={VIDEO_HEIGHT} fill={COLORS.PAPER} />
        <g
          transform={`translate(${cam.tx.toFixed(2)} ${cam.ty.toFixed(2)}) scale(${cam.zoom.toFixed(4)})`}
        >
          <g opacity={+uiFade.toFixed(3)}>
            <Box x={14} y={14} w={1052} h={1052} r={20} fill={COLORS.PAPER} sw={2.5} />
            <g opacity={+progress(s.t, 0.0, 0.25).toFixed(3)}>
              <Toolbar s={s} />
            </g>
            <PencilIntro t={s.t} />
            <g opacity={+panelsIn.toFixed(3)}>
              <Sidebar s={s} />
              <SettingsPanel s={s} />
              <TimelinePanel s={s} />
            </g>
            {s.ending === 0 && (
              <g
                opacity={+clamp(phoneIn).toFixed(3)}
                transform={`translate(540 352) scale(${lerp(0.92, 1, phoneIn).toFixed(4)}) translate(-540 -352)`}
              >
                <PhonePreview s={s} />
              </g>
            )}
            <EditorMascot s={s} />
          </g>
        </g>
        {s.ending > 0 && <EndingScene s={s} />}
        <rect
          width={VIDEO_WIDTH}
          height={VIDEO_HEIGHT}
          fill="url(#paper-grain)"
          pointerEvents="none"
          opacity={0.54}
        />
      </svg>
    </AbsoluteFill>
  );
};
