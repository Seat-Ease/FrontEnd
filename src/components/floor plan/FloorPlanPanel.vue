<template>
  <div class="panel-container">
    <h3 class="title">Floor Plan Panel</h3>
    <button @click="mainStore().floorPlanPanelShowing = false">Close</button>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
</script>
<style scoped>
.panel-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: aqua;
  z-index: 10000000;
}
</style>
