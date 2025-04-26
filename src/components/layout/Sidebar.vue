<template>
  <div class="side-bar-container">
    <h3 class="brand-container">Seat Ease</h3>
    <div class="options-container">
      <RouterLink class="link" :class="{ selectedPage: currentRoute.path === '/' }" to="/"
        >Tableau de bord</RouterLink
      >
      <RouterLink
        class="link"
        :class="{ selectedPage: currentRoute.path === '/floorplan' }"
        to="/floorplan"
        >Plan de salle</RouterLink
      >
      <RouterLink
        class="link"
        :class="{ selectedPage: currentRoute.path === '/reservations' }"
        to="/reservations"
        >Réservation</RouterLink
      >
      <!-- <RouterLink
        class="link"
        :class="{ selectedPage: currentRoute.path === '/tables' }"
        to="/tables"
        >Tables</RouterLink
      > -->
      <RouterLink
        class="link"
        :class="{ selectedPage: currentRoute.path === '/waitlist' }"
        to="/waitlist"
        >Liste d'attente</RouterLink
      >
      <RouterLink
        class="link"
        :class="{ selectedPage: currentRoute.path === '/settings' }"
        to="/settings"
        >Paramètres</RouterLink
      >
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
const currentRoute = useRoute()
</script>
<style scoped>
.side-bar-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #0f172a;
  height: 100%;
  border-right: 0.15rem solid #1a365d;
  flex-shrink: 0;
  min-width: 17%;
  padding: 0 1rem;
}
.options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.brand-container {
  font-size: 2rem;
  color: #0d9488;
  font-weight: bold;
  padding: 2rem 0;
}
.link {
  text-decoration: none;
  color: #f1f5f9;
  background-color: #0f172a;
  border: none;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
  padding: 2rem;
  width: 100%;
  display: flex;
  transition: all 0.2s;
  border-radius: 1rem;
}
.link:hover {
  background-color: #1e293b;
}
.selectedPage {
  background-color: #1e293b;
  color: #0d9488;
  font-weight: 600;
}
</style>
