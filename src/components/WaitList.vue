<template>
  <div class="waitListSectionContainer">
    <div class="searchSection">
      <font-awesome-icon class="search" :icon="['fas', 'search']" />
      <input class="searchInput" type="text" placeholder="Chercher un client" />
    </div>
    waitList
  </div>
</template>
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
</style>
