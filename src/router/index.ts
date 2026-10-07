import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Home from '@/views/Home.vue'
import sourceData from '@/data.json'

interface ComponentShowProps {
  id: number
}

const routes: RouteRecordRaw[] = [
    { path: '/', name: 'Home', component: Home, alias: '/home'},
    // will match everything and put it under `route.params.pathMatch`
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
    { 
      path: '/destination/:id/:slug', 
      name: 'destination.show', 
      component: () => import('@/views/DestinationShow.vue'),
      props: (route: RouteLocationNormalized): ComponentShowProps => ({
        id: parseInt(route.params.id as string),
      }),
      beforeEnter: (to, _) => {
        const exists = sourceData.destinations.find(destination => destination.id === parseInt(to.params.id as string))
        if (!exists) {
          return { 
            name: 'NotFound',
            // allows keeping the URL while rendering a different page
            params: { pathMatch: to.path.split('/').slice(1) },
            query: to.query,
            hash: to.hash
          }
        }
      },
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
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || new Promise ((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' })
      }, 3000)
    })
  }
})

export default router