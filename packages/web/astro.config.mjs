import { defineConfig } from "astro/config";
import remarkMermaid from "./src/plugins/mermaid";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],

  site:
    process.env.NODE_ENV === "production"
      ? "https://mrfylke.github.io/hwb-standard/"
      : undefined,

  markdown: {
    remarkPlugins: [remarkMermaid],
  },
});
