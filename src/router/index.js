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
import { app } from '@/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { settingsStore } from '@/stores/settingsStore'

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
      meta: { requiresAuth: true },
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

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    onAuthStateChanged(getAuth(app), async (userConnected) => {
      if (userConnected) {
        const data = await settingsStore().loadRestaurantData(userConnected.uid)
        settingsStore().setRestaurantData(data)
      }
    })
    if (settingsStore().getAccountUID) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
