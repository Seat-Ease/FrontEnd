<template>
  <div class="top-bar">
    <div class="nameContainer">
      <p class="restaurantName">Demo Restaurant</p>
      <font-awesome-icon class="chevronDown" :icon="['fas', 'angle-down']" />
    </div>
    <div class="dateContainer">
      <font-awesome-icon
        @click="main_store.goToPreviousDay"
        class="backwardDate"
        :icon="['fas', 'chevron-left']"
      />
      <font-awesome-icon
        @click="main_store.toggleCalendar"
        class="calendar"
        :icon="['fas', 'calendar']"
      />
      <p class="date">{{ formattedDate }}</p>
      <font-awesome-icon
        @click="main_store.goToNextDay"
        class="forwardDate"
        :icon="['fas', 'chevron-right']"
      />
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { computed } from 'vue'

const main_store = mainStore()

const formattedDate = computed(() => {
  return main_store.appDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
})
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
