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
    <div v-if="rooms.length > 0" class="room-list-btns-container">
      <div class="room-list-container">
        <p
          @click="handleRoomSelection"
          class="room"
          :class="{ selectedRoom: selectedRoom.id === String(room.id) }"
          v-for="room in rooms"
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
        <button class="add-table-btn">Ajouter une table</button>
      </div>
    </div>
    <div class="room-plan-container">
      <div v-if="rooms.length === 0" class="no-rooms-message-container">
        <p class="first-line">Aucune salle créée</p>
        <p class="second-line">
          Commencez par créer des salles pour votre restaurant, <br />
          comme "Salle Principale", "Terrasse", ou "Salon Privé".
        </p>
        <button @click="mainStore().newRoomFormShowing = true" class="add-room-btn">
          Créer votre première salle
        </button>
      </div>
      <div v-else class="room-floor-plan">
        <div class="container-header">
          <div class="name-stat-container">
            <p class="room-name">{{ selectedRoom.name }}</p>
            <div class="room-stats-container">
              <p class="tables-count">
                {{ floorStore().getTablesCount(mainStore().selectedRoom.id) }} tables
              </p>
              <hr />
              <p class="places-count">
                {{ floorStore().getPlacesCount(mainStore().selectedRoom.id) }} places au total
              </p>
            </div>
          </div>
          <button class="edit-floor-plan-btn">Modifier la disposition</button>
        </div>
        <div class="canvas-container"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'

const rooms = computed(() => floorStore().getRooms())
const selectedRoom = computed(() => mainStore().selectedRoom)
function handleRoomSelection(e) {
  selectedRoom.value = rooms.value.find((room) => room.id === String(e.target.id))
  mainStore().selectedRoom = rooms.value.find((room) => room.id === String(e.target.id))
}
onBeforeMount(() => {
  if (floorStore().getRooms().length > 0) {
    mainStore().selectedRoom = floorStore().getRooms()[0]
  }
})
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
  font-size: 1.4rem;
  color: #fff;
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
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
.room-floor-plan {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;
}
.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.room-stats-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.room-name {
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
}
.tables-count,
.places-count {
  color: #f1f5f9;
  font-size: 1.2rem;
}
.canvas-container {
  flex-grow: 1;
  background-color: #0f172a;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
}
.no-rooms-message-container {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  margin: auto;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
}
.first-line {
  font-size: 2.5rem;
  color: #fff;
}
.second-line {
  color: #f1f5f9;
  font-size: 1.2rem;
}
</style>
