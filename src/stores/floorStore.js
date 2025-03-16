import { ref } from 'vue'
import { defineStore } from 'pinia'

export const floorStore = defineStore('floorStore', () => {
  const floorSetting = ref(null)
  function getFloorSetting() {
    return floorSetting.value
  }
  function setFloorSetting(newFloorSetting) {
    floorSetting.value = newFloorSetting
  }
  return { getFloorSetting, setFloorSetting }
})
