<template>
  <div class="floorSettingContainer">
    <div v-if="savingSetting" class="saveOVerlayContainer">
      <p>Merci de patienter pendant que nous enregistrons vos modifications</p>
      <div class="ball"></div>
    </div>
    <div v-if="showClosingDialogBox" class="closingDialogOverlay">
      <div class="closingDialogBox">
        <p>Voulez-vous quitter sans enregistrer les modifications faites?</p>
        <div class="btnContainer">
          <button @click="showClosingDialogBox = false" class="leftBtn">Non</button>
          <button @click="closeWithoutSaving" class="rightBtn">Oui</button>
        </div>
      </div>
    </div>
    <div class="topBar">
      <button @click="handleWindowClosing" class="closeBtn">Fermer</button>
      <p class="title">CONFIGURATIONS DU PLAN</p>
      <button @click="saveFloorConfiguration" class="saveBtn">Enregistrer</button>
    </div>
    <div class="mainFloor">
      <div class="sideBar">
        <div class="instructionsContainer">
          <p class="instructionsTitle">Instructions</p>
          <ul class="instructionsList">
            <ol class="instructionText">1. Selectionner ou créer la salle</ol>
            <ol class="instructionText">2. Créer vos tables</ol>
            <ol class="instructionText"></ol>
          </ul>
          <ul class="importantPointsList">
            <li><strong>Important</strong></li>
            <li>Une table ne peut être créée sans sélectionner une salle</li>
            <li>Enregistrer vos modifications avant de fermer la fenêtre. Sinon, vous perdez vos modifications.</li>
          </ul>
        </div>
        <div class="detailsContainer">
          <form class="roomForm">
            <p class="detailLocalTitle">
              {{ roomEditingActivated ? 'Modifier' : 'Ajouter' }} une salle
            </p>
            <div class="inputContainer">
              <label for="roomName">Nom de la salle</label>
              <input v-model="roomNameInput" name="roomName" type="text" class="roomNam" />
            </div>
            <div class="btnsContainer">
              <div class="deleteEditBtnsContainer" v-if="roomEditingActivated">
                <button class="editRoomBtn" @click="updateRoomName">Enregistrer</button>
                <button class="deleteRoomBtn" @click="handleRoomDeletion">Supprimer</button>
                <button class="cancelRoomBtn" @click="cancelRoomEditing">Annuler</button>
              </div>
              <button v-else @click="createNewRoom" class="addRoomBtn">Ajouter la salle</button>
            </div>
          </form>
          <form class="tableForm">
            <p class="detailLocalTitle">
              {{ tableEditingActivated ? 'Modifier' : 'Ajouter' }} une table
            </p>
            <div class="inputContainer">
              <label for="tableName">Nom/Numéro de la table</label>
              <input v-model="tableNameInput" name="tableName" type="text" class="tableName" />
            </div class="inputContainer">
            <div class="inputContainer">
              <label for="minCovers">Couvert minimal</label>
              <input v-model="tableMinCoverInput" name="minCovers" type="text" class="minCovers" />
            </div>
            <div class="inputContainer">
              <label for="maxCovers">Couvert maximal</label>
              <input v-model="tableMaxCoverInput" name="maxCovers" type="text" class="maxCovers" />
            </div>
            <div class="inputContainer">
              <label for="tableShape">Forme</label>
              <select v-model="tableShapeInput" name="tableShape">
                <option value="Rect" selected>Rectangle</option>
                <option value="Circle">Cercle</option>
              </select>
            </div>
            <div class="btnsContainer">
              <div class="deleteEditBtnsContainer" v-if="tableEditingActivated">
                <button class="editRoomBtn" @click="updateTable">Enregistrer</button>
                <button class="deleteRoomBtn" @click="deleteTable">Supprimer</button>
                <button class="cancelRoomBtn" @click="cancelTableEditing">Annuler</button>
              </div>
              <button v-else @click="handleTableCreation" class="addTableBtn">
                Ajouter la table
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="mainSection">
        <div class="roomsListContainer">
          <p
            @click="handleRoomSelection"
            :class="{ selectedRoom: selectedRoomId === String(room.id) }"
            v-for="room in rooms"
            :ref="room.id"
            :id="room.id"
          >
            {{ room.name }}
          </p>
        </div>
        <div id="canvasContainer" ref="canvasContainer" class="canvasContainer">
          <v-stage ref="stageRef" :config="stageConfig"></v-stage>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, reactive } from 'vue'
import { floorStore } from '@/stores/floorStore'
import { mainStore } from '@/stores/mainStore'
import { v4 as uuidv4 } from 'uuid';
import Konva from 'konva'
import { onBeforeMount } from 'vue'

const dataFromStore = ref(null)

const main_store = mainStore()
const floor_store = floorStore()

const canvasContainer = ref(null)
const stageRef = ref(null)

const stageConfig = reactive({
  width: 1000,
  height: 1000,
  draggable: false,
})

const savingSetting = ref(false)

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function saveFloorConfiguration() {
  savingSetting.value = true
  await sleep(1000)
  const newFloorConfiguration = {
    rooms: rooms.value,
    tables: tables.value
  }
  // For future implementation
  // Make api call to update the databe
  // Then update floor store with returned value from backend
  floor_store.setFloorSetting(newFloorConfiguration)
  dataFromStore.value = floor_store.getFloorSetting()
  savingSetting.value = false
}

function deepEqual(obj1, obj2) {
    if (typeof obj1 !== "object" || typeof obj2 !== "object" || obj1 === null || obj2 === null) {
        return obj1 === obj2;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    return keys1.every(key => {
        if (Array.isArray(obj1[key]) && Array.isArray(obj2[key])) {
            return compareArrays(obj1[key], obj2[key]);
        }
        return deepEqual(obj1[key], obj2[key]);
    });
}

function compareArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = arr1.map(el => JSON.stringify(el)).sort();
  const sortedArr2 = arr2.map(el => JSON.stringify(el)).sort();

  return sortedArr1.every((val, index) => val === sortedArr2[index]);
}

const showClosingDialogBox = ref(false)

function handleWindowClosing() {
  const localFloorConfiguration = {
    rooms: rooms.value,
    tables: tables.value
  }
  if (!deepEqual(localFloorConfiguration, floor_store.getFloorSetting())) {
    showClosingDialogBox.value = true
  } else {
    rooms.value = []
    tables.value = []
    showClosingDialogBox.value = false
    main_store.floorSettingPanelShowing = false
  }
}

function closeWithoutSaving() {
  rooms.value = []
  tables.value = []
  const stage = stageRef.value.getNode()
  if (stage) {
    stage.children.forEach(room => room.destroy())
    showClosingDialogBox.value = false
    main_store.floorSettingPanelShowing = false
  }
}

// Code related to rooms

const roomNameInput = ref('')
const roomEditingActivated = ref(false)
const rooms = ref([])
const selectedRoomId = ref('')

function createNewRoom(e) {
  e.preventDefault()
  if (roomNameInput.value.length === 0) return
  if (!stageRef.value) return
  const stage = stageRef.value.getNode()
  const newRoomConfig = {
    id: String(uuidv4()),
    name: roomNameInput.value
  }
  rooms.value.push(newRoomConfig)
  const layer = new Konva.Layer({
    ...newRoomConfig, opacity: 1,
    visible: true,
  })
  if (selectedRoomId.value !== '') {
    const roomToHide = stage.children.find((room) => room.attrs.id === String(selectedRoomId.value))
    roomToHide.visible(false)
  }
  selectedRoomId.value = String(newRoomConfig.id)
  roomNameInput.value = ''
  stage.add(layer)
}
function updateRoomName(e) {
  e.preventDefault()
  if (roomNameInput.value.length === 0) return
  const roomToUpdate = rooms.value.find((room) => String(room.id) === String(selectedRoomId.value))
  if (roomToUpdate) {
    roomToUpdate.name = roomNameInput.value
  }
  roomEditingActivated.value = false
  selectedRoomId.value = ''
  roomNameInput.value = ''
}
function handleRoomSelection(e) {
  const roomId = e.target.id
  roomEditingActivated.value = true
  selectedRoomId.value = roomId
  roomNameInput.value = rooms.value.find((room) => String(room.id) === roomId).name
  nextTick(() => {
    const stage = stageRef.value.getNode().children
    stage.forEach((room) => {
      if (room.attrs.id !== selectedRoomId.value) {
        room.visible(false)
      } else {
        room.visible(true)
      }
    })
    stageRef.value.getNode().batchDraw()
  })
}
function handleRoomDeletion(e) {
  e.preventDefault()
  const stage = stageRef.value.getNode().children
  const roomToDelete = stage.find((room) => String(room.attrs.id) === String(selectedRoomId.value))
  if (!roomToDelete) return
  rooms.value = rooms.value.filter((room) => String(room.id) !== String(selectedRoomId.value))
  roomToDelete.destroy()
  roomEditingActivated.value = false
  selectedRoomId.value = ''
  roomNameInput.value = ''
}
function cancelRoomEditing(e) {
  roomEditingActivated.value = false
  roomNameInput.value = ''
}

// Code related to rooms

// Code related to tables

const tableNameInput = ref('')
const tableMaxCoverInput = ref('')
const tableMinCoverInput = ref('')
const tableShapeInput = ref('')
const selectedTableId = ref('')
const tables = ref([])
const tableEditingActivated = ref(false)

function createTable(stage, newTableData) {
  const targetRoom = stage.find((room) => room.attrs.id === newTableData.room_id)
  if (!targetRoom) return

  if (newTableData.shape === 'Circle') {
    const newTable = new Konva.Circle({
      id: String(newTableData.id),
      x: newTableData.x,
      y: newTableData.y,
      width: newTableData.width,
      height: newTableData.height,
      draggable: newTableData.draggable,
      stroke: newTableData.stroke,
      strokeWidth: newTableData.strokeWidth,
      name: newTableData.name
    })

    const label = new Konva.Label({
      x: newTable.x() - 25,
      y: newTable.y() - 65,
      opacity: 0.75,
      id: String(newTableData.id)
    })

    const tag = new Konva.Tag({
      fill: 'black',
      cornerRadius: 4,
      x: newTable.x() - 25,
      y: newTable.y() - 65,
      id: String(newTableData.id)
    })

    const text = new Konva.Text({
      text: newTable.attrs.name,
      fontSize: 14,
      fill: '#252189',
      padding: 4,
      x: newTable.x() - 25,
      y: newTable.y() - 65,
      id: String(newTableData.id)
    })

    targetRoom.add(tag)
    targetRoom.add(text)

    newTable.on('dragmove', function() {
      label.x(newTable.x() - 25)
      label.y(newTable.y() - 65)
      tag.x(newTable.x() - 25)
      tag.y(newTable.y() - 65)
      text.x(newTable.x() - 25)
      text.y(newTable.y() - 65)
    })

    newTable.on('dragend', function() {
      const tableToEdit = tables.value.find(table => String(table.id) === String(newTableData.id))
      tableToEdit.x = newTable.x()
      tableToEdit.y = newTable.y()
    })

    targetRoom.add(newTable)
    targetRoom.add(label)

    newTable.on('click tap', function(e) {
      e.cancelBubble = true
      tableEditingActivated.value = true
      selectedTableId.value = newTableData.id
      const tableToEdit = tables.value.find(table => String(table.id) === String(selectedTableId.value))
      const stage = stageRef.value.getNode().children
      const room = stage.find(room => String(room.attrs.id) === String(selectedRoomId.value))
      const table = room.find(`#${selectedTableId.value}`)[2] // Gets all the elements with the id passed and the circle element is at positon 2 in the array
      table.fill("#252189")
      room.batchDraw()
      if (tableToEdit) {
        tableNameInput.value = tableToEdit.name
        tableMinCoverInput.value = tableToEdit.minCovers
        tableMaxCoverInput.value = tableToEdit.maxCovers
        tableShapeInput.value = tableToEdit.shape
      }
    })
  } else if (newTableData.shape === 'Rect') {
    const newTable = new Konva.Rect({
      id: String(newTableData.id),
      x: newTableData.x,
      y: newTableData.y,
      width: newTableData.width,
      height: newTableData.height,
      draggable: newTableData.draggable,
      stroke: newTableData.stroke,
      strokeWidth: newTableData.strokeWidth,
      name: newTableData.name,
      cornerRadius: 4
    })

    const label = new Konva.Label({
      x: newTable.x() + 10,
      y: newTable.y() - 25,
      opacity: 0.75,
      id: String(newTableData.id)
    })

    const tag = new Konva.Tag({
      fill: 'black',
      cornerRadius: 4,
      x: newTable.x() + 10,
      y: newTable.y() - 25,
      id: String(newTableData.id)
    })

    const text = new Konva.Text({
      text: newTable.attrs.name,
      fontSize: 14,
      fill: '#252189',
      padding: 4,
      x: newTable.x() + 10,
      y: newTable.y() - 25,
      id: String(newTableData.id)
    })

    targetRoom.add(tag)
    targetRoom.add(text)

    newTable.on('dragmove', function() {
      label.x(newTable.x() + 10)
      label.y(newTable.y() - 25)
      tag.x(newTable.x() + 10)
      tag.y(newTable.y() - 25)
      text.x(newTable.x() + 10)
      text.y(newTable.y() - 25)
    })

    newTable.on('dragend', function() {
      const tableToEdit = tables.value.find(table => String(table.id) === String(newTableData.id))
      tableToEdit.x = newTable.x()
      tableToEdit.y = newTable.y()
    })

    targetRoom.add(newTable)
    targetRoom.add(label)

    newTable.on('click tap', function(e) {
      e.cancelBubble = true
      tableEditingActivated.value = true
      selectedTableId.value = newTableData.id
      const tableToEdit = tables.value.find(table => String(table.id) === String(selectedTableId.value))
      const stage = stageRef.value.getNode().children
      const room = stage.find(room => String(room.attrs.id) === String(selectedRoomId.value))
      const table = room.find(`#${selectedTableId.value}`)[2] // Gets all the elements with the id passed and the circle element is at positon 2 in the array
      table.fill("#252189")
      room.batchDraw()
      if (tableToEdit) {
        tableNameInput.value = tableToEdit.name
        tableMinCoverInput.value = tableToEdit.minCovers
        tableMaxCoverInput.value = tableToEdit.maxCovers
        tableShapeInput.value = tableToEdit.shape
      }
    })
  }
}
const handleTableCreation = (e) => {
  e.preventDefault()
  const stage = stageRef.value.getNode().children
  const targetRoom = stage.find((room) => room.attrs.id === selectedRoomId.value)
  if (!targetRoom) return
  const newTableData = {
    id: String(uuidv4()),
    x: 100,
    y: 100,
    width: 80,
    height: 80,
    draggable: true,
    stroke: '#252189',
    strokeWidth: 3,
    name: tableNameInput.value,
    minCovers: tableMinCoverInput.value,
    maxCovers: tableMaxCoverInput.value,
    shape: tableShapeInput.value,
    room_id: targetRoom.attrs.id,
    occupied: false
  }
  createTable(stage, newTableData)
  tables.value.push(newTableData)
  tableNameInput.value = ''
  tableMaxCoverInput.value = ''
  tableMinCoverInput.value = ''
  tableShapeInput.value = ''
}
function updateTable(e) {
  e.preventDefault()
  const tableToEdit = tables.value.find(table => String(table.id) === String(selectedTableId.value))
  if (!tableToEdit) return
  tableToEdit.name = tableNameInput.value
  tableToEdit.minCovers = tableMinCoverInput.value
  tableToEdit.maxCovers = tableMaxCoverInput.value
  tableToEdit.shape = tableShapeInput.value
  deleteTable(e)
  createTable(tableToEdit)
  tableNameInput.value = ''
  tableMaxCoverInput.value = ''
  tableMinCoverInput.value = ''
  tableShapeInput.value = ''
  tableEditingActivated.value = false
}
function deleteTable(e) {
  e.preventDefault()
  const stage = stageRef.value.getNode().children
  const room = stage.find(room => String(room.attrs.id) === String(selectedRoomId.value))
  const elements = room.find(`#${selectedTableId.value}`)
  elements.forEach(element => element.destroy())
  tableNameInput.value = ''
  tableMaxCoverInput.value = ''
  tableMinCoverInput.value = ''
  tableShapeInput.value = ''
  tableEditingActivated.value = false
}
function cancelTableEditing(e) {
  e.preventDefault()
  tableEditingActivated.value = false
  tableNameInput.value = ''
  tableMinCoverInput.value = ''
  tableMaxCoverInput.value = ''
  tableShapeInput.value = ''
}

// Code related to tables

// Set up code

onBeforeMount(() => {
  dataFromStore.value = JSON.parse(JSON.stringify(floor_store.getFloorSetting()))
  if (dataFromStore.value !== null) {
    rooms.value = JSON.parse(JSON.stringify(dataFromStore.value.rooms))
    tables.value = JSON.parse(JSON.stringify(dataFromStore.value.tables))
  }
})

onMounted(() => {
  if (canvasContainer.value) {
    stageConfig.width = canvasContainer.value.clientWidth
    stageConfig.height = canvasContainer.value.clientHeight
  }
  const stage = stageRef.value.getNode()
  if (stage  && dataFromStore.value !== null) {
    // Create layers
    rooms.value.forEach(room => {
      const layer = new Konva.Layer({
        ...room,
        opacity: 1,
        visible: true
      })
      stage.add(layer)
    })
    // Makes the first one in the list visible
    selectedRoomId.value = rooms.value[0].id
    stage.children.forEach((room) => {
      if (room.attrs.id !== selectedRoomId.value) {
        room.visible(false)
      } else {
        room.visible(true)
      }
    })
    // Create tables in respective rooms
    tables.value.forEach(table => {
      createTable(stage.children, table)
    })
    // stageRef.value.getNode().batchDraw()
  }
})
</script>
<style scoped>
.floorSettingContainer,
.mainFloor {
  width: 100%;
  height: 100%;
  max-height: 100vh;
}
.floorSettingContainer {
  position: relative;
}
.closingDialogOverlay {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  top: 1;
  background-color: rgba(0, 0, 0, 0.419);
}
.closingDialogBox {
  display: grid;
  grid-template-rows: 3fr 2fr;
  height: 20%;
  width: 30%;
  background-color: #fff;
  border-radius: 2rem;
  justify-content: center;
  color: #0a03c6;
  font-size: 1.6rem;
  text-align: center;
  padding-top: 1.5rem;
}
.closingDialogBox > .btnContainer {
  width:100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 0 0 2rem 2rem;
  overflow: hidden;
  align-items: center
}
.btnContainer > button {
  padding: 2rem 0;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: .1rem;
  font-size: 1.3rem;
}
.leftBtn {
  background-color: #666;
  color: #fff
}
.rightBtn {
  background-color: #252189;
  color: #fff;
}
.saveOVerlayContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: #00000030;
  color: #fff;
  font-size: 2rem;
}
.ball {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.5;
  animation: round 8s cubic-bezier(0.7, 0, 0.3, 1) infinite;
  background-color: #0a03c6;
}
.ball:nth-child(1) {
  background-color: #eb2020;
  animation-delay: 0s;
}
@keyframes round {
  0% {
    transform: translate(-50%, -50%) translate(40px, 0);
  }
  12.5% {
    transform: translate(-50%, -50%) translate(30px, 30px);
  }
  25% {
    transform: translate(-50%, -50%) translate(0, 40px);
  }
  37.5% {
    transform: translate(-50%, -50%) translate(-30px, 30px);
  }
  50% {
    transform: translate(-50%, -50%) translate(-40px, 0);
  }
  62.5% {
    transform: translate(-50%, -50%) translate(-30px, -30px);
  }
  75% {
    transform: translate(-50%, -50%) translate(0, -40px);
  }
  87.5% {
    transform: translate(-50%, -50%) translate(30px, -30px);
  }
  100% {
    transform: translate(-50%, -50%) translate(40px, 0);
  }
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
  display: flex;
}
.sideBar {
  min-height: 100%;
  width: 25%;
  border-right: 0.1rem solid rgb(207, 207, 207);
  display: flex;
  flex-direction: column;
}
.instructionsContainer {
  border-bottom: 0.1rem solid rgb(207, 207, 207);
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 1.5rem;
  height: 30%;
}
.detailLocalTitle {
  font-size: 2rem;
  font-weight: bold;
  letter-spacing: 0.2rem;
}
.instructionsTitle {
  font-size: 1.5rem;
  font-weight: bold;
}
.instructionsList {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}
.instructionText {
  font-size: 1.2rem;
  line-height: 1.5;
}
.importantPointsList {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  font-size: 1.2rem;
  line-height: 1.5;
  list-style: none;
}
.importantPointsList > :nth-child(1) {
  font-size: 1.5rem;
  color: #0a03c6;
  text-decoration: underline;
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
  overflow: scroll;
}
.btnsContainer {
  display: flex;
  align-items: center;
  justify-content: center;
}
.deleteEditBtnsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
}
.deleteEditBtnsContainer > button {
  padding: 1rem 3rem;
  font-weight: 700;
  letter-spacing: 0.15rem;
  border-radius: 2rem;
  cursor: pointer;
}
.deleteRoomBtn {
  color: red;
  background-color: #fff;
  border: 0.1rem solid red;
}
.editRoomBtn {
  color: #252189;
  background-color: #fff;
  border: 0.1rem solid #252189;
}
.cancelRoomBtn {
  color: #666;
  background-color: #fff;
  border: 0.1rem solid #666;
}
.inputContainer {
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
  width: 75%;
  flex: 1;
}
.roomsListContainer {
  display: flex;
  gap: 3rem;
  overflow-x: scroll;
  padding: 1rem;
  align-items: center;
  min-height: 4rem;
  font-size: 1.2rem;
  border-bottom: 0.1rem solid rgb(207, 207, 207);
}
.roomsListContainer > p {
  min-width: 5%;
  cursor: pointer;
}
.createTableBtn {
  color: #252189;
  cursor: pointer;
}
.selectedRoom {
  font-weight: bold;
  color: #252189;
}
.canvasContainer {
  height: 100%;
  flex: 1;
  background-color: rgb(241, 241, 241);
}
</style>
