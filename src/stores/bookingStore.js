import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { app } from '@/firebase'

export const bookingStore = defineStore('bookingStore', () => {
  async function isIdValid(restaurant_id) {
    const restaurantRef = doc(getFirestore(app), 'restaurants', restaurant_id)
    const snapshot = await getDoc(restaurantRef)

    return snapshot.exists()
  }

  async function getRestaurantData(restaurant_id) {
    try {
      const restaurantRef = doc(getFirestore(app), 'restaurants', restaurant_id)
      const snapshot = await getDoc(restaurantRef)

      if (!snapshot.exists()) {
        console.warn('Aucun restaurant trouvé pour cet utilisateur.')
        return null
      }

      return snapshot.data()
    } catch (error) {
      console.error('Erreur lors du chargement du restaurant :', error)
      return null
    }
  }

  return { isIdValid, getRestaurantData }
})
