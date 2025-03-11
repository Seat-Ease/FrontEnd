<script setup>
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'
import { ref, computed } from 'vue'

const main_store = mainStore()
const floor_store = floorStore()
const rooms = computed(() => floor_store.getRoomsList())
const selectedRoomId = ref('')
</script>

<template>
  <div class="floorPlanPanel">
    <div class="topBarFloorPanel">
      <div class="roomsList">
        <p
          @click="selectedRoomId = room.id"
          :class="{ selectedRoom: selectedRoomId === room.id }"
          v-for="room in rooms"
          :ref="room.id"
          :id="room.id"
        >
          {{ room.name }}
        </p>
      </div>
      <div class="modification">
        <p @click="main_store.floorSettingPanelShowing = true">Modifier le plan</p>
      </div>
    </div>
    <div class="floorContainer"></div>
  </div>
</template>
<style>
.floorPlanPanel {
  display: flex;
  flex-direction: column;
}
.topBarFloorPanel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid rgb(230, 230, 230);
  font-size: 1.2rem;
}
.roomsList > p {
  cursor: pointer;
}
.roomsList {
  display: flex;
  gap: 4rem;
  padding-left: 1rem;
}
.selectedRoom {
  color: #252189;
  font-weight: bold;
}
.modification {
  border-left: 0.1rem solid rgb(230, 230, 230);
  padding: 1rem;
}
.modification > p {
  cursor: pointer;
}
.floorContainer {
  flex: 1;
  background-color: rgb(230, 230, 230);
}
</style>
