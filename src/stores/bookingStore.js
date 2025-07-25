import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore'
import { app } from '@/firebase'
import { ref } from 'vue'

export const bookingStore = defineStore('bookingStore', () => {
  const reservationSlots = ref([])

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

  async function getReservationSlots(restaurant_id, date, openingTime, closingTime) {
    try {
      const db = getFirestore(app)
      const availabilitiesRef = collection(db, 'availabilities')
      const q = query(
        availabilitiesRef,
        where('restaurant_id', '==', restaurant_id),
      )
      const snapshot = await getDocs(q)
      const slots = snapshot.docs.map(docSnap => {
        const slot = docSnap.data()
        const localDate = new Date(slot.date + "T" + slot.time + ":00Z");
        const yyyy = localDate.getFullYear();
        const mm = String(localDate.getMonth() + 1).padStart(2, '0');
        const dd = String(localDate.getDate()).padStart(2, '0');
        return {
          ...slot,
          date: `${yyyy}-${mm}-${dd}`, // date locale
          time: localDate.toTimeString().slice(0, 5), // HH:MM locale
        };
      })
      .filter(slot => slot.date >= date && Number(slot.tables_available) > 0)
      .filter(slot => {
        const now = new Date()
        const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
        if (date === todayStr) {
          return slot.time >= now.toTimeString().slice(0, 5) && Number(slot.tables_available) > 0;
        }
        return slot.date === date && Number(slot.tables_available) > 0
      })

      // Sort slots by time (earliest to latest)
      slots.sort((a, b) => {
        const [ah, am] = a.time.split(':').map(Number)
        const [bh, bm] = b.time.split(':').map(Number)
        return ah !== bh ? ah - bh : am - bm
      })
      reservationSlots.value = [ ...slots ]
    } catch (error) {
      console.error('Erreur lors du chargement des créneaux de réservation :', error)
      return []
    }
  }

  return { reservationSlots, isIdValid, getRestaurantData, getReservationSlots }
})
