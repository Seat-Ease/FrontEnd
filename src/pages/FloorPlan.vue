<template>
  <div class="floor-plan-page-container">
    <div class="page-header-container">
      <div class="title-description-container">
        <h1 class="page-title">Plan de salle</h1>
        <p class="page-description">Créez et gérez la disposition de votre restaurant</p>
      </div>
      <button @click="mainStore().newRoomFormShowing = true" class="add-room-btn">
        Ajouter une salle
      </button>
    </div>
    <div v-if="floorStore().getRooms().length > 0" class="room-list-btns-container">
      <div class="room-list-container">
        <p
          @click="changeSelectedRoom"
          class="room"
          v-for="room in floorStore().getRooms()"
          :class="{ selectedRoom: mainStore().selectedRoom?.id === String(room.id) }"
          :ref="room.id"
          :id="room.id"
        >
          {{ room.name }}
        </p>
      </div>
      <div class="btns-container">
        <button @click="mainStore().editRoomFormShowing = true" class="edit-room-btn">
          Modifier la salle
        </button>
        <button @click="mainStore().newTableFormShowing = true" class="add-table-btn">
          Ajouter une table
        </button>
      </div>
    </div>
    <div class="room-plan-container">
      <div v-if="roomsListLength === 0">
        <NoRoomComponent />
      </div>
      <div v-else>
        <RoomFloorPlan />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onBeforeMount, watch, ref, computed } from 'vue'
import { settingsStore } from '@/stores/settingsStore'
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'
import NoRoomComponent from '@/components/floor plan/NoRoomComponent.vue'
import RoomFloorPlan from '@/components/floor plan/RoomFloorPlan.vue'

function changeSelectedRoom(e) {
  mainStore().selectedRoom = floorStore()
    .getRooms()
    .find((room) => room.id === e.target.id)
}

const roomsListLength = computed(() => floorStore().getRooms().length)

onBeforeMount(async () => {
  await floorStore().loadRooms(settingsStore().getAccountUID())
  if (floorStore().getRooms().length > 0) {
    const firstRoom = floorStore().getRooms()[0]
    mainStore().selectedRoom = firstRoom
  }
})
watch(
  () => mainStore().selectedRoom,
  async (room) => {
    if (room) {
      await floorStore().loadTables(room.id)
    }
  },
  { immediate: true },
)
</script>
<style scoped>
.floor-plan-page-container {
  background-color: #1e293b;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem;
}
.page-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-room-btn,
.add-table-btn {
  border: none;
  background-color: rgb(0, 74, 177);
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
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
.edit-room-btn,
.edit-floor-plan-btn {
  border: 0.2rem solid #1a365d;
  background-color: #1e293b;
  border-radius: 0.75rem;
  font-size: 1.4rem;
  color: #fff;
  padding: 1rem 2.5rem;
  cursor: pointer;
}
.btns-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.room-plan-container {
  flex: 1;
  background-color: #0f172a;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  padding: 3rem;
}
</style>
