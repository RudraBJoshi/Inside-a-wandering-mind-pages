"use client";

import { useEffect } from "react";

export type LegacyScript = { src: string } | { code: string };

let started = false;

function run(item: LegacyScript): Promise<void> {
  return new Promise((resolve) => {
    const el = document.createElement("script");
    if ("src" in item) {
      el.src = item.src;
      el.async = false; // keep execution order
      el.onload = () => resolve();
      el.onerror = () => resolve(); // a missing script must not block the rest
      document.body.appendChild(el);
    } else {
      el.text = item.code;
      document.body.appendChild(el);
      resolve();
    }
  });
}

/**
 * Runs the WordPress theme's scripts (jQuery, Astra, Elementor, the carousel) in their original order.
 * They are loaded after React has hydrated, because they change the DOM: running them during page
 * load makes React throw away the server HTML and rebuild the tree without them.
 */
export default function LegacyScripts({ items }: { items: LegacyScript[] }) {
  useEffect(() => {
    if (started) return;
    started = true;
    (async () => {
      for (const item of items) await run(item);
      // The scripts expect to run during page load; replay the events they are waiting for.
      document.dispatchEvent(new Event("DOMContentLoaded", { bubbles: true }));
      window.dispatchEvent(new Event("load"));
    })();
  }, [items]);
  return null;
}
