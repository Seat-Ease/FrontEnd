<script setup>
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ReservationPanel from '@/components/ReservationPanel.vue'
import FloorPanel from '@/components/FloorPanel.vue'
import FloorSettingPanel from '@/components/FloorSettingPanel.vue'
import { mainStore } from '@/stores/mainStore'
import { computed } from 'vue'

const store = mainStore()
const editingFloorPlan = computed(() => store.floorSettingPanelShowing)
</script>

<template>
  <main>
    <Topbar />
    <div class="mainContainer">
      <div class="floorSettingPanelContainer" v-if="editingFloorPlan">
        <FloorSettingPanel />
      </div>
      <div v-else class="homePanelContainer">
        <Sidebar />
        <ReservationPanel />
        <FloorPanel />
      </div>
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
  display: flex;
  height: 100%;
  flex-direction: column;
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
  display: grid;
  grid-template-columns: 0.65fr 2fr 6fr;
  width: 100%;
  max-height: 100vh;
}
.floorSettingPanelContainer {
  width: 100%;
  height: 100%;
  max-height: 100vh;
}
</style>
