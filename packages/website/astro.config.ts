import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import robotsTxt from 'astro-robots-txt';
import rehypeExternalLinks from 'rehype-external-links';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), robotsTxt(), react()],
  site: `https://aaleksandrov.me/`,
  output: 'static',
  compressHTML: true,
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "en"],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    },
  },
  redirects: {
    '/ru/blog/konspekt-pochemu-trunk-based-development---luchshaya-model-vetvleniya/': '/ru/blog/pochemu-trunk-based-development---luchshaya-model-vetvleniya/',
    '/ru/blog/2023-state-of-devops-puppet/': '/ru/blog/state-of-devops-2023-ot-puppet/',
  },
  markdown: {
    rehypePlugins: [
      [rehypeExternalLinks, {
        rel: ['nofollow'],
        target: ['_blank']
      }],
    ],
    shikiConfig: {
      theme: "min-light"
    }
  }
});
