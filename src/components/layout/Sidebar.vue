<template>
  <div class="side-bar-container">
    <h3 class="brand-container">Seat Ease</h3>
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
  gap: 1.5rem;
  background-color: #0f172a;
  height: 100%;
  border-right: 0.1rem solid #f1f5f9;
  flex-shrink: 0;
  min-width: 15%;
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
  padding: 2rem;
}
button {
  color: #f1f5f9;
  background-color: #0f172a;
  border: none;
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  cursor: pointer;
  padding: 2rem;
  width: 100%;
  display: flex;
}
</style>
