<template>
  <div class="form-container">
    <form>
      <div class="header-container">
        <div class="title-description-container">
          <p class="title">Ajouter une nouvelle réservation</p>
          <p class="description">Créez une nouvelle réservation pour votre cient.</p>
        </div>
        <button @click="mainStore().newReservationFormShowing = false" class="close-btn">X</button>
      </div>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <div class="input-container">
        <label for="nom-client">Nom du client</label>
        <input
          v-model="reservationData.client_name"
          id="nom-client"
          type="text"
          placeholder="ex: Fiston Mayele"
        />
      </div>
      <div class="input-container">
        <label for="telephone-client">Téléphone</label>
        <input
          v-model="reservationData.client_phone"
          id="telephone-client"
          type="number"
          placeholder="ex: 0896541234"
        />
      </div>
      <div class="day-time-container">
        <div class="input-container">
          <label for="telephone-client">Date</label>
          <input
            v-model="reservationData.date"
            id="telephone-client"
            type="date"
            placeholder="ex: 0896541234"
          />
        </div>
        <div class="input-container">
          <label for="telephone-client">Heure</label>
          <input
            v-model="reservationData.time"
            id="telephone-client"
            type="time"
            placeholder="ex: 0896541234"
          />
        </div>
      </div>
      <div class="input-container">
        <label for="telephone-client">Nombre de personnes</label>
        <input
          v-model="reservationData.party_size"
          id="telephone-client"
          type="number"
          placeholder="ex: 2"
        />
      </div>
      <button @click="submit" class="submit-btn">
        Créer la réservation
        <span v-if="loading"><SpinnerComponent /></span>
      </button>
    </form>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { reservationStore } from '@/stores/reservationStore'
import { settingsStore } from '@/stores/settingsStore'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const errorMessage = ref('')
const loading = ref(false)

function getNextDayFormatted() {
  const today = new Date()
  today.setDate(today.getDate() + 1)

  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const reservationData = ref({
  id: String(uuidv4()),
  client_name: '',
  client_phone: '',
  client_email: '',
  date: getNextDayFormatted(),
  time: '19:00',
  party_size: '',
  seated: false,
  tables_occupied: [],
  service_start_time: '',
  service_end_time: '',
  walk_in: false,
  cancelled: false,
  restaurant_id: settingsStore().getAccountUID(),
})

async function submit(e) {
  e.preventDefault()
  if (
    !reservationData.value.client_name ||
    !reservationData.value.client_phone ||
    !reservationData.value.party_size
  ) {
    errorMessage.value = 'Tous les champs sont obligatoires.'
    return
  } else errorMessage.value = ''
  loading.value = true
  await reservationStore().addReservation({ ...reservationData.value })
  loading.value = false
  reservationData.value.client_name = ''
  reservationData.value.client_phone = ''
  reservationData.value.party_size = ''
  mainStore().newReservationFormShowing = false
}
</script>
<style scoped>
.error {
  font-size: 1rem;
  color: red;
}
.form-container {
  background-color: #00000077;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  min-height: 100%;
  min-width: 100%;
  z-index: 100000000;
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  border-radius: 0.75rem;
  border: 0.1rem solid #1a365d;
  background-color: #0f172a;
  min-width: 40%;
}
.header-container {
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
}
.title-description-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.title {
  font-size: 1.6rem;
  color: #fff;
  font-weight: 600;
}
.description {
  font-size: 1.2rem;
  color: #f1f5f9;
}
.close-btn {
  border: none;
  background-color: #0f172a;
  color: #fff;
  font-size: 1.5rem;
  align-self: flex-start;
  cursor: pointer;
  font-weight: bold;
}
.input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.input-container > label {
  font-size: 1.4rem;
  color: #fff;
}
.input-container > input {
  background-color: #0f172a;
  padding: 1rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #f1f5f9;
  font-size: 1.4rem;
}
.input-container > input:focus {
  outline: 0.2rem solid #1a365d;
}
.input-container > input::placeholder {
  color: rgb(161, 161, 161) 7;
}
.day-time-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.submit-btn {
  align-self: flex-end;
  border: none;
  background-color: rgb(0, 74, 177);
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
