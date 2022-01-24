export default {

  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CourseKit Demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: 'https://js.stripe.com/v3' },
    ],
    bodyAttrs: {
      class: 'bg-yellow-50'
    }
  },

  env: {
    API_URL: process.env.API_URL || 'https://api.coursekit.dev',
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    SCHOOL_ID: process.env.COURSEKIT_SCHOOL_ID,
    NODE_ENV: process.env.NODE_ENV || 'development'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/init.js',
    { src: '~/plugins/vue-stripe.js', ssr: false },
    { src: `~plugins/vue-vimeo` }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev }) {

    },
    vendor: [
      'vue-vimeo-player'
    ],
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  }
}
