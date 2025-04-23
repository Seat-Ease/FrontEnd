<template>
  <div class="reservations-box">
    <div class="title-description-container">
      <h1 class="box-title">{{ boxTitle }}</h1>
      <p class="box-description">{{ boxDescription }} ({{ totalCount || 0 }})</p>
    </div>
    <p v-if="reservationListEmpty" class="no-reservation-text">
      {{ noReservationText }}
    </p>
    <div class="list-reservation">
      <ReservationCard
        v-for="reservation in reservationList"
        :id="reservation"
        :reservation="reservation"
        :seated="seated"
      />
    </div>
  </div>
</template>
<script>
import ReservationCard from './ReservationCard.vue'
export default {
  name: 'ReservationBox',
  components: {
    ReservationCard,
  },
  props: {
    boxTitle: { type: String, required: true },
    boxDescription: { type: String, required: true },
    noReservationText: { type: String, required: true },
    reservationListEmpty: { type: Boolean, required: true },
    totalCount: { type: Number, required: true },
    seated: { type: Boolean, required: true },
    reservationList: { type: Array, required: true },
  },
}
</script>
<style scoped>
.reservations-box {
  background-color: #0f172a;
  border: 0.15rem solid #1a365d;
  border-radius: 0.75rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 20rem;
  max-height: 45rem;
}
.no-reservation-text {
  font-size: 1.3rem;
  align-self: center;
  color: #d2d2d2;
}
.box-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
}
.box-title {
  font-size: 1.8rem;
}
.box-description {
  color: #f1f5f9;
  font-size: 1.1rem;
}
.list-reservation {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow: scroll;
}
</style>
