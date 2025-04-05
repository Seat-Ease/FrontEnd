<template>
  <div class="seatedShowingContainer">
    <p class="time">{{ reservation.service_start_time }}</p>
    <div class="details">
      <p class="clientName">{{ reservation.client_name }}</p>
      <div class="stats">
        <div class="statsPeople">
          <font-awesome-icon :icon="['fas', 'user']" />
          <p>{{ reservation.party_size }}</p>
        </div>
        <div class="statsTable">
          <p>
            {{ formatTableList().join() }}
          </p>
        </div>
      </div>
      <p @click="freeTables" class="serviceEndBtn">Debarasser</p>
    </div>
  </div>
</template>
<script>
import { floorStore } from '@/stores/floorStore'
export default {
  name: 'SeatedCard',
  props: {
    reservation: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatTableList() {
      const tableNamesFormatted = []
      this.reservation.tables_occupied.forEach((table) =>
        tableNamesFormatted.push(`${table.name} (${table.room_name})`),
      )
      return tableNamesFormatted
    },
    freeTables() {
      this.reservation.tables_occupied.forEach((table) => floorStore().updateTableState(table.id))
    },
  },
}
</script>
<style scoped>
.seatedShowingContainer {
  display: grid;
  grid-template-columns: 1fr 3fr;
  font-size: 1.5rem;
  border-bottom: 0.1rem solid rgb(230, 230, 230);
}
.time {
  display: flex;
  align-self: center;
  justify-self: center;
}
.details {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  border-left: 0.1rem solid rgb(207, 207, 207);
  padding: 2rem;
}
.clientName {
  font-weight: bold;
}
.stats {
  display: flex;
  gap: 1rem;
}
.statsPeople {
  display: flex;
  gap: 0.5rem;
}
.serviceEndBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #252189;
  padding: 1rem 2rem;
  color: #fff;
  font-weight: 600;
  letter-spacing: 0.1rem;
  border-radius: 1.5rem;
  align-self: flex-start;
  cursor: pointer;
}
</style>
