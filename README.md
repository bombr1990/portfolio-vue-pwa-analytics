# 🎨 Portfolio Vue PWA con Google Analytics

Un portfolio moderno desarrollado con Vue 3, Vite, y Google Analytics 4 integrado.

## ✨ Características

- 🚀 **Vue 3** con Composition API
- ⚡ **Vite** para desarrollo rápido
- 📱 **PWA** (Progressive Web App)
- 📊 **Google Analytics 4** integrado
- 🍪 **Gestión de cookies** conforme a GDPR
- 📱 **Responsive design**
- 🎯 **API externa** para proyectos
- 🔄 **Vue Router** para navegación

## 🚀 Inicio Rápido

```bash
# Clonar repositorio
git clone [tu-repo]
cd portfolio-vue-PWA-mockapi-Netlify-Analytics

# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📊 Configuración de Analytics

### Google Analytics 4
1. Crear cuenta en [Google Analytics](https://analytics.google.com/)
2. Obtener Measurement ID (G-XXXXXXXXXX)
3. Configurar variables de entorno:

```bash
# .env.production
VITE_GA_MEASUREMENT_ID=G-TU_ID_REAL
VITE_ENABLE_ANALYTICS=true
```

### Netlify Analytics
1. Habilitar en el dashboard de Netlify
2. El archivo `netlify.toml` ya está configurado

📚 **Documentación completa**: Ver [docs/ANALYTICS.md](./docs/ANALYTICS.md)

## 🛠️ Estructura del Proyecto

```
├── docs/                  # Documentación
│   ├── ANALYTICS.md      # Guía de Google Analytics
│   └── DEPLOY.md         # Guía de despliegue
├── public/               # Archivos estáticos
│   ├── Images/          # Imágenes de proyectos
│   └── projects.json    # Datos de proyectos
├── scripts/             # Scripts de automatización
│   └── setup-analytics.sh
├── src/
│   ├── components/      # Componentes Vue
│   │   ├── ProjectCard.vue
│   │   └── CookieConsent.vue
│   ├── views/          # Páginas principales
│   │   ├── Home.vue
│   │   ├── Contact.vue
│   │   └── ProjectDetail.vue
│   ├── composables/    # Lógica reutilizable
│   │   └── useAnalytics.js
│   ├── config/         # Configuración
│   │   └── analytics.js
│   ├── plugins/        # Plugins Vue
│   │   └── analytics.js
│   └── router/         # Configuración de rutas
│       └── index.js
├── .env.example        # Plantilla de variables
├── netlify.toml        # Configuración Netlify
└── vite.config.js      # Configuración Vite
```

## 📈 Eventos Tracked

### Automático
- ✅ Page views y navegación
- ✅ Clicks en proyectos
- ✅ Tiempo en páginas
- ✅ Interacciones con formularios
- ✅ Errores de carga

### Manual
```javascript
// Ejemplo de uso en componentes
const analytics = inject('analytics')

// Trackear evento personalizado
analytics.trackEvent('custom_action', {
  category: 'User Interaction',
  label: 'Button Click'
})

// Trackear conversión
analytics.trackConversion('AW-ID', 'LABEL', 1)
```

## �️ Tecnologías Utilizadas

- **Vue 3** - Framework principal
- **Vite** - Build tool y dev server
- **Vue Router** - Enrutamiento SPA
- **Workbox** - Service Worker para PWA
- **Google Analytics 4** - Web analytics
- **MockAPI** - API externa para datos

## 🌐 Despliegue

### Netlify (Recomendado)
1. Conectar repositorio en Netlify
2. Configurar variables de entorno:
   - `VITE_GA_MEASUREMENT_ID`
   - `VITE_ENABLE_ANALYTICS=true`
3. Deploy automático con cada push

### Otros Proveedores
- Vercel
- GitHub Pages
- Firebase Hosting

## 🛡️ Privacidad

- ✅ Respeta Do Not Track
- ✅ Anonimiza IPs
- ✅ Consentimiento de cookies opcional
- ✅ Cumplimiento GDPR
- ✅ No tracking en desarrollo

## 📱 PWA Features

- ✅ Service Worker
- ✅ Manifest.json
- ✅ Instalable en móviles
- ✅ Funciona offline (cached)
- ✅ Updates automáticos

## 🔄 API

Los proyectos se cargan desde MockAPI:
```
GET https://69026ebcb208b24affe62669.mockapi.io/PortfolioJsAdv/designProjects
```

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

---

## 📞 Soporte

Para más información sobre configuración de analytics, consultar [docs/ANALYTICS.md](./docs/ANALYTICS.md).

### Documentación Adicional
- 📊 [Guía de Analytics](./docs/ANALYTICS.md) - Configuración completa de Google Analytics
- 🚀 [Guía de Despliegue](./docs/DEPLOY.md) - Paso a paso para Netlify

**Vue 3 + Vite Template**: Este proyecto está basado en el template oficial de Vue 3 con Vite. Consultar la [documentación oficial](https://vuejs.org/guide/scaling-up/tooling.html#ide-support) para más detalles.
