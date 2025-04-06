<template>
  <div class="waitListSectionContainer">
    <transition name="slide-fade-x">
      <div v-if="main_store.freeTablesListShowingWaitList" class="tablesListContainer">
        <FreeTables @close="main_store.freeTablesListShowingWaitList = false" />
      </div>
    </transition>
    <div v-if="showForm" class="walkinFormContainer">
      <form class="walkinForm">
        <div class="titleContainer">
          <p>Nouveau</p>
          <button @click="showForm = false" class="cancelBtn">Annuler</button>
        </div>
        <p v-if="error" class="errorMessage">Tous les champs avec * sont obligatoires</p>
        <div class="inputContainer">
          <label for="client_name">Nom *</label>
          <input v-model="newReservationData.client_name" id="client_name" type="text" />
        </div>
        <div class="inputContainer">
          <label for="client_email">Courriel</label>
          <input v-model="newReservationData.client_email" id="client_email" type="text" />
        </div>
        <div class="inputContainer">
          <label for="client_phone">Téléphone *</label>
          <input v-model="newReservationData.client_phone" id="client_phone" type="text" />
        </div>
        <div class="inputContainer">
          <label for="party_size">Nb de personnes *</label>
          <input v-model="newReservationData.party_size" id="party_size" type="text" />
        </div>
        <div class="inputContainer">
          <label for="seated"> Assis immédiatement ? </label>
          <input v-model="newReservationData.seated" id="seated" type="checkbox" />
        </div>
        <button @click="addWalkin" class="addBtn">Ajouter</button>
      </form>
    </div>
    <div class="searchSection">
      <font-awesome-icon class="search" :icon="['fas', 'search']" />
      <input class="searchInput" type="text" placeholder="Chercher un client" />
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
import { v4 as uuidv4 } from 'uuid'
import { reservationStore } from '@/stores/reservationStore'
import { mainStore } from '@/stores/mainStore'
import FreeTables from './FreeTables.vue'
import ReservationCard from './ReservationShower.vue'

const reservation_store = reservationStore()
const main_store = mainStore()

const searchInput = ref('')

const walkinReservations = computed(() => {
  const appDateStr = new Date(main_store.appDate).toISOString().split('T')[0]
  return reservation_store.getWalkinReservations(appDateStr)
})

function getReservations(reservationArr) {
  if (searchInput.value.length === 0) return reservationArr
  else
    return reservationArr.filter((reservation) =>
      reservation.client_name.includes(searchInput.value),
    )
}

const now = new Date()
const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const formattedTime = now.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const showForm = ref(false)
const error = ref(false)

const newReservationData = ref({
  id: String(uuidv4()),
  client_name: '',
  client_email: '',
  client_phone: '',
  party_size: '',
  date: todayStr,
  time: formattedTime,
  seated: false,
  tables_occupied: [],
  service_start_time: '',
  service_end_time: '',
  walk_in: true,
})

function addWalkin(e) {
  e.preventDefault()
  if (
    newReservationData.value.client_name === '' ||
    newReservationData.value.client_phone === '' ||
    newReservationData.value.party_size === ''
  ) {
    error.value = true
    return
  }
  error.value = false
  const reservationAdded = reservation_store.addReservation({ ...newReservationData.value })
  newReservationData.value.client_name = ''
  newReservationData.value.client_email = ''
  newReservationData.value.client_phone = ''
  newReservationData.value.party_size = ''
  newReservationData.value.seated = false
  if (reservationAdded.seated) {
    main_store.selectedReservation = reservationAdded.id
    main_store.freeTablesListShowingWaitList = true
    showForm.value = false
    return
  }
  showForm.value = false
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
.walkinForm {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.titleContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #d2d2d2;
  border-bottom: 0.15rem solid #444;
  border-top: 0.15rem solid #444;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
}
.cancelBtn {
  padding: 1rem 2rem;
  border: 0.15rem solid #252189;
  background-color: #d2d2d2;
  color: #252189;
  font-size: 1.2rem;
  border-radius: 1rem;
  letter-spacing: 0.05rem;
  cursor: pointer;
}
.inputContainer {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  font-size: 1.2rem;
}
.inputContainer > input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 0.1rem solid #222;
}
.inputContainer > input:focus {
  outline: none;
}
.addBtn {
  align-self: center;
  border: none;
  border-radius: 1rem;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.1rem;
  color: #fff;
  background-color: #252189;
  cursor: pointer;
}
.errorMessage {
  color: red;
  align-self: center;
  margin-top: 1rem;
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
