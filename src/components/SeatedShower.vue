<template>
  <div class="seatedShowingContainer">
    <p class="time">
      11:00 <br />
      PM
    </p>
    <div class="details">
      <p class="clientName">Huguesse Assande</p>
      <div class="stats">
        <div class="statsPeople">
          <font-awesome-icon :icon="['fas', 'user']" />
          <p>4</p>
        </div>
        <div class="statsTable">
          <p>Table(s) : 4</p>
        </div>
      </div>
    </div>
  </div>
</template>
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
  gap: 0.5rem;
  border-left: 0.1rem solid rgb(207, 207, 207);
  padding: 2rem;
}
.clientName {
  font-weight: bold;
}
.stats {
  display: flex;
  gap: 2rem;
}
.statsPeople {
  display: flex;
  gap: 1rem;
}
</style>
