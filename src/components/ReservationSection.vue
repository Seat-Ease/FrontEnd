<template>
  <div class="reservationSectionContainer">
    <div class="searchSection">
      <font-awesome-icon class="search" :icon="['fas', 'search']" />
      <input class="searchInput" type="text" placeholder="Chercher un client" />
    </div>
    <div class="upcomingSection">
      <div class="upcomingSectionTopSectionContainer">
        <p class="sectionTitle">Upcoming</p>
        <font-awesome-icon :icon="['fas', 'chevron-down']" />
      </div>
      <div class="upcomingSectionList">
        <ReservationShower />
      </div>
      <!-- <ReservationShower />
      <ReservationShower />
      <ReservationShower />
      <ReservationShower />
      <ReservationShower />
      <ReservationShower />
      <ReservationShower />
      <ReservationShower /> -->
    </div>
    <div class="seatedSection">
      <div class="seatedSectionTopSectionContainer">
        <p class="sectionTitle">Seated</p>
        <font-awesome-icon :icon="['fas', 'chevron-down']" />
      </div>
      <div class="seatedSectionList"></div>
    </div>
  </div>
</template>
<script setup>
import ReservationShower from './ReservationShower.vue'
</script>
<style scoped>
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
.upcomingSection {
  flex-shrink: 0;
}
.seatedSection {
  flex-grow: 1;
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  min-height: 5rem;
  overflow-y: scroll;
}
.seatedSectionList,
.upcomingSectionList {
  flex-grow: 1;
  overflow-y: scroll;
  min-height: 5rem;
}
</style>
