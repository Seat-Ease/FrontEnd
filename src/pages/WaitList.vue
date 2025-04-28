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
    <div class="input-container">
      <input
        v-model="mainStore().searchParamWaitlist"
        type="text"
        placeholder="Réchercher un client..."
      />
    </div>
    <div class="list-header-wrapper">
      <div class="list-header">
        <p>Nom</p>
        <p>Téléphone</p>
        <p>Personnes</p>
        <p>Heure d'arrivée</p>
        <p>Actions</p>
      </div>
      <div class="list-container">
        <p v-if="waitlist.length === 0" class="empty-list">Aucun client en attente</p>
        <p class="no-results-text" v-if="paramVar && getWaitList().length === 0">
          Aucun résultat trouvé.
        </p>
        <WaitlistedCard
          v-for="reservation in getWaitList()"
          :id="reservation.id"
          :reservation="reservation"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { reservationStore } from '@/stores/reservationStore'
import WaitlistedCard from '@/components/waitlist/WaitlistedCard.vue'
import { computed } from 'vue'

const paramVar = computed(() => mainStore().searchParamWaitlist)
const waitlist = computed(() => reservationStore().getWalkinReservations(mainStore().appDate))

function getWaitList() {
  if (paramVar.value === '') return waitlist.value
  return waitlist.value.filter((reservation) =>
    (reservation.client_name || '').includes(paramVar.value),
  )
}
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
  max-height: 50rem;
  overflow: scroll;
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
.empty-list,
.no-results-text {
  font-size: 1.2rem;
  color: #d6d6d6;
  align-self: center;
  margin-top: 3rem;
}
.input-container > input {
  background-color: #1e293b;
  padding: 1rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #f1f5f9;
  font-size: 1.4rem;
  min-width: 30rem;
}
.input-container > input:focus {
  outline: 0.2rem solid #1a365d;
}
.input-container > input::placeholder {
  color: #d2d2d2;
}
</style>
