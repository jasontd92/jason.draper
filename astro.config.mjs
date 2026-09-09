// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Canonical home for Jason Draper's writing. Kept as the production domain even
// while the site is deployed to a Vercel project URL, so canonical/JSON-LD/sitemap
// URLs point at the eventual home (see README "Deploying").
const SITE = 'https://jasondraper.ai';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
