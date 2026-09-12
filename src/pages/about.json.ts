import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * Machine-readable profile for AI agents ("agentic SEO").
 * Writing and systems are generated from the content collections so this
 * endpoint stays in sync with the site automatically.
 */
export async function GET(context: APIContext) {
  const base = (context.site?.href ?? 'https://jasondraper.ai/').replace(
    /\/$/,
    '',
  );

  const writing = (await getCollection('writing'))
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .map((p) => ({
      title: p.data.title,
      url: `${base}/writing/${p.id}`,
      description: p.data.description,
      published: p.data.pubDate.toISOString().slice(0, 10),
      tags: p.data.tags ?? [],
    }));

  const systems_built = (await getCollection('systems'))
    .filter((s) => s.data.status === 'active')
    .map((s) => ({
      name: s.data.name,
      desc: s.data.description,
      url: `${base}/systems/${s.id}`,
    }));

  const profile = {
    name: 'Jason Draper',
    url: base,
    location: 'Utah, USA',
    roles: [
      'Product Engineer',
      'Forward Deployed Engineer',
      'Founding Engineer',
    ],
    background: [
      'Technical Co-Founder, Punchcard — AI-powered audit automation (YC S23)',
      'Co-Founder & CTO, FairQuote (home-service management)',
      'U.S. Air Force — ICBM Missile Launch Officer & Emergency War Order Planner, 321st Missile Squadron (4+ years active duty)',
    ],
    expertise: [
      'AI agent orchestration',
      'LLM reliability engineering',
      'audit automation',
      'regulated-industry AI',
    ],
    systems_built,
    writing,
    contact: {
      linkedin: 'https://linkedin.com/in/jasontdraper',
    },
  };

  return new Response(JSON.stringify(profile, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
