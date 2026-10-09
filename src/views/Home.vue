<template>
  <div class="home">
    <h1>All Destinations</h1>
    <!-- <button @click="triggerRouterError">Trigger Router Error</button> -->
    <button @click="addDynamicRoute">Add Dynamic Route</button>
    <router-link to="/dynamic">Visit Dynamic Route</router-link>
    <div class="destinations">
      <AppLink 
        v-for="destination in destinations" 
        :key="destination.id"
        :to="{name: 'destination.show', params: {id: destination.id, slug: destination.slug}}"
      >
        <h2>{{ destination.name }}</h2>
        <img 
          :src="`/images/${destination.image}`" 
          :alt="destination.name"
        >
      </AppLink>
    </div>  
  </div>
</template>

<script setup lang="ts">
import SourcedData from '@/data.json'
import { useRouter } from 'vue-router'
// import { isNavigationFailure, NavigationFailureType } from 'vue-router'

const router = useRouter()

const destinations = SourcedData.destinations

// const triggerRouterError = async () => {
//   // This will trigger a router error because the destination with id 999 does not exist
//   const navigationFailure = await router.push('/')

//   if (isNavigationFailure(navigationFailure, NavigationFailureType.duplicated)) {
//     console.log('navigationFailure.to:', navigationFailure.to)
//     console.log('navigationFailure.from:', navigationFailure.from)
//   } else {
//     // all is well, navigation was successful
//   }
// }

const addDynamicRoute = () => {
  // const removeDynamicRoute = 
  router.addRoute({
    name: "dynamic",
    path: "/dynamic",
    component: () => import('@/views/Login.vue')
  })
  // removeDynamicRoute()

  // Alternatively, you can also override an existing route by using the same name as an existing route. 
  // For example, if you have a route named "dynamic" and you want to override it, you can do the following:
  // router.addRoute({  
  //   name: "dynamic",
  //   path: "/different",
  //   component: () => import('@/views/Home.vue')
  // })

  // Lastly, you can also remove a route by using the removeRoute method. 
  // For example, if you want to remove the "dynamic" route, you can do the following:
  // router.removeRoute("dynamic")
}
</script>