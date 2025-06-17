<template>
  <div v-if="pageFound === null" class="loading-container">Loading...</div>
  <div v-else-if="pageFound === true" class="page-container">
    <div class="restaurant-info-container">
      <h3 class="name">{{ restaurantData?.general.name }}</h3>
      <p class="location">
        {{ restaurantData?.general.address }}, {{ restaurantData?.general.city }}
      </p>
      <p class="phone">
        {{ phone_number_formatted }}
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
      <input id="reservation-date" type="date" class="date" v-model="reservationData.date" />
    </div>
  </div>
  <Page404 v-else />
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'
import { bookingStore } from '@/stores/bookingStore'
import Page404 from '@/components/booking/Page404.vue'

const route = useRoute()

const pageFound = ref(null)
const restaurantData = ref(null)

const phone_number_formatted = ref(null)

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

onMounted(async () => {
  try {
    if (await bookingStore().isIdValid(route.params.id)) {
      pageFound.value = true
      restaurantData.value = await bookingStore().getRestaurantData(route.params.id)
      phone_number_formatted.value = `(${String(restaurantData.value.general.phone).slice(0, 3)}) ${String(restaurantData.value.general.phone).slice(3, 6)}-${String(restaurantData.value.general.phone).slice(6)}`
    } else {
      pageFound.value = false
    }
  } catch (e) {
    console.log(e)
  }
})
</script>
<style scoped>
.loading-container {
  width: 100%;
  background-color: #1e293b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 5rem;
  font-weight: bold;
}
.page-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #1e293b;
  width: 100%;
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
.phone {
  font-size: 1.2rem;
  color: #cccccc;
}
.instruction {
  font-size: 1.2rem;
  color: #f9f3f3;
  margin-top: 5rem;
}
.picker-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.picker-container > input {
  background-color: #0f172a;
  padding: 1rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #f1f5f9;
  font-size: 1.4rem;
}
.picker-container > input:focus {
  outline: 0.2rem solid #1a365d;
}
.picker-container > input::placeholder {
  color: rgb(161, 161, 161) 7;
}
</style>
