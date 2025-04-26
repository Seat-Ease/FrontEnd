import { ref } from 'vue'
import { defineStore } from 'pinia'

export const settingsStore = defineStore('settingsStore', () => {
  const restaurantData = ref({
    name: 'Demo Restaurant',
    telephone: '0896785432',
    address: '1, Ave Demo',
    city: 'Kinshasa',
    postal_code: 'kin111',
    website_link: 'www.demo-restaurant.com',
  })

  function getRestaurantData() {
    console.log(restaurantData.value)
    return restaurantData.value
  }

  function editRestaurantData(p_data) {
    restaurantData.value = p_data
  }

  const scheduleData = ref({
    sunday: 'Fermé',
    monday: '11:00 - 23:00',
    tuesday: '11:00 - 23:00',
    wednesday: '11:00 - 23:00',
    thursday: '11:00 - 23:00',
    friday: '11:00 - 23:00',
    saturday: '11:00 - 23:00',
  })

  function getScheduleData() {
    return scheduleData.value
  }

  function editScheduleData(p_data) {
    scheduleData.value = p_data
  }

  const availabilitiesSettings = ref({
    intervalle: '15',
    est_srvice_duration: '90',
  })

  function getAvailabiltiesSettings() {
    return availabilitiesSettings.value
  }

  function editAvailabiltiesSettings(p_data) {
    availabilitiesSettings.value = p_data
  }

  return {
    getRestaurantData,
    editRestaurantData,
    getScheduleData,
    editScheduleData,
    getAvailabiltiesSettings,
    editAvailabiltiesSettings,
  }
})
