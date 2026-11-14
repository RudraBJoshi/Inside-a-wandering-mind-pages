import type { Metadata } from "next";

// Fonts the WordPress theme loads (Astra + Elementor global fonts).
const GOOGLE_FONTS = [
  "https://fonts.googleapis.com/css?family=Varela:400|Arya:400%2C600&display=swap&ver=4.14.3",
  "https://fonts.googleapis.com/css?family=Arya:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap",
  "https://fonts.googleapis.com/css?family=Varta:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap",
  "https://fonts.googleapis.com/css?family=Varela:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic&display=swap",
];

export const metadata: Metadata = {
  title: "Home - Inside A Wandering Mind",
  description:
    "Inside A Wandering Mind (IAWM) is a student-run writing platform exploring science, society, arts, entertainment, and creative works. Discover new ideas and stories.",
  alternates: { canonical: "https://inside-a-wandering-mind.com/" },
  icons: { icon: "/iawm/img/cropped-cropped-Screenshot-2026-07-29-190721-1.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {GOOGLE_FONTS.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {/* Everything the WordPress page loads (Astra, Elementor, theme + custom CSS), in original order. */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/iawm/site.css" />
      </head>
      <body
        className="home wp-singular page-template-default page page-id-2639 wp-custom-logo wp-embed-responsive wp-theme-astra ecc-default manage-default ast-desktop ast-page-builder-template ast-no-sidebar astra-4.14.3 group-blog ast-single-post ast-inherit-site-logo-transparent ast-hfb-header ast-full-width-primary-header elementor-default elementor-kit-1160 elementor-page elementor-page-2639 ast-header-loaded"
        itemScope
        itemType="https://schema.org/WebPage"
        data-elementor-device-mode="desktop"
      >
        {children}
      </body>
    </html>
  );
}
