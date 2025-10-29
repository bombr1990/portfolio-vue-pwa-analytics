<template>
  <div v-if="showBanner" class="cookie-consent-banner">
    <div class="cookie-content">
      <h3>🍪 Cookies y Analytics</h3>
      <p>
        Este sitio utiliza Google Analytics para entender cómo los visitantes interactúan con el sitio web.
        Los datos se recopilan de forma anónima y nos ayudan a mejorar tu experiencia.
      </p>
      <div class="cookie-actions">
        <button @click="acceptCookies" class="btn btn-accept">
          Aceptar
        </button>
        <button @click="declineCookies" class="btn btn-decline">
          Rechazar
        </button>
        <button @click="showDetails = !showDetails" class="btn btn-details">
          Más información
        </button>
      </div>
      
      <div v-if="showDetails" class="cookie-details">
        <h4>¿Qué datos recopilamos?</h4>
        <ul>
          <li>Páginas visitadas y tiempo en el sitio</li>
          <li>Proyectos visualizados</li>
          <li>Interacciones con formularios</li>
          <li>Información técnica del navegador (anónima)</li>
        </ul>
        <p>
          <strong>No recopilamos:</strong> información personal identificable, 
          datos sensibles o información de contacto sin tu consentimiento explícito.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, inject } from 'vue'

export default {
  name: 'CookieConsent',
  setup() {
    const showBanner = ref(false)
    const showDetails = ref(false)
    const analytics = inject('analytics')
    
    const CONSENT_KEY = 'analytics_consent'
    
    onMounted(() => {
      // Verificar si ya se dio consentimiento
      const consent = localStorage.getItem(CONSENT_KEY)
      if (!consent) {
        showBanner.value = true
      }
    })
    
    const acceptCookies = () => {
      localStorage.setItem(CONSENT_KEY, 'accepted')
      showBanner.value = false
      
      // Actualizar consentimiento en GA
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted'
        })
      }
      
      // Trackear consentimiento
      if (analytics) {
        analytics.trackEvent('cookie_consent', {
          action: 'accepted',
          event_category: 'Privacy',
          event_label: 'Analytics Cookies Accepted'
        })
      }
    }
    
    const declineCookies = () => {
      localStorage.setItem(CONSENT_KEY, 'declined')
      showBanner.value = false
      
      // Mantener consentimiento denegado en GA
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied'
        })
      }
      
      // Solo trackear si ya estaba habilitado
      if (analytics) {
        analytics.trackEvent('cookie_consent', {
          action: 'declined',
          event_category: 'Privacy',
          event_label: 'Analytics Cookies Declined'
        })
      }
    }
    
    return {
      showBanner,
      showDetails,
      acceptCookies,
      declineCookies
    }
  }
}
</script>

<style scoped>
.cookie-consent-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #2c3e50;
  color: white;
  z-index: 1000;
  padding: 1rem;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.cookie-content {
  max-width: 1200px;
  margin: 0 auto;
}

.cookie-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.cookie-content p {
  margin: 0 0 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5;
  opacity: 0.9;
}

.cookie-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.btn-accept {
  background: #27ae60;
  color: white;
}

.btn-accept:hover {
  background: #219a52;
}

.btn-decline {
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn-decline:hover {
  background: rgba(255, 255, 255, 0.1);
}

.btn-details {
  background: transparent;
  color: #3498db;
  border: 1px solid #3498db;
}

.btn-details:hover {
  background: #3498db;
  color: white;
}

.cookie-details {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.85rem;
}

.cookie-details h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.cookie-details ul {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
}

.cookie-details li {
  margin: 0.25rem 0;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .cookie-consent-banner {
    padding: 1rem 0.5rem;
  }
  
  .cookie-actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
    margin-bottom: 0.25rem;
  }
}
</style>