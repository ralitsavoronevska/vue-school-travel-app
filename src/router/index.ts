import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized } from 'vue-router'
import Home from '@/views/Home.vue'
import sourceData from '@/data.json'

interface ComponentShowProps {
  id: number
}

const routes: RouteRecordRaw[] = [
    { 
      path: '/', 
      name: 'Home', 
      component: Home, 
      alias: '/home'
    },
    // { path: '/home', redirect: '/' }, // same effect as the alias property above
    // will match everything and put it under `route.params.pathMatch`
    { 
      path: '/:pathMatch(.*)*', 
      name: 'NotFound', 
      component: () => import('@/views/NotFound.vue') 
    },
    { 
      path: '/protected', 
      name: 'protected', 
      components: {
        default: () => import('@/views/Protected.vue'),
        LeftSidebar: () => import('@/components/LeftSidebar.vue')
      },
      meta: { requiresAuth: true } 
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/invoices',
      name: 'invoices',
      components: {
        default: () => import('@/views/Invoices.vue'),
        LeftSidebar: () => import('@/components/LeftSidebar.vue')
      },
      meta: { requiresAuth: true }
    },
    // {
    //   path: '/orderId(\\d+)',
    //   name: 'orders',
    //   redirect: { name: 'Home' },
    // },
    // {
    //   path: '/productName',
    //   name: 'product',
    //   redirect: { name: 'Home' },
    // },
    {
      path: '/example/:id(\\d+)', 
      // If we change the param to anything different than a number in the URL, it will not match this route and will instead match the NotFound route. 
      // For example, /example/1 will match this route, but /example/abc will not match this route and will instead match the NotFound route.

      // '/example/:id+' => will match no matter how many slashes we add after /example, e.g. /example/1, /example/1/2, /example/1/2/3, etc.

      // '/example/:id(\\d+)+' => a repeatable parameter that can only match numbers, e.g. /example/1, /example/1/2, /example/1/2/3, etc.
      // Visiting /example will not match this route and will instead match the NotFound route. 
      // It does make the param required, so /example will not match, but /example/1 will match. If you want to make it optional, without allowing it to be repeatable, you can use the ? modifier after the +, e.g. /example/:id(\\d+)? which will match /example, /example/1, /example/1/2, /example/1/2/3, etc.

      // '/example/:id(\\d+)*' will match no matter how many slashes we add after /example, but only if the first parameter is a number, 
      // e.g. /example/1, /example/1/2, /example/1/2/3, etc. It also makes the param optional, so /example will match this route, 
      // but /example/abc will not match this route and will instead match the NotFound route.
      name: 'example',
      component: () => import('@/views/Login.vue')
    },
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
  scrollBehavior(_, __, savedPosition) {
    return savedPosition || new Promise ((resolve) => {
      setTimeout(() => {
        resolve({ top: 0, behavior: 'smooth' })
      }, 3000)
    })
  }
})

// Global Navigation Guard
// this function will be fired on every route change, before the route is confirmed
router.beforeEach((to, _) => {
  if (to.meta.requiresAuth && !(window as any).user) {
    return { name: 'login', query: { redirect: to.fullPath } }
  } 
})

export default router