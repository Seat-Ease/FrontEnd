<script setup>
import ReservationShower from './ReservationShower.vue'
</script>
<template>
  <div class="reservationPanel">
    <div class="topSection">
      <p class="reservation active">RESERVATIONS</p>
      <p class="waitlist">WAITLIST</p>
      <p class="serveurs">SERVEURS</p>
    </div>
    <div class="searchSection">
      <font-awesome-icon class="search" :icon="['fas', 'search']" />
      <input class="searchInput" type="text" placeholder="Chercher un client" />
    </div>
    <div class="upcomingSection">
      <div class="upcomingSectionTopSectionContainer">
        <p class="sectionTitle">Upcoming</p>
        <font-awesome-icon :icon="['fas', 'chevron-down']" />
      </div>
      <ReservationShower />
    </div>
    <div class="seatedSection">
      <div class="seatedSectionTopSectionContainer">
        <p class="sectionTitle">Seated</p>
        <font-awesome-icon :icon="['fas', 'chevron-down']" />
      </div>
      <div class="seatedSectionList">
        <ReservationShower />
        <ReservationShower />
        <ReservationShower />
        <ReservationShower />
        <ReservationShower />
        <ReservationShower />
        <ReservationShower />
        <ReservationShower />
      </div>
    </div>
  </div>
</template>
<style>
.reservationPanel {
  border-right: 0.1rem solid rgb(207, 207, 207);
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}
.topSection {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 1.2rem;
  padding: 1rem;
  border-bottom: 0.1rem solid rgb(207, 207, 207);
}
.topSection > p {
  cursor: pointer;
}
.active {
  color: #252189;
  font-weight: bold;
  text-decoration: underline;
  text-decoration-color: #252189;
}
.searchSection {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
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
  flex-direction: column;
  min-height: 0;
  overflow-y: scroll;
}
.seatedSectionList {
  flex-grow: 1;
  overflow-y: scroll;
  min-height: 0;
}
</style>
