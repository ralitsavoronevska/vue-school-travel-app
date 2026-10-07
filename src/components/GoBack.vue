<template>
  <span class="go-back">
      <button @click="goBack">Go Back</button>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = computed(() => {
  return () => {
    router.back()
  }
})
</script>