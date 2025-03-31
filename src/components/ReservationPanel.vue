<script setup>
import ReservationSection from '@/components/ReservationSection.vue'
import WaitLisSection from '@/components/WaitList.vue'
import { ref } from 'vue'

const reservationsShowing = ref(true)
const waitListShowing = ref(false)

function toggleSection(e) {
  const el_id = e.target.id
  if (el_id === 'reservation') {
    reservationsShowing.value = true
    waitListShowing.value = false
  } else if (el_id === 'waitList') {
    reservationsShowing.value = false
    waitListShowing.value = true
  }
}
</script>
<template>
  <div class="reservationPanel">
    <div class="topSection">
      <p
        @click="toggleSection"
        id="reservation"
        :class="{ active: reservationsShowing === true }"
        class="reservation"
      >
        RESERVATIONS
      </p>
      <p
        @click="toggleSection"
        id="waitList"
        :class="{ active: waitListShowing === true }"
        class="waitlist"
      >
        WAITLIST
      </p>
    </div>
    <div v-if="reservationsShowing">
      <ReservationSection />
    </div>
    <div v-else-if="waitListShowing">
      <WaitLisSection />
    </div>
  </div>
</template>
<style scoped>
.reservationPanel {
  border-right: 0.1rem solid rgb(207, 207, 207);
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}
.topSection {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 0.1rem solid rgb(207, 207, 207);
}
.topSection > p {
  cursor: pointer;
}
.active {
  color: #252189;
  font-weight: bold;
}
</style>
