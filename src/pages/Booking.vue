<template>
  <div v-if="pageFound === null" class="loading-container">Loading...</div>
  <div v-else-if="pageFound === true">
    <h1>Booking page</h1>
    <div>Restaurant id: {{ $route.params.id }}</div>
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

onMounted(async () => {
  try {
    pageFound.value = await bookingStore().isIdValid(route.params.id)
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
