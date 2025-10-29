<template>
  <router-link 
    :to="`/project/${project.id}`" 
    class="project-card"
    @click="trackProjectClick"
  >
    <img 
      :src="project.image" 
      :alt="project.title"
      class="project-image"
    >
    <div class="project-category">{{ project.category }}</div>
    <h3 class="project-title">{{ project.title }}</h3>
    <p class="project-description">{{ project.description }}</p>
  </router-link>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const analytics = inject('analytics')
    
    const trackProjectClick = () => {
      if (analytics) {
        analytics.trackEvent('project_card_click', {
          project_id: props.project.id,
          project_title: props.project.title,
          project_category: props.project.category,
          event_category: 'Portfolio',
          event_label: props.project.title
        })
      }
    }
    
    return {
      trackProjectClick
    }
  }
}
</script>

<style scoped>
.project-card {
  cursor: pointer;
  transition: transform 0.2s ease;
  text-decoration: none;
  color: inherit;
  display: block;
}

.project-card:hover {
  transform: translateY(-4px);
}

.project-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
}

.project-category {
  font-size: 13px;
  font-weight: 500;
  color: #666666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 8px;
}

.project-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  letter-spacing: -0.02em;
}

.project-description {
  font-size: 15px;
  color: #666666;
  line-height: 1.7;
}
</style>
