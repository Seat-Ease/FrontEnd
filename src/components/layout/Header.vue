<template>
  <div class="top-bar">
    <h3 class="restaurant-name">Demo Restaurant</h3>
    <div class="dateContainer">
      <font-awesome-icon
        @click="main_store.toggleCalendar"
        class="calendar"
        :icon="['fas', 'calendar']"
      />
      <p class="date">{{ formattedDate }}</p>
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
<style scoped>
.top-bar {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem;
  background-color: #0f172a;
  border-bottom: 0.15rem solid #1a365d;
}
.dateContainer {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 1.6rem;
  color: #f1f5f9;
  justify-self: end;
  font-weight: 500;
}
.restaurant-name {
  font-size: 1.6rem;
  color: #fff;
  font-weight: 500;
}
</style>
