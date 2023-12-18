// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {enabled: true},
  runtimeConfig: {
    mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017",
    public: {}
  }
})
