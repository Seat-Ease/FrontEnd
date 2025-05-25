<template>
  <div class="reservation-card">
    <div class="reservation-details">
      <div class="name-status-container">
        <p class="customer-name">{{ reservation.client_name }}</p>
        <p :class="{ seated: seated }" class="reservation-status">
          {{ seated ? 'placé' : 'confirmée' }}
        </p>
      </div>
      <div class="phone-party-size-container">
        <p class="party-size">
          <font-awesome-icon :icon="['fas', 'user']" />
          <span>{{ reservation.party_size }}</span>
        </p>
        <font-awesome-icon class="point" :icon="['fas', 'circle']" />
        <p class="phone">
          <font-awesome-icon :icon="['fas', 'phone-volume']" />
          <span>{{ reservation.client_phone }}</span>
        </p>
        <font-awesome-icon class="point" :icon="['fas', 'circle']" />
        <p class="time">
          <font-awesome-icon :icon="['fas', 'clock']" />
          {{ seated ? 'Placé à ' : '' }}
          {{ seated ? reservation.service_start_time : reservation.time }}
        </p>
        <font-awesome-icon v-if="seated" class="point" :icon="['fas', 'circle']" />
        <p v-if="seated">{{ formatTableList().join() }}</p>
      </div>
    </div>
    <div class="action-btns-container">
      <button
        @click="
          () => {
            mainStore().freeTablesListShowingReservation = true
            mainStore().selectedReservation = reservation
          }
        "
        v-if="!seated && todayStr === selectedDateStr"
        class="seat-btn btn"
      >
        Placer
      </button>
      <button
        v-if="!seated"
        @click="reservationStore().cancelReservation(reservation.id)"
        class="cancel-btn btn"
      >
        Annuler
      </button>
      <button
        v-if="seated"
        @click="
          async () => {
            try {
              loadingEndService = true
              await reservationStore().endServiceForReservation(reservation.id)
              reservation.tables_occupied.forEach(
                async (table) => await floorStore().updateTableState(table.id),
              )
            } finally {
              loadingEndService = false
            }
          }
        "
        class="end-btn btn"
      >
        Terminé
        <span v-if="loadingEndService"><SpinnerComponent /></span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { reservationStore } from '@/stores/reservationStore'
import { floorStore } from '@/stores/floorStore'
import { computed, ref } from 'vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const props = defineProps({
  reservation: { type: Object, required: true },
  seated: { type: Boolean, required: true },
})

const loadingEndService = ref(false)

const todayStr = new Date().toDateString()
const selectedDateStr = new Date(computed(() => mainStore().appDate).value).toDateString()

function formatTableList() {
  const tableNamesFormatted = []
  props.reservation.tables_occupied.forEach((table) =>
    tableNamesFormatted.push(`${table.name} (${table.room_name})`),
  )
  return tableNamesFormatted
}
</script>
<style scoped>
.reservation-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #0f172a;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  padding: 2rem;
}
.reservation-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.name-status-container,
.phone-party-size-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.2rem;
  color: #f6f6f6;
}
.reservation-status {
  border: 0.1rem solid #0d9488;
  color: #0d9488;
  padding: 0.5rem 0.75rem;
  border-radius: 3rem;
}
.seated {
  border: 0.1rem solid rgb(0, 74, 177);
  color: rgb(0, 74, 177);
  padding: 0.5rem 0.75rem;
  border-radius: 3rem;
}
.phone,
.party-size,
.time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
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
  display: flex;
  gap: 1rem;
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
.point {
  font-size: 0.5rem;
}
</style>
