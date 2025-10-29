<template>
  <div class="contact">
    <h1>Contacto</h1>
    <p class="subtitle">¿Tienes alguna pregunta o proyecto en mente? ¡Envíame un mensaje!</p>
    
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div class="form-group">
        <label for="name">Nombre</label>
        <input
          type="text"
          id="name"
          v-model="formData.name"
          placeholder="Tu nombre"
          required
          @focus="trackFormInteraction('name')"
        />
      </div>

      <div class="form-group">
        <label for="email">Correo</label>
        <input
          type="email"
          id="email"
          v-model="formData.email"
          placeholder="tu@email.com"
          required
          @focus="trackFormInteraction('email')"
        />
      </div>

      <div class="form-group">
        <label for="message">Mensaje</label>
        <textarea
          id="message"
          v-model="formData.message"
          placeholder="Escribe tu mensaje aquí..."
          rows="6"
          required
          @focus="trackFormInteraction('message')"
        ></textarea>
      </div>

      <button type="submit" class="submit-btn">Enviar mensaje</button>
    </form>

    <div v-if="submitMessage" class="message" :class="messageType">
      {{ submitMessage }}
    </div>
  </div>
</template>

<script>
import { inject, onMounted } from 'vue'

export default {
  name: 'Contact',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      submitMessage: '',
      messageType: ''
    }
  },
  setup() {
    const analytics = inject('analytics')
    
    onMounted(() => {
      // Trackear visualización de la página de contacto
      if (analytics) {
        analytics.trackEvent('contact_page_view', {
          event_category: 'Contact',
          event_label: 'Contact Page Viewed'
        })
      }
    })
    
    return {
      analytics
    }
  },
  methods: {
    handleSubmit() {
      // Trackear intento de envío de formulario
      if (this.analytics) {
        this.analytics.trackContactAction('form_submit_attempt')
      }
      
      // Aquí puedes integrar con un servicio de envío de emails
      // Por ahora, solo mostramos un mensaje de éxito
      console.log('Formulario enviado:', this.formData);
      
      this.submitMessage = '¡Mensaje enviado con éxito! Te contactaré pronto.';
      this.messageType = 'success';
      
      // Trackear envío exitoso
      if (this.analytics) {
        this.analytics.trackContactAction('form_submit_success')
        this.analytics.trackEvent('contact_form_submission', {
          form_type: 'contact',
          has_name: !!this.formData.name,
          has_email: !!this.formData.email,
          message_length: this.formData.message.length,
          event_category: 'Contact',
          event_label: 'Form Submitted'
        })
        
        // Trackear conversión si es relevante para tu negocio
        this.analytics.trackConversion('AW-CONVERSION_ID', 'CONVERSION_LABEL')
      }
      
      // Limpiar el formulario
      this.formData = {
        name: '',
        email: '',
        message: ''
      };
      
      // Ocultar el mensaje después de 5 segundos
      setTimeout(() => {
        this.submitMessage = '';
      }, 5000);
    },
    
    trackFormInteraction(field) {
      // Trackear interacciones con campos del formulario
      if (this.analytics) {
        this.analytics.trackEvent('form_field_focus', {
          field_name: field,
          event_category: 'Contact',
          event_label: `Field ${field} focused`
        })
      }
    }
  }
}
</script>

<style scoped>
.contact {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 2rem;
}

.contact-form {
  background: #f9f9f9;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  font-weight: 600;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.3s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #42b983;
}

textarea {
  resize: vertical;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #35a372;
}

.submit-btn:active {
  transform: scale(0.98);
}

.message {
  margin-top: 1.5rem;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  font-weight: 500;
}

.message.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.message.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

@media (max-width: 768px) {
  .contact {
    padding: 1rem;
  }

  .contact-form {
    padding: 1.5rem;
  }
}
</style>
