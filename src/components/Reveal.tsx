import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Seconds to delay the entrance — used to stagger sibling reveals. */
  delay?: number;
  /** Initial vertical offset in px (default 16). */
  y?: number;
  className?: string;
}

/**
 * Subtle fade + rise entrance driven by Framer Motion.
 *
 * The children are server-rendered by Astro, so the full text is present in
 * the static HTML for crawlers, agents, and no-JS visitors. The `.reveal`
 * class pairs with a <noscript> override in Base.astro so that if JS never
 * runs, the content is shown rather than left at its hidden initial state.
 */
export default function Reveal({ children, delay = 0, y = 16, className }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={['reveal', className].filter(Boolean).join(' ')}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
