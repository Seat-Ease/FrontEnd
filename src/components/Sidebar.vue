<template>
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
</template>
<style>
.side-bar {
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: #121123dd;
  height: 100%;
  max-height: 100vh;
  flex: 1;
  overflow: hidden;
  position: relative;
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
  align-self: flex-start;
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
  justify-content: end;
  color: #fff;
  font-size: 1rem;
  padding: 1rem;
  padding-bottom: 5rem;
  margin-top: auto;
  position: absolute;
  height: 100%;
}
</style>
