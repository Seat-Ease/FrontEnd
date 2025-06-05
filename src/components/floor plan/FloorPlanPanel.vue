<template>
  <div class="panel-container">
    <h3 class="title">Floor Plan Panel</h3>
    <button @click="mainStore().floorPlanPanelShowing = false">Close</button>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'
import { ref, onBeforeMount, watch } from 'vue'

const rooms = ref([])
const selectedRom = ref(null)
const tables = ref([])

onBeforeMount(() => {
  floorStore()
    .getRooms()
    .forEach((room) => {
      rooms.value.push(JSON.parse(JSON.stringify({ ...room })))
    })
  selectedRom.value = { ...rooms.value[0] }
  floorStore()
    .getTables()
    .forEach((table) => {
      tables.value.push(JSON.parse(JSON.stringify({ ...table })))
    })
})

watch(
  () => selectedRom.value,
  async (newValue) => {
    try {
      await floorStore().loadTables(newValue.id)
    } finally {
      tables.value = []
      floorStore()
        .getTables()
        .forEach((table) => {
          tables.value.push(JSON.parse(JSON.stringify({ ...table })))
        })
    }
  },
)
</script>
<style scoped>
.panel-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: aqua;
  z-index: 10000000;
}
</style>
