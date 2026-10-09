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

    <!-- Sidebar -->
    <router-view v-slot="{ Component }" class="view left-sidebar" name="LeftSidebar">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path"></component>
      </transition>
    </router-view>
    <!-- Main -->
    <router-view v-slot="{ Component }" class="view main-view">
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

.container {
  display: flex;
}

.left-sidebar {
  width: 20%;
}

.main-view {
  width: 100%;
}
</style>