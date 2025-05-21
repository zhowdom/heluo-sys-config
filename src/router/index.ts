
import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/layer',
      name: 'layer',
      // 路由级代码分割（懒加载）
      component: () => import('../views/layer/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    }
  ]
})

export default router