import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'percentage',
      component: () => import('../views/Percentage.vue'),
    },
    {
      path: '/borough',
      name: 'borough',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Boroughs.vue'),
    },
  ],
})

export default router
