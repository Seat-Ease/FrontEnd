<script setup>
import Topbar from '@/components/Topbar.vue'
</script>

<template>
  <main>
    <Topbar />
    <div class="side-bar">
      <div>
        <div class="reserveBtnContainer">
          <button class="reserveBtn">
            <font-awesome-icon :icon="['fas', 'plus']" />
          </button>
          <p>RESERVER</p>
        </div>
        <div class="floorBtnContainer">
          <p class="floorBtn">PLAN</p>
        </div>
      </div>
      <div class="brandContainer">
        <h1 class="brand">
          Seat <br />
          Ease
        </h1>
      </div>
    </div>
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body,
#app {
  font-size: 62.5%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: 'Hepta Slab', serif;
  font-optical-sizing: auto;
  font-style: normal;
}
main {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.side-bar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #121123dd;
  height: 100%;
  width: 7.5%;
  flex: 1;
}
.reserveBtnContainer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  background-color: #d86004;
  cursor: pointer;
}
.reserveBtnContainer > p {
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
}
.reserveBtn {
  padding: 1rem;
  border: none;
  background-color: #fff;
  border-radius: 100%;
  width: 35%;
  color: #d86004;
  cursor: pointer;
}
.floorBtnContainer {
  color: #fff;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #0f0e22;
  cursor: pointer;
}
.brandContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 1rem;
  padding: 1rem;
}
</style>
