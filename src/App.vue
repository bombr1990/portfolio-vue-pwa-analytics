<template>
  <div id="app">
    <header>
      <div class="container">
        <nav class="nav-container">
          <router-link to="/" class="logo">Portafolio</router-link>
          <div class="nav-links">
            <router-link to="/" class="nav-link">Inicio</router-link>
            <router-link to="/contact" class="nav-link">Contacto</router-link>
          </div>
        </nav>
      </div>
    </header>

    <main class="container">
      <router-view />
    </main>

    <footer>
      <div class="container">
        <p>&copy; 2025 Portafolio. Todos los derechos reservados.</p>
      </div>
    </footer>

    <!-- Componente opcional para consentimiento de cookies -->
    <CookieConsent v-if="showCookieConsent" />
  </div>
</template>

<script>
import { ref } from 'vue'
import CookieConsent from './components/CookieConsent.vue'
import { analyticsConfig } from './config/analytics.js'

export default {
  name: 'App',
  components: {
    CookieConsent
  },
  setup() {
    // Solo mostrar el banner de cookies si está habilitado en la configuración
    const showCookieConsent = ref(analyticsConfig.privacy.cookieConsent)
    
    return {
      showCookieConsent
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --color-text-light: #666666;
  --color-border: #e5e5e5;
  --color-hover: #f5f5f5;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
  color: var(--color-text);
  background-color: var(--color-bg);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* Header */
header {
  padding: 40px 0;
  border-bottom: 1px solid var(--color-border);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: 600;
  letter-spacing: -0.02em;
  text-decoration: none;
  color: var(--color-text);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  text-decoration: none;
  color: var(--color-text-light);
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link.router-link-active {
  color: var(--color-text);
  font-weight: 600;
}

/* Main Content */
main {
  min-height: calc(100vh - 200px);
  padding: 60px 0;
}

/* Footer */
footer {
  padding: 40px 0;
  border-top: 1px solid var(--color-border);
  margin-top: 80px;
}

footer p {
  font-size: 14px;
  color: var(--color-text-light);
  text-align: center;
}

/* Responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }

  header {
    padding: 24px 0;
  }

  main {
    padding: 40px 0;
  }
}
</style>
