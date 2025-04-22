<template>
  <div class="no-rooms-message-container">
    <p class="first-line">Aucune salle créée</p>
    <p class="second-line">
      Commencez par créer des salles pour votre restaurant, <br />
      comme "Salle Principale", "Terrasse", ou "Salon Privé".
    </p>
    <button @click="mainStore().newRoomFormShowing = true" class="add-room-btn">
      Créer votre première salle
    </button>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
</script>
<style scoped>
.no-rooms-message-container {
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  margin: auto;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
}
.first-line {
  font-size: 2.5rem;
  color: #fff;
}
.second-line {
  color: #f1f5f9;
  font-size: 1.2rem;
}
.add-room-btn {
  border: none;
  background-color: rgb(0, 74, 177);
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
}
</style>
