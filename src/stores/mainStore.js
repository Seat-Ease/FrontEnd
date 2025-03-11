import { ref } from 'vue'
import { defineStore } from 'pinia'

export const mainStore = defineStore('mainStore', () => {
  const floorSettingPanelShowing = ref(false)

  return { floorSettingPanelShowing }
})
