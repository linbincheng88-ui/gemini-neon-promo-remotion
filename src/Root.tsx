import React from 'react';
import { Composition } from 'remotion';
import { GeminiNeonPromo } from './GeminiNeonPromo';
import {
  COMPOSITION_ID,
  DURATION_IN_FRAMES,
  FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from './constants';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id={COMPOSITION_ID}
      component={GeminiNeonPromo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={VIDEO_WIDTH}
      height={VIDEO_HEIGHT}
    />
  );
};
