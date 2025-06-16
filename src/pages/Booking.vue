<template>
  <div v-if="pageFound === true">
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
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { bookingStore } from '@/stores/bookingStore'

const route = useRoute()

const pageFound = computed(async () => await bookingStore().isIdValid(route.params.id))

onMounted(() => {
  console.log(pageFound.value)
})
</script>
<style scoped>
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
