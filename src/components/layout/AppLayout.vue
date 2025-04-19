<template>
  <div class="app-container">
    <div v-if="mainStore().newRoomFormShowing">
      <NewRoomForm />
    </div>
    <Sidebar />
    <div class="header-page-container">
      <Header />
      <main>
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { mainStore } from '@/stores/mainStore'
import NewRoomForm from '@/components/floor plan/NewRoomForm.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  flex-grow: 1;
  width: 100%;
  position: relative;
}
.header-page-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
main {
  flex: 1;
}
</style>
