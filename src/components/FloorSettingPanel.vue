<template>
  <div class="floorSettingContainer">
    <div class="topBar">
      <button class="closeBtn">Fermer</button>
      <p class="title">CONFIGURATIONS DU PLAN</p>
      <button class="saveBtn">Enregistrer</button>
    </div>
    <div class="mainFloor">
      <div class="sideBar">
        <div class="optionsContainer">
          <p class="optionLocalTitle">Options de table</p>
          <p class="optionLocalText">
            Cliquez ou faites glisser et déposez facilement vos tables, nommez-les et choisissez le
            nombre minimum et maximum de couverts.
          </p>
        </div>
        <div class="detailsContainer">
          <form class="roomForm">
            <p class="detailLocalTitle">
              {{ editingActivated ? 'Modifier' : 'Ajouter' }} une salle
            </p>
            <div>
              <label for="roomName">Nom de la salle</label>
              <input v-model="roomNameInput" name="roomName" type="text" class="roomNam" />
            </div>
            <button @click="handleRoomCreation" class="addRoomBtn">
              {{ editingActivated ? 'Enregistrer' : 'Ajouter la salle' }}
            </button>
          </form>
          <form class="tableForm">
            <p class="detailLocalTitle">Ajouter une table</p>
            <div>
              <label for="tableName">Nom/Numéro de la table</label>
              <input name="tableName" type="text" class="tableName" />
            </div>
            <div>
              <label for="minCovers">Couvert minimal</label>
              <input name="minCovers" type="text" class="minCovers" />
            </div>
            <div>
              <label for="maxCovers">Couvert maximal</label>
              <input name="maxCovers" type="text" class="maxCovers" />
            </div>
            <button class="addTableBtn">Ajouter la table</button>
          </form>
        </div>
      </div>
      <div class="mainSection">
        <div class="topSection">
          <div class="roomsListContainer">
            <p
              @click="selectedRoomId = room.id"
              :class="{ selectedRoom: selectedRoomId === room.id }"
              v-for="room in rooms"
              :ref="room.id"
              :id="room.id"
            >
              {{ room.name }}
            </p>
          </div>
          <p @click="activateEditing" class="editBtn">Modifier la salle</p>
          <p @click="handleRoomDeletion" class="deleteBtn">Supprimer la salle</p>
        </div>
        <div class="canvasContainer"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { floorStore } from '@/stores/floorStore'

const roomNameInput = ref('')
const editingActivated = ref(false)

const floor_store = floorStore()
const rooms = computed(() => floor_store.getRoomsList())
const selectedRoomId = ref('')

const handleRoomCreation = (e) => {
  e.preventDefault()
  if (roomNameInput.value.length === 0) return
  if (editingActivated.value === true) {
    floor_store.updateRoom({ id: selectedRoomId.value, name: roomNameInput.value })
    roomNameInput.value = ''
    selectedRoomId.value = ''
    editingActivated.value = false
    return
  }
  const room = { id: Math.random(), name: roomNameInput.value }
  floor_store.updateRoomsList(room)
  roomNameInput.value = ''
}
const handleRoomDeletion = (e) => {
  e.preventDefault()
  floor_store.deleteRoom(selectedRoomId.value)
}
const activateEditing = () => {
  editingActivated.value = true
  const room = rooms.find((item) => item.id === selectedRoomId.value)
  roomNameInput.value = room.name
}
</script>
<style scoped>
.floorSettingContainer,
.mainFloor {
  width: 100%;
  height: 100%;
  max-height: 100vh;
}
.topBar {
  display: flex;
  justify-content: space-between;
  background-color: #252189;
  font-size: 1.6rem;
  color: #fff;
  padding: 1rem;
}
.topBar > button {
  border: none;
  font-size: inherit;
  color: inherit;
  background-color: inherit;
  font-weight: bold;
  letter-spacing: 0.1rem;
  cursor: pointer;
}
.mainFloor {
  display: grid;
  grid-template-columns: 2.65fr 6fr;
}
.sideBar {
  height: 100%;
  border-right: 0.1rem solid rgb(207, 207, 207);
  display: grid;
  grid-template-rows: 0.4fr 0.7fr;
}
.optionsContainer {
  border-bottom: 0.1rem solid rgb(207, 207, 207);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
}
.optionLocalTitle,
.detailLocalTitle {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
}
.optionLocalText {
  font-size: 1.2rem;
  line-height: 1.5;
}
.tableForm,
.roomForm {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 1.2rem;
}
.detailsContainer {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  padding: 2rem;
}
.tableForm > div,
.roomForm > div {
  display: grid;
  grid-template-columns: 2fr 2fr;
}
.tableForm > div > input,
.roomForm > div > input {
  border: none;
  border-bottom: 0.1rem solid rgb(207, 207, 207);
}
.tableForm > div > input:focus,
.roomForm > div > input:focus {
  outline: none;
}
.addTableBtn,
.addRoomBtn {
  width: 50%;
  margin: 0 auto;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.3rem;
  background-color: #252189;
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.15rem;
  border-radius: 2rem;
  cursor: pointer;
}
.mainSection {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
}
.topSection {
  display: grid;
  grid-template-columns: 7fr 1.5fr 1.5fr;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 0.1rem solid rgb(207, 207, 207);
  font-size: 1.2rem;
}
.roomsListContainer {
  display: flex;
  gap: 1rem;
  overflow-x: scroll;
  padding-left: 1rem;
  align-items: center;
}
.roomsListContainer > p {
  min-width: 10%;
}
.editBtn {
  color: #252189;
  cursor: pointer;
}
.deleteBtn {
  color: red;
  cursor: pointer;
}
.selectedRoom {
  font-weight: bold;
  color: #252189;
}
.canvasContainer {
  height: 100%;
  flex: 1;
  background-color: rgb(207, 207, 207);
}
</style>
