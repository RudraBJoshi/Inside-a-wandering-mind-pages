import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export const ORIGIN = "https://inside-a-wandering-mind.com";

export type LegacyScript = { src: string } | { code: string };

export type PageMeta = {
  path: string; // "/departments/"
  title: string;
  description?: string;
  canonical: string;
  bodyClass: string;
  css: string[];
  scripts: LegacyScript[];
};

export type Page = PageMeta & { key: string; html: string };

const DIR = join(process.cwd(), "src/content/pages");

/** "/" -> "home", "/departments/stem/" -> "departments__stem" */
export const keyFromPath = (path: string) => path.replace(/^\/|\/$/g, "").replaceAll("/", "__") || "home";

let cache: Map<string, PageMeta> | null = null;
function metas(): Map<string, PageMeta> {
  if (!cache) {
    cache = new Map();
    for (const f of readdirSync(DIR).filter((n) => n.endsWith(".json"))) {
      const meta = JSON.parse(readFileSync(join(DIR, f), "utf8")) as PageMeta;
      cache.set(meta.path, meta);
    }
  }
  return cache;
}

export function allPaths(): string[] {
  return [...metas().keys()];
}

/** Turn the URL segments of the request into the WordPress-style path ("/a/b/"). */
export function pathFromSlug(slug?: string[]): string {
  return slug && slug.length ? `/${slug.join("/")}/` : "/";
}

export function getMeta(path: string): PageMeta | undefined {
  return metas().get(path);
}

/**
 * Links to pages that have been copied point at this site; links to everything else keep pointing at
 * the live WordPress site until that page is copied too.
 */
// Short URLs the live site redirects to their canonical page (mirrored in next.config.ts).
const ALIASES: Record<string, string> = Object.fromEntries(
  ["c1-stem", "c2-world-society", "c3-arts-entertainment", "c4-creative-works-fiction", "c5-personal-experiences"].map((slug) => [
    `/${slug}/`,
    `/categories/${slug}/`,
  ]),
);

function localizeLinks(html: string): string {
  const ported = metas();
  return html.replace(/href="https:\/\/inside-a-wandering-mind\.com(\/[^"#?]*)([#?][^"]*)?"/g, (m, path: string, rest = "") => {
    const target = ALIASES[path] ?? path;
    return ported.has(target) ? `href="${target}${rest}"` : m;
  });
}

export function getPage(path: string): Page | undefined {
  const meta = getMeta(path);
  if (!meta) return undefined;
  const key = keyFromPath(path);
  const html = readFileSync(join(DIR, `${key}.html`), "utf8");
  return { ...meta, key, html: localizeLinks(html) };
}
