import { defineStore } from 'pinia'

export const roomNameEdited = defineStore('room_name_edited', {
  state: () => ({
    eventData: null,
  }),
  actions: {
    triggerEvent(data) {
      this.eventData = data
    },
  },
})
