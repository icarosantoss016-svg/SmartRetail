import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/',
      redirect: '/produto' 
    },
    {
      path: '/vitrine', 
      name: 'vitrines',
      component: () => import('../views/VitrineView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/produto', 
      name: 'produtos',
      component: () => import('../views/ProdutosView.vue'),
      meta: { requiresAuth: true } 
    },
    {
      path: '/gestaovitrine',
      name: 'gestaoVitrine',
      component: () => import('../views/GestaoVitrineView.vue'),
      meta: { requiresAuth: true } 
    }
  ],
})


router.beforeEach((to) => {
  const precisaAuth = to.matched.some((record) => record.meta.requiresAuth)
  const estaAutenticado = store.getters['auth/estaAutenticado'] 

  if (precisaAuth && !estaAutenticado) {
    return '/login' 
  }
})

export default router  