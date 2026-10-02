<template>
  <div class="card">
    <img 
      :src="`/images/${experience.image}`" 
      :alt="experience.name" 
    />
    <span class="card__text">
      {{ experience.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  experience: {
    type: Object as () => {
      name: string
      slug: string
      image: string
      description: string
    },
    required: true
  }
})
</script>