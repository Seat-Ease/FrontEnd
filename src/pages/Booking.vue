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
  </div>
  <div v-else class="not-found-container">
    <h1 class="oops-title">Oops!</h1>
    <p>404 - Page non trouvée</p>
    <p>Veuillez demander au restaurant de vous fournir un lien valide.</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { bookingStore } from '@/stores/bookingStore'

const route = useRoute()

const pageFound = ref(null)
const restaurantData = ref(null)

const phone_number_formatted = ref(null)

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
.not-found-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #1e293b;
}
.oops-title {
  font-size: 10rem;
  letter-spacing: 0.5rem;
  font-weight: bold;
  color: #4b6cb7;
}
.not-found-container p {
  font-size: 1.6rem;
  color: #fff;
}
</style>
