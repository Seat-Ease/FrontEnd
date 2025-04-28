import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import FloorPlan from '@/pages/FloorPlan.vue'
import Reservation from '@/pages/Reservation.vue'
import Settings from '@/pages/Settings.vue'
import Tables from '@/pages/Tables.vue'
import WaitList from '@/pages/WaitList.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import Home from '@/pages/Home.vue'
import Signup from '@/pages/Signup.vue'
import Login from '@/pages/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/signup',
          name: 'signup',
          component: Signup,
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
      ],
    },
    {
      path: '/app',
      name: 'app',
      component: AppLayout,
      children: [
        {
          path: '/app',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: '/app/floorplan',
          name: 'floor plan',
          component: FloorPlan,
        },
        // {
        //   path: '/tables',
        //   name: 'tables',
        //   component: Tables,
        // },
        {
          path: '/app/settings',
          name: 'settings',
          component: Settings,
        },
        {
          path: '/app/reservations',
          name: 'reservations',
          component: Reservation,
        },
        {
          path: '/app/waitlist',
          name: 'wait list',
          component: WaitList,
        },
      ],
    },
  ],
})

export default router
