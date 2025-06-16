<template>
  <div v-if="useUserStore().isAuthResolved" class="home-container">
    <div class="top-bar">
      <h1 class="brand-container">Seat Ease</h1>
    </div>
    <main>
      <RouterView />
    </main>
  </div>
  <div v-else class="loading-container">
    <LoadingComponent />
  </div>
</template>
<script setup>
import { useUserStore } from '@/stores/userStore'
import LoadingComponent from '@/components/LoadingComponent.vue'
</script>
<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  width: 100%;
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: #1e293b;
}
.home-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.top-bar {
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
  background-color: #0f172a;
  border-bottom: 0.15rem solid #1a365d;
}
.brand-container {
  font-size: 3rem;
  color: #0d9488;
  font-weight: bold;
}
main {
  background-color: #1e293b;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
}
</style>
