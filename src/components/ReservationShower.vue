<template>
  <div class="reservationShowingContainer">
    <p class="time">{{ reservation.time }}</p>
    <div class="rightContainer">
      <div class="reservationDetailsContainer">
        <p class="clientName">{{ reservation.client_name }}</p>
        <div class="peopleCountContainer">
          <font-awesome-icon :icon="['fas', 'user']" />
          <p>{{ reservation.party_size }}</p>
        </div>
      </div>
      <div class="btnContainer">
        <p @click="emitShowing" class="assignBtn">Assoir</p>
        <!-- <p class="cancelBtn">Annuler</p> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mainStore } from '@/stores/mainStore'
export default {
  name: 'ReservationCard',
  emits: ['showing'],
  props: {
    reservation: {
      type: Object,
      required: true,
    },
  },
  methods: {
    emitShowing() {
      this.$emit('showing', this.reservation.id)
    },
  },
}
</script>
<style scoped>
.reservationShowingContainer {
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 1.5rem;
  border-bottom: 0.1rem solid rgb(230, 230, 230);
  color: #444;
}
.time {
  display: flex;
  align-self: center;
  justify-self: center;
  color: #444;
}
.rightContainer {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border-left: 0.1rem solid rgb(207, 207, 207);
  padding: 2rem 1.5rem;
}
.reservationDetailsContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.clientName {
  font-weight: bold;
  color: #444;
}
.peopleCountContainer {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #444;
}
.btnContainer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.assignBtn,
.cancelBtn {
  padding: 1rem 2rem;
  border-radius: 1.5rem;
  cursor: pointer;
  letter-spacing: 0.1rem;
  font-size: 1.2rem;
  font-weight: 600;
  border: 0.1rem solid #252189;
}
.assignBtn {
  color: #fff;
  background-color: #252189;
}
.cancelBtn {
  color: #252189;
}
</style>
