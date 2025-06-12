import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    isAuthResolved: false,
  }),
  actions: {
    setUser(user) {
      this.user = user ? { uid: user.uid, email: user.email, displayName: user.displayName } : null
    },
    markAuthResolved() {
      this.isAuthResolved = true
    },
  },
})
