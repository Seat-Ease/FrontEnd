<script setup>
import ReservationSection from '@/components/ReservationSection.vue'
import WaitLisSection from '@/components/WaitList.vue'
import { mainStore } from '@/stores/mainStore'
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
    <div v-if="mainStore().reservationFormShowing" class="reservationFormContainer">
      <form class="reservationForm">
        <button @click="mainStore().reservationFormShowing = false">close</button>
      </form>
    </div>
    <div class="topSection">
      <p
        @click="toggleSection"
        id="reservation"
        :class="{ active: reservationsShowing === true }"
        class="reservation"
      >
        RÉSERVATIONS
      </p>
      <p
        @click="toggleSection"
        id="waitList"
        :class="{ active: waitListShowing === true }"
        class="waitlist"
      >
        SANS RÉSERVATIONS
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
  min-height: 100vh;
  overflow: scroll;
  position: relative;
}
.reservationFormContainer {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: #fff;
  z-index: 10000;
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
