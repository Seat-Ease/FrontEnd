<template>
  <div class="top-bar">
    <div class="nameContainer">
      <p class="restaurantName">Demo Restaurant</p>
      <font-awesome-icon class="chevronDown" :icon="['fas', 'angle-down']" />
    </div>
    <div class="dateContainer">
      <button class="forwardDate">
        <font-awesome-icon :icon="['fas', 'chevron-left']" />
      </button>
      <button class="calendar">
        <font-awesome-icon :icon="['fas', 'calendar']" />
      </button>
      <p class="date">Thu, 13 Jan</p>
      <button class="backwardDate">
        <font-awesome-icon :icon="['fas', 'angle-right']" />
      </button>
    </div>
  </div>
</template>
<style>
.top-bar {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1.3fr;
  padding: 1rem 2rem;
  background-color: #255f38;
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
.dateContainer > button {
  background-color: #255f38;
  border: none;
  color: inherit;
  font-size: inherit;
  cursor: pointer;
}
</style>
