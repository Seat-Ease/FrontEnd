<script setup>
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import ReservationPanel from '@/components/ReservationPanel.vue'
import FloorPanel from '@/components/FloorPanel.vue'
import FloorSettingPanel from '@/components/FloorSettingPanel.vue'
import { mainStore } from '@/stores/mainStore'
import { computed } from 'vue'

const store = mainStore()
const editingFloorPlan = computed(() => store.floorSettingPanelShowing)
const showCalendar = computed(() => store.calendarShowing)
const date = new Date()
</script>

<template>
  <main>
    <Topbar />
    <div class="mainContainer">
      <transition name="slide" mode="out-in">
        <div class="floorSettingPanelContainer" v-if="editingFloorPlan">
          <FloorSettingPanel />
        </div>
        <div v-else class="homePanelContainer">
          <div v-if="showCalendar" class="calendarContainer">
            <VDatePicker v-model="store.appDate" mode="date" />
          </div>
          <div class="sidebarContainer">
            <Sidebar />
          </div>
          <div class="reservationPanelContainer">
            <ReservationPanel />
          </div>
          <div class="floorPanelContainer">
            <FloorPanel />
          </div>
        </div>
      </transition>
    </div>
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  font-size: 62.5%;
  min-height: 100vh;
  overflow: hidden;
  font-family: 'Hepta Slab', serif;
  font-optical-sizing: auto;
  font-style: normal;
}
main {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 100vh;
}
.mainContainer {
  height: 100%;
  max-height: 100vh;
  flex: 1;
}
.homePanelContainer {
  display: flex;
  width: 100%;
  max-height: 100vh;
  position: relative;
}
.sidebarContainer {
  width: 10%;
  flex-shrink: 0;
}
.reservationPanelContainer {
  width: 30%;
  flex-shrink: 0;
}
.floorPanelContainer {
  width: 30%;
  flex: 1;
  flex-shrink: 1;
}
.calendarContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
}
.floorSettingPanelContainer {
  width: 100%;
  height: 100%;
  max-height: 100vh;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 100vh;
  opacity: 1;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
