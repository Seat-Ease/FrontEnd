import { defineStore } from 'pinia'
import { ref } from 'vue'

export const tableCreated = defineStore('table_created', () => {
  const eventData = ref(null)

  function triggerEvent(data) {
    eventData.value = { value: data, timestamp: Date.now() }
  }

  return {
    eventData,
    triggerEvent,
  }
})
