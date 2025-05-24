<template>
  <div class="reservation-page-container">
    <div class="page-header-container">
      <div class="title-description-container">
        <h1 class="page-title">Réservations</h1>
        <p class="page-description">Gérez les réservations de votre restaurant</p>
      </div>
      <button @click="mainStore().newReservationFormShowing = true" class="add-reservation-btn">
        Nouvelle réservation
      </button>
    </div>
    <div class="input-container">
      <input
        v-model="mainStore().searchParamReservation"
        type="text"
        placeholder="Réchercher un client..."
      />
    </div>
    <div v-if="loadingData">
      <LoadingComponent />
    </div>
    <div v-else class="reservationBox-container">
      <ReservationBox
        boxTitle="Réservations à venir"
        boxDescription="Nombres de réservations à venir"
        noReservationText="Aucune réservation à venir pour aujourd'hui"
        :reservationListEmpty="upcomingReservations.length === 0"
        :totalCount="upcomingReservations.length"
        :seated="false"
        :reservationList="upcomingReservations"
      />
      <ReservationBox
        boxTitle="Réservations placées"
        boxDescription="Clients actuellement dans votre restaurant"
        noReservationText="Aucun client n'est actuellement à table"
        :reservationListEmpty="seatedReservations.length === 0"
        :totalCount="seatedReservations.length"
        :seated="true"
        :reservationList="seatedReservations"
      />
    </div>
  </div>
</template>
<script setup>
import { reservationStore } from '@/stores/reservationStore'
import { settingsStore } from '@/stores/settingsStore'
import { mainStore } from '@/stores/mainStore'
import { computed, onMounted, ref } from 'vue'
import ReservationBox from '@/components/reservation/ReservationBox.vue'
import LoadingComponent from '@/components/LoadingComponent.vue'

const seatedReservations = computed(() =>
  reservationStore().getSeatedReservations(mainStore().appDate),
)

const upcomingReservations = computed(() =>
  reservationStore().getUpcomingReservations(mainStore().appDate),
)

const loadingData = ref(true)

onMounted(async () => {
  loadingData.value = true
  try {
    await reservationStore().loadReservations(settingsStore().getAccountUID())
  } finally {
    loadingData.value = false
  }
})
</script>
<style scoped>
.reservation-page-container {
  background-color: #1e293b;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem;
}
.reservationBox-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.page-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page-title,
.box-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
}
.box-title {
  font-size: 1.8rem;
}
.page-description,
.box-description {
  color: #f1f5f9;
  font-size: 1.1rem;
}
.add-reservation-btn {
  border: none;
  background-color: rgb(0, 74, 177);
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
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
