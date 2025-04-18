import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import FloorPlan from '@/pages/FloorPlan.vue'
import Reservation from '@/pages/Reservation.vue'
import Settings from '@/pages/Settings.vue'
import Tables from '@/pages/Tables.vue'
import WaitList from '@/pages/WaitList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
    },
    {
      path: '/floorplan',
      name: 'floor plan',
      component: FloorPlan,
    },
    {
      path: '/tables',
      name: 'tables',
      component: Tables,
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: Reservation,
    },
    {
      path: '/waitlist',
      name: 'wait list',
      component: WaitList,
    },
  ],
})

export default router
