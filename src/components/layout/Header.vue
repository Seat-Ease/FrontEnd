<template>
  <div class="top-bar">
    <h3 class="restaurant-name">{{ settingsStore().getGeneralInfo().name }}</h3>
    <div class="utils-container">
      <div class="dateContainer">
        <font-awesome-icon
          @click="mainStore().toggleCalendar"
          class="calendar"
          :icon="['fas', 'calendar']"
        />
        <p class="date">{{ formattedDate }}</p>
      </div>
      <button @click="handleSignout" class="signout-btn">Fermer la session</button>
    </div>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { settingsStore } from '@/stores/settingsStore'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { app } from '@/firebase'
import { getAuth, signOut } from 'firebase/auth'

const formattedDate = computed(() => {
  return mainStore().appDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  })
})

const router = useRouter()

async function handleSignout() {
  try {
    await signOut(getAuth(app))
    settingsStore().clearData()
    router.push('/login')
  } catch (error) {
    console.log(error.message)
  }
}
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
.utils-container {
  display: flex;
  align-items: center;
  gap: 2rem;
}
.signout-btn {
  border: 0.1rem solid #0d9488;
  padding: 1rem 2rem;
  border-radius: 0.75rem;
  font-size: 1.4rem;
  background-color: #0f172a;
  color: #0d9488;
  font-weight: 600;
  cursor: pointer;
}
</style>
