import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  typescript: {
    tsConfig: {
      extends: "@tsconfig/strictest/tsconfig.json",
      compilerOptions: {
        paths: {
          "balm-ui-plus": ["node_modules/balm-ui/dist/balm-ui-plus.d.ts"],
          "balm-ui-next": ["node_modules/balm-ui/dist/balm-ui-next.d.ts"],
        },
      },
    },
  },
});
