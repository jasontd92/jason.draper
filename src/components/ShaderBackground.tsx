import { Dithering } from '@paper-design/shaders-react';
import { useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { createRoot, type Root } from 'react-dom/client';

interface Props {
  /** Dithering pattern shape. */
  shape?: 'simplex' | 'warp' | 'dots' | 'wave' | 'ripple' | 'swirl' | 'sphere';
  /** 'frame' clears the centre into a glowing border (best behind long-form text). */
  mask?: 'none' | 'frame' | 'top';
  /** Foreground / ink colour. */
  front?: string;
}

const SLOT_ID = 'jd-ambient-slot';

type LayerProps = Required<Pick<Props, 'shape' | 'mask' | 'front'>> & {
  reduce: boolean;
};

/**
 * Ambient dithering-shader wallpaper (Paper Shaders).
 *
 * The WebGL canvas mounts into #jd-ambient-slot inside a Base.astro wrapper
 * marked transition:persist — Astro keeps that DOM subtree across soft navs
 * without moving the canvas (moving it loses WebGL / blows out DPR sizing).
 * The island only updates props. Decorative; not in SSR content agents read.
 */
function ShaderLayer({ shape, mask, front, reduce }: LayerProps) {
  const maskCss =
    mask === 'frame'
      ? 'radial-gradient(120% 82% at 50% 42%, transparent 32%, rgba(0,0,0,0.4) 56%, #000 80%)'
      : mask === 'top'
        ? 'linear-gradient(180deg, #000 0%, transparent 58%)'
        : undefined;

  // Match the original island layout: fixed full-viewport mount so Paper's
  // ResizeObserver gets real device-pixel box sizes (html-sibling mounts
  // were measuring at 1× and looking zoomed / blocky).
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
      minPixelRatio={2}
    />
  );
}

let root: Root | null = null;
let lastRenderKey = '';

function ensureRoot(): Root | null {
  const slot = document.getElementById(SLOT_ID);
  if (!slot) return null;
  if (!root) root = createRoot(slot);
  return root;
}

export default function ShaderBackground({
  shape = 'warp',
  mask = 'none',
  front = '#17d9c9',
}: Props) {
  const reduce = useReducedMotion();

  useEffect(() => {
    const r = ensureRoot();
    if (!r) return;
    const key = `${shape}|${mask}|${front}|${!!reduce}`;
    if (key === lastRenderKey) return;
    lastRenderKey = key;
    r.render(
      <ShaderLayer
        shape={shape}
        mask={mask}
        front={front}
        reduce={!!reduce}
      />,
    );
  }, [shape, mask, front, reduce]);

  return null;
}
