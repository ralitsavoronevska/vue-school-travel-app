<script setup lang="ts">
// The comments below are for reference and can be uncommented if you want to fetch data from an API instead of using local JSON data
// That is one way to do it, but for this example, we are using local JSON data for simplicity
// The other way is to use the local JSON data, which is what we are doing here
// The other alternative is shown in DestinationShow.vue, where we fetch data from an API instead of using local JSON data

import { useRoute } from 'vue-router'
import TheNavigation from './components/TheNavigation.vue';

const route = useRoute()

</script>

<template>
  <TheNavigation/>
  <div class="container">
    <!-- <router-view :key="route.path"></router-view> -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path"></component>
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
.fade-enter-active, 
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>