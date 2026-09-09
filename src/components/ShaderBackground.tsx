import { Dithering } from '@paper-design/shaders-react';
import { useReducedMotion } from 'framer-motion';

/**
 * Ambient dithering-shader wallpaper (Paper Shaders), rendered on the client
 * only — it's a decorative WebGL canvas fixed behind all content, so it never
 * affects the server-rendered HTML that agents and crawlers read.
 *
 * Colours are dark-on-dark so long-form text stays readable; a scrim in
 * Base.astro adds the final contrast. Animation pauses under
 * prefers-reduced-motion.
 */
export default function ShaderBackground() {
  const reduce = useReducedMotion();

  return (
    <Dithering
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%' }}
      colorBack="#05080a"
      colorFront="#17d9c9"
      shape="sphere"
      type="4x4"
      size={2}
      scale={0.7}
      offsetY={-0.12}
      speed={reduce ? 0 : 0.6}
      fit="cover"
    />
  );
}
