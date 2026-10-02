<template>
  <section v-if="experience" class="experience">
    <h1>{{ experience.name }}</h1>
    <img 
      :src="`/images/${experience.image}`" 
      :alt="experience.name" 
    />
    <p>{{ experience.description }}</p>
  </section>
  <section v-else>
    <p>Experience not found</p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import sourceData from '@/data.json'

const props = defineProps({
  id: { type: Number, required: true },
  experienceSlug: { type: String, required: true }
})

const destination = computed(() => sourceData.destinations.find((destination) => destination.id === props.id))
const experience = computed(() => destination.value?.experiences.find((exp) => exp.slug === props.experienceSlug))
</script>