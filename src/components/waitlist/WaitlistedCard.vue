<template>
  <div class="waitlisted-card">
    <p class="name">{{ reservation.client_name }}</p>
    <p class="phone">{{ reservation.client_phone }}</p>
    <p class="party_size">{{ reservation.party_size }}</p>
    <p class="arrived-time">{{ reservation.time }}</p>
    <div class="action-btns-container">
      <button
        @click="
          () => {
            mainStore().freeTablesListShowingWaitList = true
            mainStore().selectedReservation = reservation
          }
        "
        class="seat-btn btn"
      >
        Placer
      </button>
      <button class="cancel-btn btn">Annuler</button>
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
const props = defineProps({
  reservation: { type: Object, required: true },
})
</script>
<style scoped>
.waitlisted-card {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-bottom: 0.1rem solid #1a365d;
  padding-bottom: 1.5rem;
  padding-top: 1.5rem;
}
.waitlisted-card p {
  display: flex;
  align-items: center;
  height: 100%;
  color: #fff;
  font-size: 1.2rem;
}
.action-btns-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.btn {
  border: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
}
.seat-btn {
  background-color: #0d9488;
}
.end-btn {
  background-color: rgb(0, 74, 177);
}
.cancel-btn {
  border: 0.2rem solid #1a365d;
  background-color: #1e293b;
}
</style>
