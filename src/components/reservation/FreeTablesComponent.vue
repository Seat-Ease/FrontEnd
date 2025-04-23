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
        <button class="confirm-btn">Confirmer</button>
      </div>
      <div class="list-container">
        <div v-for="table in floorStore().getFreeTablesPerRoom(roomSelected)" class="table-card">
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
import { ref } from 'vue'

console.log(floorStore().getRooms()[0].id)
const roomSelected = ref(floorStore().getRooms()[0].id)
</script>
<style scoped>
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
</style>
