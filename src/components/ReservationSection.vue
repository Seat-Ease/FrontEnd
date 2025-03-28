<template>
  <div class="reservationSectionContainer">
    <div class="searchSection">
      <font-awesome-icon class="search" :icon="['fas', 'search']" />
      <input class="searchInput" type="text" placeholder="Chercher un client" />
    </div>
    <div class="upcomingSection" :class="{ 'expanded-80': isUpcomingOpen }">
      <div class="upcomingSectionTopSectionContainer">
        <p class="sectionTitle">À venir</p>
        <p class="chevron" :icon="['fas', 'chevron-up']" @click="toggleUpcoming">
          {{ isUpcomingOpen ? 'moins' : 'plus' }}
        </p>
      </div>
      <transition name="slide" mode="out-in">
        <div v-if="isUpcomingOpen" class="upcomingSectionList">
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
        </div>
      </transition>
    </div>
    <div class="seatedSection" :class="{ 'expanded-100': isSeatedOpen }">
      <div class="seatedSectionTopSectionContainer">
        <p class="sectionTitle">Assis</p>
        <p class="chevron" :icon="['fas', 'chevron-up']" @click="toggleSeated">
          {{ isSeatedOpen ? 'moins' : 'plus' }}
        </p>
      </div>
      <transition name="slide" mode="out-in">
        <div v-if="isSeatedOpen" class="seatedSectionList">
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
          <ReservationShower />
        </div>
      </transition>
    </div>
  </div>
</template>
<script setup>
import ReservationShower from './ReservationShower.vue'
import { ref } from 'vue'

const isUpcomingOpen = ref(true)
const isSeatedOpen = ref(false)

const toggleUpcoming = () => {
  console.log(isSeatedOpen.value)
  isUpcomingOpen.value = !isUpcomingOpen.value
  if (isSeatedOpen.value) {
    isSeatedOpen.value = false
  } else {
    isSeatedOpen.value = true
  }
}
const toggleSeated = () => {
  isSeatedOpen.value = !isSeatedOpen.value
  if (isUpcomingOpen.value) {
    isUpcomingOpen.value = false
  } else {
    isUpcomingOpen.value = true
  }
}
</script>
<style scoped>
.reservationSectionContainer {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.searchSection {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border-bottom: 0.1rem solid #d2d2d2;
}
.search {
  height: 2rem !important;
  width: 2rem !important;
  color: #121123dd !important;
}
.searchInput {
  border: none;
  padding: 1rem;
  width: 100%;
  font-size: 1.6rem;
}
.searchInput:focus {
  font-size: 1.6rem;
  outline: none;
}
.searchInput::placeholder {
  font-size: 1.6rem;
}
.upcomingSection,
.seatedSection {
  display: flex;
  flex-direction: column;
}
.upcomingSectionTopSectionContainer,
.seatedSectionTopSectionContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  font-size: 1.5rem;
  border-bottom: 0.2rem solid #444;
  background-color: rgb(230, 230, 230);
}
.seatedSection,
.upcomingSection {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.upcomingSection {
  border-bottom: 0.1rem solid #d2d2d2;
}
.seatedSectionList,
.upcomingSectionList {
  flex-grow: 1;
  overflow-y: auto;
}
.chevron {
  cursor: pointer;
  text-decoration: underline;
  font-size: 1.2rem;
}
.expanded-80 {
  max-height: 77.6%;
}
.expanded-100 {
  max-height: 100%;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
  overflow: hidden;
}
.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}
.slide-enter-to,
.slide-leave-from {
  max-height: 100vh;
  opacity: 1;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
</style>
