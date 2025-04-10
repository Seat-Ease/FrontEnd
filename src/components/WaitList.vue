<template>
  <div class="waitListSectionContainer">
    <transition name="slide-fade-x">
      <div v-if="main_store.freeTablesListShowingWaitList" class="tablesListContainer">
        <FreeTables @close="main_store.freeTablesListShowingWaitList = false" />
      </div>
    </transition>
    <transition name="slide-fade-x">
      <div v-if="showForm" class="walkinFormContainer">
        <WalkinForm @close="showForm = false" />
      </div>
    </transition>
    <div class="searchSection">
      <font-awesome-icon class="search" :icon="['fas', 'search']" />
      <input
        v-model="searchInput"
        class="searchInput"
        type="text"
        placeholder="Chercher un client"
      />
    </div>
    <div class="topBar">
      <p>Liste d'attente</p>
      <button @click="showForm = true" class="newWalkinBtn">Nouveau</button>
    </div>
    <div class="reservationList">
      <ReservationCard
        v-for="reservation in getReservations(walkinReservations)"
        :key="reservation.id"
        :reservation="reservation"
        @showing="showFreeTablesList"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { reservationStore } from '@/stores/reservationStore'
import { mainStore } from '@/stores/mainStore'
import FreeTables from './FreeTables.vue'
import ReservationCard from './ReservationShower.vue'
import WalkinForm from './WalkinForm.vue'

const reservation_store = reservationStore()
const main_store = mainStore()

const searchInput = ref('')
const showForm = ref(false)

const walkinReservations = computed(() => {
  return reservation_store.getWalkinReservations(main_store.appDate)
})

function getReservations(reservationArr) {
  if (searchInput.value.length === 0) return reservationArr
  else
    return reservationArr.filter((reservation) =>
      reservation.client_name.includes(searchInput.value),
    )
}

function showFreeTablesList(reservationId) {
  main_store.selectedReservation = reservationId
  main_store.freeTablesListShowingWaitList = true
}
</script>
<style scoped>
.waitListSectionContainer {
  position: relative;
  height: 100vh;
}
.tablesListContainer {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow-y: hidden;
}
.walkinFormContainer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}
.searchSection {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border-bottom: 0.1rem solid #d2d2d2;
}
.search {
  font-size: 2rem;
  color: #121123dd !important;
}
.searchInput {
  border: none;
  padding: 1rem;
  width: 100%;
  font-size: 1.6rem;
}
.searchInput:focus {
  font-size: 1.6rem;
  outline: none;
}
.searchInput::placeholder {
  font-size: 1.6rem;
}
.topBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #d2d2d2;
  border-top: 0.1rem solid #222;
  border-bottom: 0.1rem solid #222;
  font-size: 1.5rem;
  font-weight: 500;
}
.newWalkinBtn {
  border: none;
  padding: 1rem 2rem;
  color: #fff;
  background-color: #252189;
  font-weight: 600;
  letter-spacing: 0.05rem;
  border-radius: 1rem;
  cursor: pointer;
}
.slide-fade-x-enter-active,
.slide-fade-x-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
  height: 100%;
}
.slide-fade-x-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-fade-x-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-x-leave-from {
  transform: translateX(0);
  opacity: 1;
}
.slide-fade-x-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
