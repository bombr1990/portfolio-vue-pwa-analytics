import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import analyticsPlugin from './plugins/analytics.js'

const app = createApp(App)
app.use(router)
app.use(analyticsPlugin, { router })
app.mount('#app')
