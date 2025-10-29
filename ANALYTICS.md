# 📊 Configuración de Google Analytics

Este proyecto incluye una implementación completa de Google Analytics 4.

## 🚀 Configuración Rápida

### Google Analytics 4

1. **Crear cuenta en GA4**:
   - Ve a [Google Analytics](https://analytics.google.com/)
   - Crea una nueva propiedad GA4
   - Obtén tu `Measurement ID` (formato: G-XXXXXXXXXX)

2. **Configurar variables de entorno**:
   ```bash
   # .env.production
   VITE_GA_MEASUREMENT_ID=G-TU_ID_REAL
   VITE_ENABLE_ANALYTICS=true
   ```

3. **Actualizar configuración**:
   ```javascript
   // src/config/analytics.js
   export const analyticsConfig = {
     googleAnalytics: {
       measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,
       enabled: import.meta.env.VITE_ENABLE_ANALYTICS === 'true'
     }
   }
   ```

## 📈 Eventos Tracked Automáticamente

### Navegación
- ✅ Page views
- ✅ Route changes
- ✅ Time on page

### Portfolio
- ✅ Project card clicks
- ✅ Project detail views
- ✅ Time spent viewing projects
- ✅ Project load errors

### Contacto
- ✅ Contact page views
- ✅ Form field interactions
- ✅ Form submissions
- ✅ Form errors

### Engagement
- ✅ External link clicks
- ✅ File downloads
- ✅ Error tracking

## 🔧 Uso en Componentes

### Tracking Manual de Eventos

```vue
<script>
import { inject } from 'vue'

export default {
  setup() {
    const analytics = inject('analytics')
    
    const trackCustomEvent = () => {
      analytics.trackEvent('custom_action', {
        category: 'User Interaction',
        label: 'Button Click',
        value: 1
      })
    }
    
    return { trackCustomEvent }
  }
}
</script>
```

### Tracking de Conversiones

```javascript
// Ejemplo para trackear descarga de CV
const trackCVDownload = () => {
  analytics.trackConversion('AW-CONVERSION_ID', 'CV_Download', 1)
  analytics.trackDownload('CV_JohnDoe.pdf')
}
```

## 🛡️ Privacidad y GDPR

### Configuración de Cookies

```javascript
// src/config/analytics.js
export const analyticsConfig = {
  privacy: {
    cookieConsent: true, // Habilitar banner de cookies
    respectDoNotTrack: true,
    anonymizeIP: true
  }
}
```

### Consentimiento de Cookies

El componente `CookieConsent` maneja automáticamente:
- ✅ Consentimiento del usuario
- ✅ Almacenamiento local de preferencias  
- ✅ Configuración de GA4 según consentimiento
- ✅ Cumplimiento GDPR

## 📊 Métricas Disponibles en Google Analytics

- **Usuarios únicos**: Visitantes del portfolio
- **Sesiones**: Visitas al sitio
- **Page Views**: Páginas vistas
- **Bounce Rate**: Tasa de rebote
- **Engagement**: Tiempo en el sitio y páginas por sesión
- **Conversiones**: Formularios enviados, descargas
- **Eventos personalizados**: Clicks en proyectos, interacciones
- **Demografía**: País, idioma, dispositivo (si está habilitado)

## 🔍 Debugging

### Modo Desarrollo
```bash
# Los analytics están deshabilitados por defecto en desarrollo
# Para habilitar en dev:
VITE_ENABLE_ANALYTICS=true npm run dev
```

### Logs en Consola
En desarrollo, todos los eventos se logean en la consola:
```javascript
// Console output ejemplo:
Analytics Event: project_view {
  project_id: "1",
  project_name: "Mi Proyecto",
  timestamp: 1698765432000
}
```

## 📱 Eventos Personalizados

### Crear Nuevos Eventos

1. **Definir en configuración**:
   ```javascript
   // src/config/analytics.js
   customEvents: {
     portfolio: ['new_custom_event']
   }
   ```

2. **Implementar tracking**:
   ```javascript
   // En tu composable
   const trackNewEvent = (data) => {
     trackEvent('new_custom_event', {
       custom_parameter: data,
       event_category: 'Portfolio',
       event_label: 'Custom Action'
     })
   }
   ```

## 🚀 Despliegue

### Variables de Entorno en Netlify

1. Ve a Site settings → Environment variables
2. Agrega:
   ```
   VITE_GA_MEASUREMENT_ID = G-TU_ID_REAL
   VITE_ENABLE_ANALYTICS = true
   ```

### Build y Deploy
```bash
npm run build
# El deploy automático en Netlify configurará todo
```

## 📋 Checklist de Configuración

- [ ] Cuenta GA4 creada
- [ ] Measurement ID configurado
- [ ] Variables de entorno establecidas en Netlify
- [ ] Banner de cookies configurado (opcional)
- [ ] Eventos personalizados definidos
- [ ] Testing en producción realizado

## 🆘 Solución de Problemas

### Analytics no aparecen en GA4
1. Verificar Measurement ID
2. Confirmar que `VITE_ENABLE_ANALYTICS=true`
3. Esperar 24-48 horas para datos en GA4
4. Revisar consola del navegador por errores

### Banner de cookies no aparece
1. Verificar `cookieConsent: true` en config
2. Limpiar localStorage del navegador
3. Verificar que el componente está importado

### Eventos no se trackean
1. Confirmar que analytics está inicializado
2. Verificar logs en modo desarrollo
3. Revisar que los eventos están bien definidos

## 📚 Recursos Adicionales

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GDPR Compliance](https://support.google.com/analytics/answer/9019185)
- [GA4 Property Setup](https://support.google.com/analytics/answer/9304153)