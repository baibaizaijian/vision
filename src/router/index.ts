import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from 'vue'
// 定义路由
const routes = [
  {
    path: '/sellerPage',
    name: 'Home',
    component: (): Component => import('@/views/SellerPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
