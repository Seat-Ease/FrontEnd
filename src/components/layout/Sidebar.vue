<template>
  <div class="side-bar-container">
    <h3 class="restaurant-name">Demo Restaurant</h3>
    <div class="options-container">
      <button>Tableau de bord</button>
      <button>Plan de salle</button>
      <button>Réservation</button>
      <button>Tables</button>
      <button>Liste d'attente</button>
      <button>Paramètres</button>
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
</script>
<style scoped>
.side-bar-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #1a365d;
  height: 100%;
  border-right: 0.1rem solid #f1f5f9;
}
.options-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.restaurant-name {
  font-size: 2rem;
  color: #0d9488;
  font-weight: bold;
  padding: 1rem;
}
button {
  color: #f1f5f9;
  background-color: #1a365d;
  border: none;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  cursor: pointer;
  padding: 1rem;
  width: 100%;
  display: flex;
}
</style>
