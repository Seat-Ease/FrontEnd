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
    <ReservationBox
      boxTitle="Réservations à venir"
      boxDescription="Nombres de réservations à venir"
      noReservationText="Aucune réservation à venir pour aujourd'hui"
      :reservationListEmpty="
        reservationStore().getUpcomingReservations(mainStore().appDate).length === 0
      "
      :totalCount="reservationStore().getUpcomingReservations(mainStore().appDate).length"
      :seated="false"
      :reservationList="reservationStore().getUpcomingReservations(mainStore().appDate)"
    />
    <ReservationBox
      boxTitle="Réservations placées"
      boxDescription="Clients actuellement dans votre restaurant"
      noReservationText="Aucun client n'est actuellement à table"
      :reservationListEmpty="
        reservationStore().getSeatedReservations(mainStore().appDate).length === 0
      "
      :totalCount="reservationStore().getSeatedReservations(mainStore().appDate).length"
      :seated="true"
      :reservationList="reservationStore().getSeatedReservations(mainStore().appDate)"
    />
  </div>
</template>
<script setup>
import { reservationStore } from '@/stores/reservationStore'
import { mainStore } from '@/stores/mainStore'
import ReservationBox from '@/components/reservation/ReservationBox.vue'
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
