<template>
  <div class="project-detail" v-if="project">
    <router-link to="/" class="back-button">
      Volver a proyectos
    </router-link>
    <img 
      :src="project.image" 
      :alt="project.title"
      class="project-detail-image"
    >
    <div class="project-detail-category">{{ project.category }}</div>
    <h2 class="project-detail-title">{{ project.title }}</h2>
    <p class="project-detail-description">{{ project.description }}</p>
  </div>
  <div v-else class="loading">
    Cargando proyecto...
  </div>
</template>

<script>
import { ref, onMounted, watch, inject } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'ProjectDetail',
  setup() {
    const route = useRoute()
    const project = ref(null)
    const analytics = inject('analytics')

    const loadProject = async () => {
      try {
        const response = await fetch('https://69026ebcb208b24affe62669.mockapi.io/PortfolioJsAdv/designProjects')
        const projects = await response.json()
        const projectId = route.params.id
        // Comparar como string ya que la API devuelve id como string
        project.value = projects.find(p => p.id === projectId || p.id === String(projectId))
        
        if (!project.value) {
          console.error('Proyecto no encontrado')
        } else {
          // Trackear visualización del proyecto
          if (analytics) {
            analytics.trackProjectView(project.value.id, project.value.title)
            
            // Trackear tiempo de visualización
            const startTime = Date.now()
            window.addEventListener('beforeunload', () => {
              const timeSpent = Math.round((Date.now() - startTime) / 1000)
              analytics.trackEvent('project_time_spent', {
                project_id: project.value.id,
                project_title: project.value.title,
                time_spent: timeSpent,
                event_category: 'Engagement',
                event_label: `${timeSpent}s`
              })
            })
          }
        }
      } catch (error) {
        console.error('Error cargando proyecto:', error)
        if (analytics) {
          analytics.trackEvent('project_load_error', {
            project_id: route.params.id,
            error: error.message,
            event_category: 'Error'
          })
        }
      }
    }

    onMounted(() => {
      loadProject()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    watch(() => route.params.id, () => {
      loadProject()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })

    return {
      project
    }
  }
}
</script>

<style scoped>
.project-detail {
  max-width: 900px;
  margin: 0 auto;
}

.back-button {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  color: #1a1a1a;
  text-decoration: none;
  margin-bottom: 48px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.back-button:hover {
  color: #666666;
}

.back-button::before {
  content: '←';
  margin-right: 8px;
  font-size: 18px;
}

.project-detail-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 40px;
}

.project-detail-category {
  font-size: 13px;
  font-weight: 500;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.project-detail-title {
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 24px;
  letter-spacing: -0.03em;
  line-height: 1.2;
}

.project-detail-description {
  font-size: 18px;
  color: #666666;
  line-height: 1.8;
}

.loading {
  text-align: center;
  padding: 60px 0;
  color: #666666;
}

@media (max-width: 768px) {
  .project-detail-title {
    font-size: 36px;
  }

  .project-detail-description {
    font-size: 16px;
  }
}
</style>
