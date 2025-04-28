import { ref } from 'vue'
import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', () => {
  const calendarShowing = ref(false)
  const searchParamReservation = ref('')
  const searchParamWaitlist = ref('')
  const selectedReservation = ref(null)
  const freeTablesListShowingReservation = ref(false)
  const freeTablesListShowingWaitList = ref(false)
  const newReservationFormShowing = ref(false)
  const newRoomFormShowing = ref(false)
  const editRoomFormShowing = ref(false)
  const newTableFormShowing = ref(false)
  const editTableFormShowing = ref(false)
  const selectedRoom = ref(null)
  const selectedTable = ref(null)
  const tableEditingActivated = ref(false)
  const waitlistedFormShowing = ref(false)
  const appDate = ref(new Date())

  function toggleCalendar() {
    calendarShowing.value = !calendarShowing.value
  }

  return {
    searchParamReservation,
    searchParamWaitlist,
    calendarShowing,
    toggleCalendar,
    appDate,
    selectedReservation,
    freeTablesListShowingReservation,
    freeTablesListShowingWaitList,
    newReservationFormShowing,
    newRoomFormShowing,
    editRoomFormShowing,
    selectedRoom,
    newTableFormShowing,
    selectedTable,
    tableEditingActivated,
    editTableFormShowing,
    waitlistedFormShowing,
  }
})
