<template>
  <a
    v-if="isExternal && typeof props.to === 'string'"
    :href="props.to"
    target="_blank"
    rel="noopener noreferrer"
    class="external-link"
  >
    <slot />
  </a>
  <routerLink 
    v-else 
    v-bind="$props"
    class="internal-link"
    >
    <slot />
  </routerLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { type RouterLinkProps } from 'vue-router'

const props = defineProps<RouterLinkProps>()

const isExternal = computed(() => {
  return typeof props.to === 'string' && props.to.startsWith('http')
})
</script>