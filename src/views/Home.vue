<template>
  <div class="home-view">
    <h2>Proyectos</h2>
    <div class="projects-grid">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'

export default {
  name: 'Home',
  components: {
    ProjectCard
  },
  setup() {
    const projects = ref([])

    const loadProjects = async () => {
      try {
        const response = await fetch('https://69026ebcb208b24affe62669.mockapi.io/PortfolioJsAdv/designProjects')
        projects.value = await response.json()
      } catch (error) {
        console.error('Error cargando proyectos:', error)
      }
    }

    onMounted(() => {
      loadProjects()
    })

    return {
      projects
    }
  }
}
</script>

<style scoped>
.home-view h2 {
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 48px;
  letter-spacing: -0.02em;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 48px;
}

@media (max-width: 768px) {
  .home-view h2 {
    font-size: 28px;
    margin-bottom: 32px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
