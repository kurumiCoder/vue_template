import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes' // 关键：从虚拟模块导入自动生成的路由

const router = createRouter({
  // 来源vite.config.ts中的base，默认为'/'
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // 直接使用自动生成的路由
})

export default router
