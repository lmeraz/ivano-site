// @ts-check
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://www.ivanoworkshops.com",
  adapter: netlify(),
  integrations: [react(), keystatic(), sitemap()],
});
