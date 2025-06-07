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
          :class="{ selectedRoom: selectedRoom.id === String(room.id) }"
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
        <button @click="deleteRoom" class="delete-room-btn btn">
          Supprimer la salle
          <span v-if="loadingDelete"><SpinnerComponent /></span>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'
import { roomNameEdited, roomDeleted } from '@/stores/events'
import { ref, onBeforeMount, watch } from 'vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const loadingDelete = ref(false)

const rooms = ref([])
const selectedRoom = ref(null)
const tables = ref([])

function changeSelectedRoom(e) {
  const newlySelectedRoom = rooms.value.find((room) => room.id === e.target.id)
  selectedRoom.value = newlySelectedRoom
  mainStore().selectedRoom = newlySelectedRoom
}

async function deleteRoom() {
  try {
    loadingDelete.value = true
    await floorStore().deleteRoom(selectedRoom.value.id)
    if (floorStore().getRooms().length > 0) {
      mainStore().selectedRoom = floorStore().getRooms()[0]
    } else mainStore().selectedRoom = null
    roomDeleted().triggerEvent(true)
  } catch (error) {
    roomDeleted().triggerEvent(false)
    console.error(error)
  } finally {
    loadingDelete.value = false
    mainStore().editRoomFormShowing = false
  }
}

onBeforeMount(() => {
  // Reset
  rooms.value = []
  tables.value = []
  selectedRoom.value = null

  floorStore()
    .getRooms()
    .forEach((room) => {
      rooms.value.push(JSON.parse(JSON.stringify({ ...room })))
    })
  selectedRoom.value = { ...rooms.value[0] }
  mainStore().selectedRoom = selectedRoom.value
  floorStore()
    .getTables()
    .forEach((table) => {
      tables.value.push(JSON.parse(JSON.stringify({ ...table })))
    })
})

watch(
  () => roomNameEdited().eventData,
  (newValue) => {
    if (newValue === true) {
      rooms.value = []

      floorStore()
        .getRooms()
        .forEach((room) => {
          rooms.value.push(JSON.parse(JSON.stringify({ ...room })))
        })
      selectedRoom.value = rooms.value.find((room) => room.id === selectedRoom.value.id)
    }
  },
)

watch(
  () => roomDeleted().eventData,
  (newValue) => {
    if (newValue === true) {
      rooms.value = []

      floorStore()
        .getRooms()
        .forEach((room) => {
          rooms.value.push(JSON.parse(JSON.stringify({ ...room })))
        })
      selectedRoom.value = mainStore().selectedRoom
    }
  },
)

watch(
  () => selectedRoom.value,
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
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
