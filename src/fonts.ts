import { useEffect, useState } from 'react';
import { cancelRender, continueRender, delayRender, staticFile } from 'remotion';

export const FONT_FAMILY = "Wenkai, 'PingFang SC', cursive";

let fontLoadPromise: Promise<void> | null = null;
let fontsReady = false;

const loadWenkaiFonts = (): Promise<void> => {
  if (fontLoadPromise) {
    return fontLoadPromise;
  }

  fontLoadPromise = (async () => {
    const regular = new FontFace(
      'Wenkai',
      `url('${staticFile('fonts/LXGWWenKai-Regular.ttf')}') format('truetype')`,
      { weight: '400', style: 'normal' },
    );
    const medium = new FontFace(
      'Wenkai',
      `url('${staticFile('fonts/LXGWWenKai-Medium.ttf')}') format('truetype')`,
      { weight: '700', style: 'normal' },
    );

    const [loadedRegular, loadedMedium] = await Promise.all([
      regular.load(),
      medium.load(),
    ]);

    document.fonts.add(loadedRegular);
    document.fonts.add(loadedMedium);
    await document.fonts.ready;
    fontsReady = true;
  })();

  return fontLoadPromise;
};

/**
 * Ensures LXGW WenKai Regular (400) & Medium (700) are loaded via staticFile()
 * before Remotion captures frame 0.
 */
export const useLoadWenkaiFonts = (): void => {
  const [handle] = useState<number | null>(() =>
    fontsReady ? null : delayRender('Loading LXGW WenKai fonts'),
  );

  useEffect(() => {
    if (handle === null) {
      return;
    }
    loadWenkaiFonts()
      .then(() => {
        continueRender(handle);
      })
      .catch((err) => {
        cancelRender(err);
      });
  }, [handle]);
};
