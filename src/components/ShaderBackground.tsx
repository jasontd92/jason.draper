import { Dithering } from '@paper-design/shaders-react';
import { useReducedMotion } from 'framer-motion';

/**
 * Ambient dithering-shader wallpaper (Paper Shaders), rendered on the client
 * only — a decorative WebGL canvas fixed behind all content, so it never
 * affects the server-rendered HTML that agents and crawlers read. Animation
 * pauses under prefers-reduced-motion.
 *
 * Preview overrides (temporary, harmless): the URL query can tune the look
 * while we settle the direction —
 *   ?bg=wave|warp|ripple|swirl|simplex|dots|sphere
 *   ?mask=frame|top   (frame = clears the centre into a glowing border)
 *   ?front=%2317d9c9  (foreground/ink colour)
 */
const SHAPES = ['simplex', 'warp', 'dots', 'wave', 'ripple', 'swirl', 'sphere'];

export default function ShaderBackground() {
  const reduce = useReducedMotion();

  let shape = 'wave';
  let mask = '';
  let front = '#17d9c9';
  if (typeof window !== 'undefined') {
    const q = new URLSearchParams(window.location.search);
    const s = q.get('bg');
    if (s && SHAPES.includes(s)) shape = s;
    mask = q.get('mask') ?? '';
    front = q.get('front') ?? front;
  }

  const maskCss =
    mask === 'frame'
      ? 'radial-gradient(120% 82% at 50% 42%, transparent 32%, rgba(0,0,0,0.4) 56%, #000 80%)'
      : mask === 'top'
        ? 'linear-gradient(180deg, #000 0%, transparent 58%)'
        : undefined;

  const style: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    width: '100%',
    height: '100%',
    ...(maskCss ? { maskImage: maskCss, WebkitMaskImage: maskCss } : {}),
  };

  return (
    <Dithering
      style={style}
      colorBack="#05080a"
      colorFront={front}
      shape={shape as never}
      type="4x4"
      size={2}
      scale={shape === 'sphere' ? 0.7 : 1}
      offsetY={shape === 'sphere' ? -0.12 : 0}
      speed={reduce ? 0 : 0.6}
      fit="cover"
    />
  );
}
