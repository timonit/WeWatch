// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src/',
  experimental: {
    componentIslands: true,
  },
  dir: {
    layouts: 'shared/ui/layout',
    plugins: 'shared/directives'
  },
  app: {
    head: {
      script: [
        { src: "https://apis.google.com/js/api.js"}
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
      'postcss-import': {},
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  serverDir: './server'
})
