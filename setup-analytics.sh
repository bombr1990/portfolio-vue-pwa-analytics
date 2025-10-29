#!/bin/bash

# Script de configuración de Analytics para Portfolio Vue
echo "🚀 Configurando Analytics para tu Portfolio..."

# Función para solicitar input del usuario
ask_input() {
    local prompt="$1"
    local var_name="$2"
    echo -n "$prompt: "
    read input
    if [ -n "$input" ]; then
        echo "$var_name=\"$input\"" >> .env.production
    fi
}

# Crear archivo .env.production si no existe
if [ ! -f .env.production ]; then
    echo "📝 Creando archivo de configuración de producción..."
    touch .env.production
else
    echo "⚠️  El archivo .env.production ya existe. Se agregará la configuración."
fi

echo ""
echo "📊 Configuración de Google Analytics 4"
echo "----------------------------------------"
echo "1. Ve a https://analytics.google.com/"
echo "2. Crea una nueva propiedad GA4"
echo "3. Copia tu Measurement ID (formato: G-XXXXXXXXXX)"
echo ""

ask_input "Tu Google Analytics Measurement ID (G-XXXXXXXXXX)" "VITE_GA_MEASUREMENT_ID"

echo ""
echo "🔧 ¿Habilitar analytics en producción? (y/n)"
read enable_analytics
if [ "$enable_analytics" = "y" ] || [ "$enable_analytics" = "Y" ]; then
    echo "VITE_ENABLE_ANALYTICS=true" >> .env.production
else
    echo "VITE_ENABLE_ANALYTICS=false" >> .env.production
fi

echo ""
echo "📈 ¿Habilitar Netlify Analytics? (y/n)"
read enable_netlify
if [ "$enable_netlify" = "y" ] || [ "$enable_netlify" = "Y" ]; then
    echo "VITE_NETLIFY_ANALYTICS=true" >> .env.production
else
    echo "VITE_NETLIFY_ANALYTICS=false" >> .env.production
fi

echo "VITE_ENVIRONMENT=production" >> .env.production

echo ""
echo "✅ Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Revisa el archivo .env.production generado"
echo "2. En Netlify, ve a Site settings → Environment variables"
echo "3. Agrega las variables de .env.production"
echo "4. Habilita Netlify Analytics en el dashboard"
echo "5. Haz deploy de tu sitio"
echo ""
echo "📚 Para más información, consulta ANALYTICS.md"