import { ref } from 'vue'
import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', () => {
  const floorSettingPanelShowing = ref(false)
  const calendarShowing = ref(false)
  const appDate = ref(new Date())

  function toggleCalendar() {
    calendarShowing.value = !calendarShowing.value
  }

  const goToNextDay = () => {
    appDate.value.setDate(appDate.value.getDate() + 1)
    appDate.value = new Date(appDate.value)
  }

  const goToPreviousDay = () => {
    appDate.value.setDate(appDate.value.getDate() - 1)
    appDate.value = new Date(appDate.value)
  }

  return {
    floorSettingPanelShowing,
    calendarShowing,
    toggleCalendar,
    appDate,
    goToNextDay,
    goToPreviousDay,
  }
})
