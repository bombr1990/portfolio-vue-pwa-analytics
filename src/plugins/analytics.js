// plugins/analytics.js
import { useAnalytics } from '../composables/useAnalytics.js'

export default {
  install(app, options = {}) {
    const analytics = useAnalytics()
    
    // Hacer analytics disponible globalmente
    app.config.globalProperties.$analytics = analytics
    app.provide('analytics', analytics)
    
    // Inicializar analytics
    analytics.initializeGA()
    
    // Plugin para rastrear cambios de ruta automáticamente
    if (options.router) {
      options.router.afterEach((to, from) => {
        // Esperar un poco para que el título de la página se actualice
        setTimeout(() => {
          analytics.trackPageView(to.path, document.title)
        }, 100)
      })
    }
  }
}