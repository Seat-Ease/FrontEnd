<template>
  <div class="seatedShowingContainer">
    <p class="time">23:00</p>
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
      <p class="serviceEndBtn">Debarasser</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SeatedCard',
  props: {
    reservation: {
      type: Object,
      required: true,
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
}
</style>
