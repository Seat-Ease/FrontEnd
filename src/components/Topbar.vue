<template>
  <div class="top-bar">
    <div class="nameContainer">
      <p class="restaurantName">Demo Restaurant</p>
      <font-awesome-icon class="chevronDown" :icon="['fas', 'angle-down']" />
    </div>
    <div class="dateContainer">
      <font-awesome-icon class="backwardDate" :icon="['fas', 'chevron-left']" />
      <font-awesome-icon
        @click="main_store.toggleCalendar"
        class="calendar"
        :icon="['fas', 'calendar']"
      />
      <p class="date">Thu, 13 Jan</p>
      <font-awesome-icon class="forwardDate" :icon="['fas', 'chevron-right']" />
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'

const main_store = mainStore()
</script>
<style>
.top-bar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  padding: 1rem 2rem;
  background-color: #121123dd;
  border-bottom: 0.1rem solid #222041;
}
.nameContainer,
.dateContainer {
  display: flex;
  align-items: center;
}
.nameContainer {
  gap: 1rem;
}
.restaurantName,
.chevronDown {
  font-size: 1.8rem;
  color: #fff;
  letter-spacing: 0.1rem;
}
.dateContainer {
  gap: 1.5rem;
  font-size: 1.8rem;
  color: #fff;
}
.forwardDate,
.calendar,
.backwardDate {
  cursor: pointer;
}
</style>
