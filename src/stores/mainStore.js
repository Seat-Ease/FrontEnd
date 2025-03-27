import { ref } from 'vue'
import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', () => {
  const floorSettingPanelShowing = ref(false)
  const calendarShowing = ref(false)

  function toggleCalendar() {
    calendarShowing.value = !calendarShowing.value
  }

  return { floorSettingPanelShowing, calendarShowing, toggleCalendar }
})
