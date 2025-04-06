<template>
  <div class="listTopSection">
    <button @click="closeComponent" class="closeBtn">X</button>
    <p class="containerTitle">Tables Libres</p>
    <button class="confirmBtn" @click="assignTables">Confirmer</button>
  </div>
  <div class="tablesContainer">
    <div
      @click="updateSelectedTables(table.id)"
      class="tableCard"
      v-for="table in freeTables"
      id="table.id"
    >
      <div class="tablesInfo">
        <p class="tableName">{{ table.name }}</p>
        <p class="tableDetails">
          (min: {{ table.minCovers }}, max: {{ table.maxCovers }}, salle:
          {{ floor_store.getFloorSetting().rooms.find((room) => room.id === table.room_id).name }})
        </p>
      </div>
      <font-awesome-icon v-if="isSelected(table.id)" class="check" :icon="['fas', 'check']" />
    </div>
  </div>
</template>
<script setup>
import { floorStore } from '@/stores/floorStore'
import { mainStore } from '@/stores/mainStore'
import { reservationStore } from '@/stores/reservationStore'
import { ref, computed } from 'vue'

const emit = defineEmits(['close'])

const selectedTables = ref([])

const floor_store = floorStore()
const main_store = mainStore()
const reservation_store = reservationStore()

const freeTables = computed(() =>
  floor_store.getFloorSetting().tables.filter((table) => table.occupied === false),
)

function isSelected(tableId) {
  return selectedTables.value.findIndex((table) => table.id === tableId) !== -1
}

function updateSelectedTables(tableId) {
  const tableIndex = selectedTables.value.findIndex((table) => table.id === tableId)
  if (tableIndex === -1) {
    const tableToAdd = floor_store.getFloorSetting().tables.find((table) => table.id === tableId)
    selectedTables.value.push({
      id: tableToAdd.id,
      name: tableToAdd.name,
      room_id: tableToAdd.room_id,
      room_name: floor_store.getFloorSetting().rooms.find((room) => room.id === tableToAdd.room_id)
        .name,
    })
  } else {
    selectedTables.value = selectedTables.value.filter((table) => table.id !== tableId)
  }
}

function closeComponent() {
  selectedTables.value = []
  emit('close')
}

function assignTables() {
  if (selectedTables.value.length === 0) {
    emit('close')
    return
  }

  const reservationToSit = reservation_store
    .getReservations()
    .find((reservation) => reservation.id === main_store.selectedReservation)

  if (!reservationToSit) return

  let selectedTablesCapacity = 0

  for (let i = 0; i < selectedTables.value.length; i++) {
    const tableIndex = floor_store
      .getFloorSetting()
      .tables.findIndex((table) => table.id === selectedTables.value[i].id)
    selectedTablesCapacity += floor_store.getFloorSetting().tables[tableIndex].maxCovers
  }

  if (selectedTablesCapacity < reservationToSit.party_size) {
    alert('Capacité insuffisante pour le nombre de personnes')
    return
  }

  selectedTables.value.forEach((element) => {
    const table = floor_store.getFloorSetting().tables.find((table) => table.id === element.id)
    if (!table) return
    floor_store.updateTableState(table.id)
  })

  reservation_store.startServiceForReservation(reservationToSit.id, selectedTables.value)

  selectedTables.value = []
  emit('close')
  return
}
</script>
<style scoped>
.listTopSection {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0.5rem;
  border-bottom: 0.15rem solid #444;
  font-size: 1.3rem;
  color: #121123dd;
  font-weight: 600;
  letter-spacing: 0.1rem;
  background-color: rgb(241, 241, 241);
}
.closeBtn {
  border: none;
  background-color: rgb(241, 241, 241);
  color: inherit;
  font-weight: inherit;
  font-size: inherit;
  cursor: pointer;
}
.confirmBtn {
  border: none;
  color: #fff;
  background-color: #252189;
  padding: 1rem;
  border-radius: 1rem;
  font-weight: inherit;
  font-size: inherit;
  cursor: pointer;
}
.tablesContainer {
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.tableCard {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 0.1rem solid #888;
  cursor: pointer;
}
.tablesInfo {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.tableName {
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 0.1rem;
  color: #333;
}
.tableDetails {
  color: #666;
}
.check {
  font-size: 1.5rem;
}
</style>
