<template>
  <div v-if="pageFound === null" class="loading-container">Chargement en cours...</div>
  <div v-else-if="pageFound === true" class="page-container">
    <div v-if="confirmationMessageShowing" class="confirmation-message-container">
      <p class="confirmation-message">
        Votre réservation a été créée avec succès.
        <br />
        Vous recevrez un message de confirmation via WhatsApp sous peu.
      </p>
      <p class="confirmation-message">
        Cliquez
        <span
          @click="confirmationMessageShowing = false"
          class="redirect-btn"
        >
          ici
        </span>
        pour retourner à la page d'accueil.
      </p>
    </div>
    <div v-if="waitingMessageShowing && !confirmationMessageShowing" class="waiting-message-container">
      <p class="waiting-message">
        Votre réservation est en cours de traitement. Veuillez patienter.
        <br />
        <br />
        Il est important de ne pas rafraîchir la page.
      </p>
    </div>
    <div v-if="!confirmationMessageShowing" class="booker-container">
      <div class="restaurant-info-container">
        <h3 class="name">{{ restaurantData?.general.name }}</h3>
        <p class="location">
          {{ restaurantData?.general.address }}, {{ restaurantData?.general.city }}
        </p>
        <p class="phone">
          {{ phone_number_formatted }}
        </p>
        <p class="schedule">
          Ouvert {{ getBusinessDays(restaurantData?.schedule) }} de
          {{ localOpeningTime }} à {{ localClosingTime }}
        </p>
      </div>
      <p class="instruction">
        Veuillez sélectionner le nombre de personnes, la date et l'heure de votre réservation
      </p>
      <div class="picker-container">
        <input
          id="party-size"
          type="number"
          class="party-size"
          v-model="reservationData.party_size"
        />
        <input
          id="reservation-date"
          type="date"
          class="date"
          v-model="reservationData.date"
          @change="onDateChange"
        />
      </div>
      <div v-if="slotsLoading" class="loading-slots">Chargement en cours...</div>
      <div v-else class="slots-container">
        <div v-if="reservationSlots.length > 0 && !slotsLoading">
          <ul class="slots-list">
            <li v-for="slot in reservationSlots" :key="slot.id">
              <button
                class="slot-item"
                :class="{ 'selected-slot': selectedSlot?.id === slot.id }"
                @click="() => {
                  updateSelectedSlot(slot)
                  reservationData.time = slot.time
                }"
              >
                {{ slot.time }}
              </button>
            </li>
          </ul>
        </div>
        <div v-else>
          <p class="no-slots-txt">Aucune disponibilité pour cette date. Veuillez choisir une autre date.</p>
        </div>
      </div>
      <p v-if="reservationSlots.length > 0" class="instruction-2">
        Veuillez entrer votre nom complet et numéro de téléphone pour finaliser la réservation.
      </p>
      <div v-if="reservationSlots.length > 0" class="personal-info-container">
        <input
          id="full-name"
          type="text"
          class="full-name"
          placeholder="Nom complet"
          v-model="reservationData.client_name"
        />
        <input
          id="phone-number"
          type="tel"
          class="phone-number"
          placeholder="Numéro de téléphone"
          v-model="reservationData.client_phone"
        />
      </div>
      <button v-if="reservationSlots.length > 0" @click="submitReservation" class="submit-btn">Réservez</button>
    </div>
  </div>
  <Page404 v-else />
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'
import { bookingStore } from '@/stores/bookingStore'
import Page404 from '@/components/booking/Page404.vue'

const waitingMessageShowing = ref(false)
const confirmationMessageShowing = ref(false)

const now = new Date()
const todayStr = now.toISOString().slice(0, 10)
const route = useRoute()
const dayDict = {
  'sunday': 'Dimanche',
  'monday': 'Lundi',
  'tuesday': 'Mardi',
  'wednesday': 'Mercredi',
  'thursday': 'Jeudi',
  'friday': 'Vendredi',
  'saturday': 'Samedi',
}

const pageFound = ref(null)
const restaurantData = ref(null)

const reservationSlots = computed(() => bookingStore().reservationSlots)
const slotsLoading = ref(false)
const localOpeningTime = ref('')
const localClosingTime = ref('')

const selectedSlot = ref(null)
const phone_number_formatted = ref(null)

function updateSelectedSlot(slot) {
  selectedSlot.value = slot
}


function getBusinessDays(scheduleObj) {
  const businessDays = []
  for (const key of Object.keys(scheduleObj)) {
    if (scheduleObj[key] && dayDict[key]) {
      businessDays.push(dayDict[key])
    }
  }
  return businessDays.join(', ')
}

function getDayFormatted() {
  const today = new Date()
  today.setDate(today.getDate())

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
  date: getDayFormatted(),
  time: '19:00',
  party_size: 2,
  seated: false,
  tables_occupied: [],
  service_start_time: '',
  service_end_time: '',
  walk_in: false,
  cancelled: false,
  restaurant_id: route.params.id,
})

async function onDateChange() {
  slotsLoading.value = true
  try {
    await bookingStore().getReservationSlots(
      restaurantData.value.account_uid, reservationData.value.date,
      restaurantData.value.schedule.opening_time,
      restaurantData.value.schedule.closing_time
    )
    updateSelectedSlot(reservationSlots.value.find(slot => slot.time === reservationData.value.time))
    slotsLoading.value = false
  } catch (error) {
    console.error('Error fetching reservation slots:', error)
  }
}

async function submitReservation() {
  if (!selectedSlot.value) {
    alert('Veuillez sélectionner une heure de réservation.')
    return
  }
  if (reservationData.value.client_name.length === 0) {
    alert('Veuillez entrer votre nom complet.')
    return
  }
  if (reservationData.value.client_phone.length === 0) {
    alert('Veuillez entrer votre numéro de téléphone.')
    return
  }

  waitingMessageShowing.value = true
  try {
    await bookingStore().createReservation({ ...reservationData.value }, { ...selectedSlot.value })
    reservationData.value.client_name = ''
    reservationData.value.client_phone = ''
    reservationData.value.date = getDayFormatted()
    reservationData.value.time = '19:00'
    reservationData.value.party_size = 2
    reservationData.value.id = String(uuidv4())
    reservationData.value.tables_occupied = []
    reservationData.value.service_start_time = ''
    reservationData.value.service_end_time = ''
    reservationData.value.walk_in = false
    reservationData.value.cancelled = false
    reservationData.value.restaurant_id = route.params.id
    updateSelectedSlot(reservationSlots.value.find(slot => slot.time === reservationData.value.time))
    confirmationMessageShowing.value = true
  } catch (error) {
    console.error('Error creating reservation:', error)
    alert('Une erreur est survenue lors de la réservation. Veuillez réessayer plus tard.')
  } finally {
    waitingMessageShowing.value = false
  }
}

onMounted(async () => {
  try {
    if (await bookingStore().isIdValid(route.params.id)) {
      pageFound.value = true
      restaurantData.value = await bookingStore().getRestaurantData(route.params.id)
      phone_number_formatted.value = `(${String(restaurantData.value.general.phone).slice(0, 3)}) ${String(restaurantData.value.general.phone).slice(3, 6)}-${String(restaurantData.value.general.phone).slice(6)}`
      localOpeningTime.value = new Date(todayStr + "T" + restaurantData.value.schedule.opening_time + ":00Z")
        .toTimeString().slice(0, 5)
      localClosingTime.value = new Date(todayStr + "T" + restaurantData.value.schedule.closing_time + ":00Z")
        .toTimeString().slice(0, 5)
        updateSelectedSlot(reservationSlots.value.find(slot => slot.time === reservationData.value.time))
    } else {
      pageFound.value = false
    }
  } catch (e) {
    console.log(e)
  }

  slotsLoading.value = true
  try {
    await bookingStore().getReservationSlots(
      restaurantData.value.account_uid, reservationData.value.date
    )
    slotsLoading.value = false
  } catch (error) {
    console.error('Error fetching reservation slots:', error)
  }
})
</script>
<style scoped>
.confirmation-message-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 2rem;
}
.confirmation-message {
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
}
.redirect-btn {
  color: #0d9488;
  cursor: pointer;
  text-decoration: underline;
}
.waiting-message-container {
  background-color: #00000077;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  min-height: 100%;
  min-width: 100%;
  z-index: 1000000;
}
.waiting-message {
  background-color: #0d9488;
  padding: 2rem 3.5rem;
  border-radius: 0.75rem;
  color: #fff;
  font-size: 1.2rem;
  font-weight: 600;
  width: 75%;
  text-align: center;
  align-self: flex-start;
  margin-top: 25rem;
}
.loading-container {
  width: 100%;
  background-color: #1e293b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}
.loading-slots {
  width: 100%;
  background-color: #1e293b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 600;
}
.page-container,
.booker-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #1e293b;
  width: 100%;
}
.booker-container {
  padding: 0 2rem;
  padding-top: 2rem;
}
.restaurant-info-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.name {
  font-size: 1.6rem;
  color: #fff;
  letter-spacing: 0.1rem;
}
.location,
.phone,
.schedule {
  font-size: 1.2rem;
  color: #cccccc;
}
.instruction {
  font-size: 1.2rem;
  color: #f9f3f3;
}
.instruction-2 {
  font-size: 1.2rem;
  color: #f9f3f3;
}
.picker-container,
.personal-info-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.picker-container > input,
.personal-info-container > input {
  background-color: #0f172a;
  padding: 1rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #f1f5f9;
  font-size: 1.4rem;
}
.picker-container > input:focus,
.personal-info-container > input:focus {
  outline: 0.2rem solid #1a365d;
}
.picker-container > input::placeholder,
.personal-info-container > input::placeholder {
  color: rgb(161, 161, 161) 7;
}
.slots-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  list-style: none;
}
.slot-item {
  display: flex;
  justify-content: center;
  width: 100%;
  color: #1a365d;
  border: none;
  border-radius: .75rem;
  padding: .5rem 1rem;
  font-size: 1.2rem;
  font-weight: 600;
}
.no-slots-txt {
  color: #f9f3f3;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 1rem;
}
.selected-slot {
  background-color: #0d9488;
  color: #fff;
}
.submit-btn {
  background-color: #0d9488;
  color: #fff;
  border: none;
  border-radius: .75rem;
  padding: .75rem 1.5rem;
  letter-spacing: .1rem;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  width: 50%;
  align-self: center;
  margin-bottom: 3rem;
}
</style>
