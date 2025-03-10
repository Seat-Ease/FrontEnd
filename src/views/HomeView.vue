<script setup>
import Topbar from '@/components/Topbar.vue'
import Sidebar from '@/components/Sidebar.vue'
import ReservationPanel from '@/components/ReservationPanel.vue'
</script>

<template>
  <main>
    <Topbar />
    <div class="mainContainer">
      <Sidebar />
      <ReservationPanel />
      <div class="floorPlanPanel"></div>
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
  display: grid;
  width: 100%;
  grid-template-columns: 0.65fr 2fr 6fr;
  max-height: 100vh;
  flex: 1;
}
</style>
