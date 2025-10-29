// composables/useAnalytics.js
import { ref, onMounted } from 'vue'
import { analyticsConfig, isTrackingEnabled, getConsentConfig } from '../config/analytics.js'

export function useAnalytics() {
  const isInitialized = ref(false)

  // Función para inicializar Google Analytics
  const initializeGA = () => {
    if (typeof window === 'undefined' || isInitialized.value || !isTrackingEnabled()) return

    const { measurementId, config } = analyticsConfig.googleAnalytics

    // Configurar consentimiento antes de cargar GA
    window.dataLayer = window.dataLayer || []
    function gtag() {
      dataLayer.push(arguments)
    }
    window.gtag = gtag

    // Configurar consentimiento
    gtag('consent', 'default', getConsentConfig())

    // Cargar el script de Google Analytics
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    script.onload = () => {
      gtag('js', new Date())
      gtag('config', measurementId, {
        ...config,
        page_title: document.title,
        page_location: window.location.href,
      })

      isInitialized.value = true
      console.log('Google Analytics inicializado con ID:', measurementId)
    }

    script.onerror = () => {
      console.warn('Error cargando Google Analytics')
    }
  }

  // Función para rastrear eventos
  const trackEvent = (eventName, parameters = {}) => {
    if (!isTrackingEnabled()) return

    if (typeof window !== 'undefined' && window.gtag) {
      // Agregar timestamp y sesión
      const eventParams = {
        ...parameters,
        timestamp: Date.now(),
        user_agent: navigator.userAgent,
        screen_resolution: `${screen.width}x${screen.height}`
      }
      
      window.gtag('event', eventName, eventParams)
      
      // Log en desarrollo para debugging
      if (import.meta.env.DEV) {
        console.log('Analytics Event:', eventName, eventParams)
      }
    }
  }

  // Función para rastrear páginas
  const trackPageView = (pagePath, pageTitle) => {
    if (!isTrackingEnabled()) return

    if (typeof window !== 'undefined' && window.gtag) {
      const { measurementId } = analyticsConfig.googleAnalytics
      
      window.gtag('config', measurementId, {
        page_path: pagePath,
        page_title: pageTitle,
        custom_map: {
          dimension1: 'user_type',
          dimension2: 'traffic_source'
        }
      })
      
      // Log en desarrollo
      if (import.meta.env.DEV) {
        console.log('Analytics Page View:', pagePath, pageTitle)
      }
    }
  }

  // Función para rastrear conversiones
  const trackConversion = (conversionId, conversionLabel, value = null) => {
    if (!isTrackingEnabled()) return

    if (typeof window !== 'undefined' && window.gtag) {
      const params = {
        send_to: `${conversionId}/${conversionLabel}`
      }
      if (value) params.value = value
      
      window.gtag('event', 'conversion', params)
      
      if (import.meta.env.DEV) {
        console.log('Analytics Conversion:', conversionId, conversionLabel, value)
      }
    }
  }

  // Eventos específicos del portfolio
  const trackProjectView = (projectId, projectName) => {
    trackEvent('view_project', {
      project_id: projectId,
      project_name: projectName,
      event_category: 'Portfolio',
      event_label: projectName
    })
  }

  const trackContactAction = (action) => {
    trackEvent('contact_action', {
      action: action,
      event_category: 'Contact',
      event_label: action
    })
  }

  const trackDownload = (fileName) => {
    trackEvent('file_download', {
      file_name: fileName,
      event_category: 'Download',
      event_label: fileName
    })
  }

  return {
    isInitialized,
    initializeGA,
    trackEvent,
    trackPageView,
    trackConversion,
    trackProjectView,
    trackContactAction,
    trackDownload
  }
}