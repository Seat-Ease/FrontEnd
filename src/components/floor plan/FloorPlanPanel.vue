<template>
  <div class="panel-container">
    <div class="menu-bar">
      <button class="save-btn btn">Enregistrer</button>
      <button class="close-btn btn" @click="mainStore().floorPlanPanelShowing = false">
        Fermer
      </button>
    </div>
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
  background-color: #1e293b;
  z-index: 10000000;
  display: flex;
  flex-direction: column;
  padding: 3rem;
}
.menu-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.btn {
  border: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
  gap: 2rem;
}
.close-btn {
  background-color: #1a365d;
  border: 0.1rem solid #fff;
}
.save-btn {
  background-color: rgb(0, 74, 177);
}
</style>
