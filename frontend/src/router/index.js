import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Inventory from '../views/Inventory.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user/inventory',
    name: 'Inventory',
    component: Inventory
  },
  { 
    path: '/user/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
