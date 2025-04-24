<template>
  <div class="waitlist-page-container">
    <div class="page-header-container">
      <div class="title-description-container">
        <h1 class="page-title">Liste d'attente</h1>
        <p class="page-description">Gérez les clients sans réservations avec la liste d'attente</p>
      </div>
      <button @click="mainStore().waitlistedFormShowing = true" class="add-client-btn">
        Ajouter
      </button>
    </div>
    <div class="list-header">
      <p>Nom</p>
      <p>Téléphone</p>
      <p>Personnes</p>
      <p>Heure d'arrivée</p>
      <p>Actions</p>
    </div>
    <div class="list-container">
      <p
        v-if="reservationStore().getWalkinReservations(mainStore().appDate).length === 0"
        class="empty-list"
      >
        Aucun client en attente
      </p>
      <WaitlistedCard
        v-for="reservation in reservationStore().getWalkinReservations(mainStore().appDate)"
        :id="reservation.id"
        :reservation="reservation"
      />
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { reservationStore } from '@/stores/reservationStore'
import WaitlistedCard from '@/components/waitlist/WaitlistedCard.vue'
</script>
<style scoped>
.waitlist-page-container {
  background-color: #1e293b;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem;
}
.page-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.add-client-btn {
  border: none;
  background-color: rgb(0, 74, 177);
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
}
.list-container {
  display: flex;
  flex-direction: column;
}
.list-header {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-content: center;
  align-items: center;
  border-bottom: 0.15rem solid #1a365d;
  font-size: 1.2rem;
  color: #d6d6d6;
  padding-bottom: 1rem;
}
.empty-list {
  font-size: 1.2rem;
  color: #d6d6d6;
  align-self: center;
}
</style>
