import { getMeta, pathFromSlug } from "@/lib/pages";

// The root layout lives in the catch-all folder so it can read the slug and give <body> the same
// classes WordPress puts on that page (Astra and Elementor style pages through them).
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const meta = getMeta(pathFromSlug(slug));
  return (
    <html lang="en-US">
      <head>
        {/* Self-hosted copies of the Google Fonts the theme used (Arya, Varela, Varta). */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/iawm/fonts.css" />
        {/* Everything the WordPress page loads (Astra, Elementor, theme + custom CSS), in original order. */}
        {meta?.css.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
      </head>
      <body
        className={meta?.bodyClass}
        itemScope
        itemType="https://schema.org/WebPage"
        data-elementor-device-mode="desktop"
      >
        {children}
      </body>
    </html>
  );
}
