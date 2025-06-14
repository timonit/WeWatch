// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  compatibilityDate: "2025-06-14",
  srcDir: './src/',
  pages: true,
  experimental: {
    componentIslands: true,
  },
  dir: {
    layouts: 'shared/ui/layout',
    plugins: 'shared/directives',
    middleware: 'shared/middleware'
  },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          href: '_nuxt/shared/assets/icon.svg',
          type: 'image/svg+xml'
        }
      ],
      script: [
        { src: "https://www.googletagmanager.com/gtag/js?id=G-GQJLQSBNKT" },
        { src: "https://apis.google.com/js/api.js" },
      ]
    }
  },
  css: [
    '@/app/style.scss',
    '@/shared/common.scss',
    'mono-icons/iconfont/icons.css'
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      // 'postcss-import': {},
      // 'tailwindcss/nesting': {},
      // tailwindcss: {},
      // autoprefixer: {},
    },
  },
  serverDir: './server'
})
