<template>
  <a
    v-if="isExternalLink"
    :href="props.to"
    target="_blank"
    rel="noopener noreferrer"
    class="external-link"
  >
    <slot />
  </a>

  <RouterLink
    v-else
    :to="props.to"
    :replace="props.replace"
    :active-class="props.activeClass"
    :exact-active-class="props.exactActiveClass"
    :custom="true"
    v-slot="{ href, isActive, isExactActive, navigate }"
  >
    <a
      :href="href"
      :class="getLinkClasses(isActive, isExactActive)"
      @click="navigate"
    >
      <slot />
    </a>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

const props = defineProps({
  ...((RouterLink as any).props || {}),
  inactiveClass: String,
  to: {
    type: [String, Object],
    required: true,
  },
})

const getLinkClasses = (isActive: boolean, isExactActive: boolean) => [
  isActive && (props.activeClass || 'router-link-active'),
  isExactActive && (props.exactActiveClass || 'router-link-exact-active'),
  !isActive && props.inactiveClass,
].filter(Boolean)

const isExternalLink = computed(
  () => typeof props.to === 'string' && props.to.startsWith('http')
)
</script>