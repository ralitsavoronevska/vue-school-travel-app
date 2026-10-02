import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Home from '@/views/Home.vue'

interface DestinationShowProps {
  id: number
}

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'Home', component: Home},
    { 
      path: '/destination/:id/:slug', 
      name: 'destination.show', 
      component: () => import('@/views/DestinationShow.vue'),
      props: (route: RouteLocationNormalized): DestinationShowProps => ({
        id: parseInt(route.params.id as string),
      }),
      children: [
        { 
          path: ':experienceSlug', 
          name: 'experience.show', 
          component: () => import('@/views/ExperienceShow.vue'),
          props: (route: RouteLocationNormalized) => ({
            id: parseInt(route.params.id as string),
            experienceSlug: route.params.experienceSlug as string,
          })
        }
      ]
    },
    
  ]

const router = createRouter({
    // process.env.BASE_URL
  history: createWebHistory(),
  routes: routes,
})

export default router