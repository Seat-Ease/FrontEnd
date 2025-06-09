import { defineStore } from 'pinia'
import { ref } from 'vue'

const eventData = ref(null)

export const tableCreated = defineStore('table_created', () => {
  function triggerEvent(data) {
    eventData.value = { value: data, timestamp: Date.now() }
  }

  return {
    eventData,
    triggerEvent,
  }
})
