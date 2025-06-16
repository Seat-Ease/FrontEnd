import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { app } from '@/firebase'

export const bookingStore = defineStore('bookingStore', () => {
  async function isIdValid(id) {
    const restaurantRef = doc(getFirestore(app), 'restaurants', id)
    const snapshot = await getDoc(restaurantRef)

    console.log(snapshot.exists())

    return snapshot.exists()
  }

  return { isIdValid }
})
