<template>
  <div class="overlay">
    <div class="component-container">
      <div class="header-container">
        <div class="title-description-container">
          <p class="title">Tables disponibles</p>
        </div>
        <button @click="mainStore().freeTablesListShowingReservation = false" class="close-btn">
          X
        </button>
      </div>
      <div class="input-container">
        <select v-model="roomSelected" id="room-select">
          <option v-for="room in floorStore().getRooms()" :value="room.id" :id="room.id">
            {{ room.name }}
          </option>
        </select>
        <button @click="handleTableAssignation" class="confirm-btn">Confirmer</button>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
      <div class="list-container">
        <div
          v-for="table in floorStore().getFreeTablesPerRoom(roomSelected)"
          @click="updateSelectedTables(table)"
          class="table-card"
          :class="{ selectedTables: isSelected(table.id) }"
        >
          <p class="name">{{ table.name }}</p>
          <p class="capacity">{{ table.maxCovers }} places</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { floorStore } from '@/stores/floorStore'
import { mainStore } from '@/stores/mainStore'
import { reservationStore } from '@/stores/reservationStore'
import { ref } from 'vue'

const error = ref('')
const capacity = ref(0)

const roomSelected = ref(floorStore().getRooms()[0].id)
const selectedTables = ref([])
function isSelected(tableId) {
  return selectedTables.value.findIndex((table) => table.id === tableId) !== -1
}
function updateSelectedTables(p_table) {
  const tableIndex = selectedTables.value.findIndex((table) => table.id === p_table.id)
  capacity.value = p_table.maxCovers
  if (tableIndex === -1) {
    const tableToAdd = floorStore()
      .getTables()
      .find((table) => table.id === p_table.id)
    selectedTables.value.push({
      id: tableToAdd.id,
      name: tableToAdd.name,
      room_id: tableToAdd.room_id,
      room_name: floorStore()
        .getRooms()
        .find((room) => room.id === tableToAdd.room_id).name,
    })
  } else {
    selectedTables.value = selectedTables.value.filter((table) => table.id !== p_table.id)
  }
}
function handleTableAssignation() {
  if (selectedTables.value.length <= 0 || capacity < mainStore().selectedReservation.party_size) {
    error.value = 'Capacité insuffisante pour le nombre de personnes'
  } else error.value = ''
  reservationStore().startServiceForReservation(mainStore().selectedReservation.id, [
    ...selectedTables.value,
  ])
  selectedTables.value.forEach((table) => floorStore().updateTableState(table.id))
  selectedTables.value = []
  mainStore().freeTablesListShowingReservation = false
  mainStore().freeTablesListShowingWaitList = false
}
</script>
<style scoped>
.error {
  font-size: 1rem;
  color: red;
}
.overlay {
  background-color: #00000077;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  min-height: 100%;
  min-width: 100%;
  z-index: 100000000;
}
.component-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  border-radius: 0.75rem;
  border: 0.1rem solid #1a365d;
  background-color: #0f172a;
  width: 40%;
  max-height: 36rem;
}
.header-container {
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
}
.title-description-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.title {
  font-size: 1.6rem;
  color: #fff;
  font-weight: 600;
}
.close-btn {
  border: none;
  background-color: #0f172a;
  color: #fff;
  font-size: 1.5rem;
  align-self: flex-start;
  cursor: pointer;
  font-weight: bold;
}
.input-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.confirm-btn {
  border: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
  background-color: rgb(0, 74, 177);
  align-self: flex-end;
}
.input-container > select {
  background-color: #0f172a;
  padding: 1rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #f1f5f9;
  font-size: 1.4rem;
  width: 17rem;
}
.input-container > select:focus {
  outline: 0.2rem solid #1a365d;
}
.table-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 0.1rem solid #1a365d;
  padding: 1.5rem;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1.3rem;
  color: #f1f5f9;
}
.list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
}
.selectedTables {
  border-color: #0d9488;
  color: #0d9488;
}
</style>
