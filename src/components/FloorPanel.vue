<template>
  <div class="floorPlanPanel">
    <div class="topBarFloorPanel">
      <div class="roomsList">
        <p class="room activeRoom">Salle Principale</p>
        <p class="room">Terrasse</p>
        <p class="room">Salle VIP</p>
      </div>
      <div class="modification">
        <p>Modifier le plan</p>
      </div>
    </div>
    <div class="floorContainer"></div>
  </div>
</template>
<style>
.floorPlanPanel {
  display: flex;
  flex-direction: column;
}
.topBarFloorPanel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.1rem solid rgb(230, 230, 230);
  font-size: 1.2rem;
}
.room {
  cursor: pointer;
}
.roomsList {
  display: flex;
  gap: 4rem;
  padding-left: 1rem;
}
.activeRoom {
  color: #252189;
  font-weight: bold;
}
.modification {
  border-left: 0.1rem solid rgb(230, 230, 230);
  padding: 1rem;
}
.modification > p {
  cursor: pointer;
}
.floorContainer {
  flex: 1;
  background-color: rgb(230, 230, 230);
}
</style>
