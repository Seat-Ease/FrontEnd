<template>
  <form class="walkinForm">
    <div class="titleContainer">
      <p>Nouveau</p>
      <button @click="closeForm" class="cancelBtn">Annuler</button>
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
</template>
<script setup>
import { reservationStore } from '@/stores/reservationStore'
import { mainStore } from '@/stores/mainStore'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const now = new Date()
const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const formattedTime = now.toLocaleTimeString([], {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const emit = defineEmits(['close'])

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

function closeForm(e) {
  e.preventDefault()
  emit('close')
}

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
  const reservationAdded = reservationStore().addReservation({ ...newReservationData.value })
  newReservationData.value.client_name = ''
  newReservationData.value.client_email = ''
  newReservationData.value.client_phone = ''
  newReservationData.value.party_size = ''
  newReservationData.value.seated = false
  if (reservationAdded.seated) {
    mainStore().selectedReservation = reservationAdded.id
    mainStore().freeTablesListShowingWaitList = true
    closeForm(e)
    return
  }
  closeForm(e)
}
</script>
<style scoped>
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
</style>
