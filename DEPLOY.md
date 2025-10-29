# 🚀 Guía de Despliegue en Netlify

## ✅ Paso 1: Acceder a Netlify

1. Ve a: **https://app.netlify.com**
2. Inicia sesión (o crea cuenta con GitHub)

## ✅ Paso 2: Importar Proyecto

1. Haz clic en **"Add new site"** o **"Import an existing project"**
2. Selecciona **"Import from Git"**
3. Elige **"GitHub"**
4. Autoriza a Netlify si es primera vez
5. Busca y selecciona: **`portfolio-vue-pwa-analytics`**

## ✅ Paso 3: Configurar Build

Netlify detectará automáticamente Vite. Verifica:

```
Branch to deploy: main
Build command: npm run build
Publish directory: dist
```

## ✅ Paso 4: Variables de Entorno

Haz clic en **"Show advanced"** o **"Advanced build settings"**

Agrega estas variables (haz clic en "New variable" para cada una):

### Variable 1:
- **Key**: `VITE_GA_MEASUREMENT_ID`
- **Value**: `G-XXXXXXXXXX` (cambiarás esto después con tu ID real)

### Variable 2:
- **Key**: `VITE_ENABLE_ANALYTICS`
- **Value**: `true`

### Variable 3:
- **Key**: `VITE_NETLIFY_ANALYTICS`
- **Value**: `true`

### Variable 4:
- **Key**: `VITE_ENVIRONMENT`
- **Value**: `production`

## ✅ Paso 5: Deploy

1. Haz clic en **"Deploy site"**
2. Espera 2-3 minutos mientras se construye
3. ¡Tu sitio estará online!

## 📝 Paso 6: Obtener URL del Sitio

Una vez desplegado:

1. Copia la URL generada (ejemplo: `https://random-name-123.netlify.app`)
2. Puedes cambiar el nombre del sitio en: **Site settings → Domain management → Options → Change site name**

---

## 🎯 Después del Despliegue

### A. Configurar Google Analytics

1. Ve a: **https://analytics.google.com**
2. Crea una cuenta y propiedad (si no la tienes)
3. Configura un "Web Stream" con la URL de Netlify
4. Copia tu **Measurement ID** (formato: G-XXXXXXXXXX)

### B. Actualizar Variables de Entorno

1. En Netlify, ve a: **Site settings → Environment variables**
2. Edita `VITE_GA_MEASUREMENT_ID`
3. Reemplaza `G-XXXXXXXXXX` con tu ID real
4. Guarda los cambios

### C. Redesplegar

1. Ve a: **Deploys**
2. Haz clic en **"Trigger deploy"** → **"Deploy site"**
3. ¡Listo! Analytics funcionando

---

## 🔧 Configuración Opcional

### Netlify Analytics (Servidor)

1. Ve a: **Site settings → Analytics**
2. Haz clic en **"Enable Analytics"** 
3. Prueba gratis 14 días ($9/mes después)
4. O usa solo Google Analytics (gratis)

### Custom Domain

1. Ve a: **Site settings → Domain management**
2. Haz clic en **"Add custom domain"**
3. Sigue las instrucciones para tu dominio

### HTTPS

- ✅ Automático con Let's Encrypt
- ✅ Ya está configurado

---

## ✨ URLs Importantes

- **Tu repositorio**: https://github.com/bombr1990/portfolio-vue-pwa-analytics
- **Netlify Dashboard**: https://app.netlify.com
- **Google Analytics**: https://analytics.google.com

---

## 🆘 Solución de Problemas

### Build falla
- Verifica que `package.json` tenga todos los scripts
- Revisa los logs del build en Netlify

### Página en blanco
- Verifica que "Publish directory" sea `dist`
- Revisa la consola del navegador por errores

### Analytics no funciona
- Espera 24-48 horas para ver datos en GA4
- Verifica que el Measurement ID sea correcto
- Usa modo incógnito para testear

---

## 📊 Verificar que Funciona

1. Abre tu sitio en Netlify
2. Abre la consola del navegador (F12)
3. Navega por el sitio
4. Deberías ver logs de "Analytics Event" si está en desarrollo
5. En producción, verifica en Google Analytics Real-time

¡Éxito! 🎉