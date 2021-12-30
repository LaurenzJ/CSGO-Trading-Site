import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Inventory from '../views/Inventory.vue'
// import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/user/inventory',
    name: 'Inventory',
    component: Inventory // didnt work to import here --> params {steamid}
  },
  { 
    path: '/user/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('../views/Cart.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
