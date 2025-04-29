import { ref } from 'vue'
import { defineStore } from 'pinia'

export const signup = defineStore('signup', () => {
  const general_info = ref({
    name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    website_link: '',
  })

  function getGeneralInfo() {
    return general_info.value
  }

  function setGeneralInfo(p_data) {
    general_info.value = p_data
  }

  const scheduleData = ref({
    monday: false,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: false,
    opening_time: '11:00',
    closing_time: '23:00',
  })

  function getScheduleData() {
    return scheduleData.value
  }

  function setScheduleData(p_data) {
    scheduleData.value = p_data
  }

  const credentials = ref({
    email: '',
    password: '',
  })

  function getCredentials() {
    return credentials.value
  }

  function setCredentials(p_data) {
    credentials.value = p_data
  }

  return {
    getGeneralInfo,
    setGeneralInfo,
    getScheduleData,
    setScheduleData,
    getCredentials,
    setCredentials,
  }
})
