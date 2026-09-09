import { Dithering } from '@paper-design/shaders-react';
import { useReducedMotion } from 'framer-motion';

interface Props {
  /** Dithering pattern shape. */
  shape?: 'simplex' | 'warp' | 'dots' | 'wave' | 'ripple' | 'swirl' | 'sphere';
  /** 'frame' clears the centre into a glowing border (best behind long-form text). */
  mask?: 'none' | 'frame' | 'top';
  /** Foreground / ink colour. */
  front?: string;
}

/**
 * Ambient dithering-shader wallpaper (Paper Shaders), rendered on the client
 * only — a decorative WebGL canvas fixed behind all content, so it never
 * affects the server-rendered HTML that agents and crawlers read. Animation
 * pauses under prefers-reduced-motion.
 */
export default function ShaderBackground({
  shape = 'warp',
  mask = 'none',
  front = '#17d9c9',
}: Props) {
  const reduce = useReducedMotion();

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
      shape={shape}
      type="4x4"
      size={2}
      scale={1}
      speed={reduce ? 0 : 0.25}
      fit="cover"
    />
  );
}
