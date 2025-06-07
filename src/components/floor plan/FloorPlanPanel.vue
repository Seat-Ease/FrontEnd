<template>
  <div class="panel-container">
    <div class="menu-bar">
      <button class="save-btn btn">Enregistrer</button>
      <button class="close-btn btn" @click="mainStore().floorPlanPanelShowing = false">
        Fermer
      </button>
    </div>
    <div v-if="rooms.length > 0" class="room-list-btns-container">
      <div class="room-list-container">
        <p
          @click="changeSelectedRoom"
          class="room"
          v-for="room in rooms"
          :class="{ selectedRoom: selectedRom.id === String(room.id) }"
          :ref="room.id"
          :id="room.id"
        >
          {{ room.name }}
        </p>
      </div>
      <div class="btns-container">
        <button @click="mainStore().editRoomFormShowing = true" class="edit-name-btn btn">
          Modifier le nom de la salle
        </button>
        <button @click="" class="add-table-btn btn">Ajouter une table</button>
        <button @click="deleteRoom" class="delete-room-btn btn">Supprimer la salle</button>
      </div>
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

function changeSelectedRoom(e) {
  const newlySelectedRoom = rooms.value.find((room) => room.id === e.target.id)
  selectedRom.value = newlySelectedRoom
  mainStore().selectedRoom = newlySelectedRoom
}

async function deleteRoom(e) {
  e.preventDefault()
  loadingDelete.value = true
  await floorStore().deleteRoom(mainStore().selectedRoom.id)
  loadingDelete.value = false
  if (floorStore().getRooms().length > 0) {
    mainStore().selectedRoom = floorStore().getRooms()[0]
  }
  mainStore().editRoomFormShowing = false
}

onBeforeMount(() => {
  // Reset
  rooms.value = []
  tables.value = []
  selectedRom.value = null

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
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  gap: 3rem;
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
  background-color: #1e293b;
  border: 0.1rem solid #516d99;
  color: #516d99;
}
.save-btn,
.add-table-btn {
  background-color: rgb(0, 74, 177);
}
.room-list-btns-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.room-list-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem;
  background-color: #516d99;
  border-radius: 0.75rem;
  max-width: 50%;
  overflow-x: scroll;
}
.room {
  font-size: 1.3rem;
  background-color: #516d99;
  color: #fff;
  padding: 1rem;
  border-radius: 0.75rem;
  cursor: pointer;
  letter-spacing: 0.1rem;
  transition: all 0.2s;
}
.selectedRoom {
  background-color: #1e293b;
}
.btns-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.edit-name-btn {
  background-color: #516d99;
}
.delete-room-btn {
  background-color: red;
}
</style>
