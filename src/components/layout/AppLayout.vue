<template>
  <div class="app-container">
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
</script>

<style scoped>
.app-container {
  display: flex;
  flex-grow: 1;
  width: 100%;
}
.header-page-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
</style>
