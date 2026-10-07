<template>
  <div>
    <section v-if="destination" class="destination">
      <h1>{{ destination?.name }}</h1>
      <GoBack />
      <div class="destination-details">
        <img 
          :src="`/images/${destination?.image}`" 
          :alt="destination?.name" 
        />
        <p>{{ destination?.description }}</p>
      </div>
    </section>
    <section class="experiences">
      <h2>Top Experiences in {{ destination?.name }}</h2>
      <div class="cards">
        <AppLink 
          :to="{ name: 'experience.show', params: { id: props.id, experienceSlug: experience.slug } }" 
          v-for="experience in destination?.experiences" 
          :key="experience.slug"
        >
          <ExperienceCard 
            :experience="experience" 
          />
        </AppLink>
      </div>  
      <router-view></router-view>
    </section>
  </div>  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import sourceData from '@/data.json'
import ExperienceCard from '@/components/ExperienceCard.vue'
import GoBack from '@/components/GoBack.vue'

const destinationData = sourceData

const props = defineProps({
  id: { type: Number, required: true },
})

// The comments below are for reference and can be uncommented if you want to fetch data from an API instead of using local JSON data
// That is one way to do it, but for this example, we are using local JSON data for simplicity

// interface Experience {
//   name: string
//   slug: string
//   image: string
//   id: number
//   description: string
// }

// interface Destination {
//   name: string
//   slug: string
//   image: string
//   id: number
//   description: string
//   experiences: Experience[]
// }

// const destination = ref<Destination | null>(null)

const destination = computed(() => destinationData.destinations.find((destination) => destination.id === props.id))

// const initData = async () => {
//     const response = await fetch(`https://travel-dummy-api.netlify.app/${route.params.slug}.json`)
//     destination.value = (await response.json()) as Destination
// }

// onMounted(() => {
//   initData()
// })

// watch(
//   () => route.params,
//   () => {
//     initData()
//   }
// )
</script>