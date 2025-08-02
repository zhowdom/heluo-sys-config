
import { createRouter, createWebHashHistory } from 'vue-router'
import home from '../views/home/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home', // 首页
      component: home
    },
    {
      path: '/layer/:spaceId',
      name: 'layer', // 楼层二级页面
      // 路由级代码分割（懒加载）
      component: () => import('../views/layer/index.vue')
    },
    {
      path: '/environment',
      name: 'environment', // 环境
      component: () => import('../views/environment/index.vue')
    },
    {
      path: '/security',
      name: 'security', // 安防
      component: () => import('../views/security/index.vue')
    },
    {
      path: '/electricity',
      name: 'electricity', // 机电
      component: () => import('../views/electricity/index.vue')
    },





    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/testcomp',
      name: 'testcomp',
      component: () => import('../views/testcomp/index.vue')
    }
  ]
})

export default router