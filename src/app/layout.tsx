import type { Metadata } from "next";

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
        {/* Self-hosted copies of the Google Fonts the theme used (Arya, Varela, Varta). */}
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link rel="stylesheet" href="/iawm/fonts.css" />
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
