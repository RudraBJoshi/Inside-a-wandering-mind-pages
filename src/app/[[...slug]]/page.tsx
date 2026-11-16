import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacyScripts from "@/components/legacy-scripts";
import { allPaths, getMeta, getPage, pathFromSlug } from "@/lib/pages";

type Props = { params: Promise<{ slug?: string[] }> };

// Only pages that have been copied exist; everything else is a 404 until it is copied.
export const dynamicParams = false;

export function generateStaticParams() {
  return allPaths().map((path) => ({ slug: path === "/" ? [] : path.replace(/^\/|\/$/g, "").split("/") }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = getMeta(pathFromSlug((await params).slug));
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.canonical },
    icons: { icon: "/iawm/img/cropped-cropped-Screenshot-2026-07-29-190721-1.png" },
  };
}

export default async function Page({ params }: Props) {
  const page = getPage(pathFromSlug((await params).slug));
  if (!page) notFound();
  return (
    <>
      {/* display: contents keeps the wrapper out of layout so `body > #page` behaves as it does on WordPress. */}
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: page.html }} />
      <LegacyScripts items={page.scripts} />
    </>
  );
}
