import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'
import { app } from '@/firebase'

export const settingsStore = defineStore('settingsStore', () => {
  async function loadRestaurantData(account_uid) {
    try {
      const restaurantRef = doc(getFirestore(app), 'restaurants', account_uid)
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

  const restaurantData = ref({
    account_uid: '',
    email: '',
    general: {
      name: '',
      telephone: '',
      address: '',
      city: '',
      postal_code: '',
      website_link: '',
    },
    schedule: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false,
      opening_time: '11:00',
      closing_time: '23:00',
    },
    availabilities: { intervalle: '', available_tables: '' },
  })

  function setRestaurantData(p_data) {
    restaurantData.value = { ...p_data }
  }

  function getGeneralInfo() {
    return restaurantData.value.general
  }

  async function editGeneralInfo(p_data) {
    try {
      const restaurantRef = doc(getFirestore(app), 'restaurants', restaurantData.value.account_uid)
      await updateDoc(restaurantRef, { general: { ...p_data } })
      await loadRestaurantData(restaurantData.value.account_uid)
    } catch (error) {
      console.log(error)
    }
  }

  function getScheduleData() {
    return restaurantData.value.schedule
  }

  async function editScheduleData(p_data) {
    try {
      const restaurantRef = doc(getFirestore(app), 'restaurants', restaurantData.value.account_uid)
      await updateDoc(restaurantRef, { schedule: { ...p_data } })
      await loadRestaurantData(restaurantData.value.account_uid)
    } catch (error) {
      console.log(error)
    }
  }

  function getAvailabiltiesSettings() {
    return restaurantData.value.availabilities
  }

  async function editAvailabiltiesSettings(p_data) {
    try {
      const restaurantRef = doc(getFirestore(app), 'restaurants', restaurantData.value.account_uid)
      await updateDoc(restaurantRef, { availabilities: { ...p_data } })
      await loadRestaurantData(restaurantData.value.account_uid)
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loadRestaurantData,
    setRestaurantData,
    getGeneralInfo,
    editGeneralInfo,
    getScheduleData,
    editScheduleData,
    getAvailabiltiesSettings,
    editAvailabiltiesSettings,
  }
})
