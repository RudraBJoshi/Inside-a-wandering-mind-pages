import { readFileSync } from "node:fs";
import { join } from "node:path";
import LegacyScripts, { type LegacyScript } from "./legacy-scripts";
import scripts from "../content/scripts.json";

// The home page markup, copied from the live WordPress page (see src/content/home.html).
const html = readFileSync(join(process.cwd(), "src/content/home.html"), "utf8");

export default function Home() {
  return (
    <>
      {/* display: contents keeps the wrapper out of layout so `body > #page` behaves as it does on WordPress. */}
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: html }} />
      <LegacyScripts items={scripts as LegacyScript[]} />
    </>
  );
}
