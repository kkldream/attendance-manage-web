// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  css: ['~/assets/css/main.css'],
  modules: [
    '@ant-design-vue/nuxt',
    '@pinia/nuxt'
  ],
  runtimeConfig: {
    mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017",
    public: {}
  }
})
