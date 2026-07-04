import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

//definindo as vue que vão carregar com as rotas
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: ()=> import('../views/LoginView.vue')
    },
    {
      path: '/',
      redirect: 'login' //aqui ele irá redirecionar ao dashboard
    }


  ],
})

//aqui ele verifica se o usuário tem ou não o token - se não estiver ele volta pro login
router.beforeEach((to, from, next)=>{
  const precisaAuth = to.matched.some((record)=> record.meta.requiresAuth)
  const estaAutenticado = store.getters['auth/estaAutenticado']

  if(precisaAuth && !estaAutenticado){
    next('/login')
  }else{
    next()
  }
})

export default router
