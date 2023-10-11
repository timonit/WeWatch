// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: './src/',
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
