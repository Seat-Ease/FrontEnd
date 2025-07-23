import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/pages/Dashboard.vue'
import FloorPlan from '@/pages/FloorPlan.vue'
import Reservation from '@/pages/Reservation.vue'
import Settings from '@/pages/Settings.vue'
import WaitList from '@/pages/WaitList.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import Home from '@/pages/Home.vue'
import Signup from '@/pages/Signup.vue'
import Login from '@/pages/Login.vue'
import Booking from '@/pages/Booking.vue'
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { useUserStore } from '@/stores/userStore'
import { floorStore } from '@/stores/floorStore'
import { reservationStore } from '@/stores/reservationStore'
import { mainStore } from '@/stores/mainStore'
import { settingsStore } from '@/stores/settingsStore'
import { app } from '@/firebase'

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
    {
      path: '/booking/:id',
      name: 'booking',
      component: Booking,
    },
  ],
})

let isAuthInitialized = false

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (!requiresAuth) {
    // Route publique, pas besoin d'authentification ni de chargement de données
    return next()
  }

  // Pour les routes protégées, initialise l'auth si ce n'est pas déjà fait
  if (!isAuthInitialized) {
    await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(getAuth(app), async (firebaseUser) => {
        userStore.setUser(firebaseUser)
        if (!firebaseUser) {
          // Pas connecté, redirige vers /login
          userStore.setUser({ uid: 'dummy_uid', email: 'dummy_email@mail.com' })
          userStore.markAuthResolved()
          console.log(useUserStore().isAuthResolved)
          isAuthInitialized = true
          unsubscribe()
          resolve(true)
          next('/login')
          return
        }
        try {
          const data = await settingsStore().loadRestaurantData(firebaseUser.uid)
          settingsStore().setRestaurantData(data)
          await reservationStore().loadReservations(firebaseUser.uid)
          await floorStore().loadRooms(firebaseUser.uid)
          mainStore().selectedRoom = floorStore().getRooms()[0]
          await floorStore().loadTables(mainStore().selectedRoom.id)
        } finally {
          userStore.markAuthResolved()
        }
        isAuthInitialized = true
        unsubscribe()
        resolve(true)
        next()
      })
    })
    return // Empêche d'appeler next() deux fois
  }

  const isLoggedIn = !!getAuth(app).currentUser
  if (requiresAuth && !isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
