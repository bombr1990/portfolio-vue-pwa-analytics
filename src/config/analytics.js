// config/analytics.js

// Configuración de Analytics
export const analyticsConfig = {
  // Google Analytics 4
  googleAnalytics: {
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
    enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    // Configuraciones adicionales
    config: {
      send_page_view: false, // Lo manejamos manualmente
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    }
  },

  // Configuración de cookies y privacidad
  privacy: {
    cookieConsent: false, // Cambiar a true si necesitas consentimiento de cookies
    respectDoNotTrack: true,
    anonymizeIP: true
  },

  // Eventos personalizados específicos del portfolio
  customEvents: {
    // Eventos de navegación
    navigation: ['page_view', 'route_change'],
    
    // Eventos de portfolio
    portfolio: [
      'project_view', 
      'project_card_click', 
      'project_time_spent',
      'project_load_error'
    ],
    
    // Eventos de contacto
    contact: [
      'contact_page_view',
      'form_field_focus',
      'form_submit_attempt',
      'form_submit_success',
      'contact_form_submission'
    ],
    
    // Eventos de engagement
    engagement: [
      'scroll_depth',
      'time_on_page',
      'click_external_link',
      'file_download'
    ]
  }
}

// Función para verificar si el tracking está habilitado
export function isTrackingEnabled() {
  // Verificar Do Not Track
  if (analyticsConfig.privacy.respectDoNotTrack && typeof navigator !== 'undefined' && navigator.doNotTrack === '1') {
    return false
  }
  
  // Verificar si estamos en desarrollo local
  if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_ANALYTICS !== 'true') {
    return false // Deshabilitado en desarrollo por defecto
  }
  
  // En producción, verificar que esté habilitado
  return analyticsConfig.googleAnalytics.enabled && analyticsConfig.googleAnalytics.measurementId !== 'G-XXXXXXXXXX'
}

// Función para obtener configuración de consentimiento
export function getConsentConfig() {
  return {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    // Permitir analytics_storage por defecto (cumple con GDPR si anonymizeIP está en true)
    analytics_storage: 'granted'
  }
}