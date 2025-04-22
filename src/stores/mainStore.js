import { ref } from 'vue'
import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', () => {
  const floorSettingPanelShowing = ref(false)
  const calendarShowing = ref(false)
  const selectedReservation = ref(null)
  const freeTablesListShowingReservation = ref(false)
  const freeTablesListShowingWaitList = ref(false)
  const reservationFormShowing = ref(false)
  const newRoomFormShowing = ref(false)
  const editRoomFormShowing = ref(false)
  const newTableFormShowing = ref(false)
  const editTableFormShowing = ref(false)
  const selectedRoom = ref(null)
  const selectedTable = ref(null)
  const tableEditingActivated = ref(false)
  const now = new Date()
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
    selectedReservation,
    freeTablesListShowingReservation,
    freeTablesListShowingWaitList,
    reservationFormShowing,
    newRoomFormShowing,
    editRoomFormShowing,
    selectedRoom,
    newTableFormShowing,
    selectedTable,
    tableEditingActivated,
    editTableFormShowing,
  }
})
