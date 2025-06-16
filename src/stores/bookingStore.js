import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { app } from '@/firebase'

export const bookingStore = defineStore('bookingStore', () => {
  async function isIdValid(id) {
    const restaurantRef = doc(getFirestore(app), 'restaurants', account_uid)
    const snapshot = await getDoc(restaurantRef)

    return snapshot.exists()
  }

  return { isIdValid }
})
