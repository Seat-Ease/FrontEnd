<template>
  <div class="floorSettingContainer">
    <div class="topBar">
      <button @click="main_store.floorSettingPanelShowing = false" class="closeBtn">Fermer</button>
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
                <button class="cancelRoomBtn" @click="cancelEditing">Annuler</button>
              </div>
              <button v-else @click="createNewRoom" class="addRoomBtn">Ajouter la salle</button>
            </div>
          </form>
          <form class="tableForm">
            <p class="detailLocalTitle">Ajouter une table</p>
            <div>
              <label for="tableName">Nom/Numéro de la table</label>
              <input v-model="tableNameInput" name="tableName" type="text" class="tableName" />
            </div>
            <div>
              <label for="minCovers">Couvert minimal</label>
              <input v-model="tableMinCoverInput" name="minCovers" type="text" class="minCovers" />
            </div>
            <div>
              <label for="maxCovers">Couvert maximal</label>
              <input v-model="tableMaxCoverInput" name="maxCovers" type="text" class="maxCovers" />
            </div>
            <div>
              <label for="tableShape">Forme</label>
              <select v-model="tableShapeInput" name="tableShape">
                <option value="Rect" selected>Rectangle</option>
                <option value="Circle">Cercle</option>
              </select>
            </div>
            <button @click="handleTableCreation" class="addTableBtn">Ajouter la table</button>
          </form>
        </div>
      </div>
      <div class="mainSection">
        <div class="topSection">
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
          <p @click="roomEditingActivated = false" class="createBtn">Créer une salle</p>
          <p @click="" class="createTableBtn">Créer une table</p>
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
import Konva from 'konva'

const main_store = mainStore()
const floor_store = floorStore()

const canvasContainer = ref(null)
const stageRef = ref(null)

const stageConfig = reactive({
  width: 800,
  height: 600,
  draggable: false,
})

// Code related to rooms

const roomNameInput = ref('')
const roomEditingActivated = ref(false)
const rooms = ref([])
const selectedRoomId = ref('')

function createNewRoom(e) {
  e.preventDefault()
  if (roomNameInput.value.length === 0) return
  if (!stageRef.value) return
  const newRoomConfig = {
    id: String(Math.random()),
    name: roomNameInput.value,
  }
  rooms.value.push(newRoomConfig)
  const stage = stageRef.value.getNode()
  const layer = new Konva.Layer({ ...newRoomConfig, opacity: 1, visible: true })
  if (selectedRoomId.value !== '') {
    const stage = stageRef.value.getNode().children
    const roomToHide = stage.find((room) => room.attrs.id === String(selectedRoomId.value))
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
function cancelEditing(e) {
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

const handleTableCreation = (e) => {
  e.preventDefault()
  const stage = stageRef.value.getNode().children
  const targetRoom = stage.find((room) => room.attrs.id === selectedRoomId.value)
  if (!targetRoom) return

  let newTable

  const newTableData = {
    id: Math.random(),
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
  }

  tables.value.push(newTableData)

  newTable =
    tableShapeInput.value === 'Circle'
      ? new Konva.Circle({
          id: newTableData.id,
          x: newTableData.x,
          y: newTableData.y,
          width: newTableData.width,
          height: newTableData.height,
          draggable: newTableData.draggable,
          stroke: newTableData.stroke,
          strokeWidth: newTableData.strokeWidth,
        })
      : new Konva.Rect({
          id: newTableData.id,
          x: newTableData.x,
          y: newTableData.y,
          width: newTableData.width,
          height: newTableData.height,
          draggable: newTableData.draggable,
          stroke: newTableData.stroke,
          strokeWidth: newTableData.strokeWidth,
        })

  const label = new Konva.Label({
    x: newTable.x() + 10,
    y: newTable.y() - 25,
    opacity: 0.75,
  })

  const tag = new Konva.Tag({
    fill: 'black',
    cornerRadius: 4,
    x: tableShapeInput.value === 'Circle' ? newTable.x() - 25 : newTable.x() + 10,
    y: tableShapeInput.value === 'Circle' ? newTable.y() - 65 : newTable.y() - 25,
  })

  const text = new Konva.Text({
    text: tableNameInput.value,
    fontSize: 14,
    fill: 'white',
    padding: 4,
    x: tableShapeInput.value === 'Circle' ? newTable.x() - 25 : newTable.x() + 10,
    y: tableShapeInput.value === 'Circle' ? newTable.y() - 65 : newTable.y() - 25,
  })

  targetRoom.add(tag)
  targetRoom.add(text)

  newTable.on('dragmove', () => {
    label.x(tableShapeInput.value === 'Circle' ? newTable.x() - 25 : newTable.x() + 10)
    label.y(tableShapeInput.value === 'Circle' ? newTable.y() - 65 : newTable.y() - 25)
    tag.x(tableShapeInput.value === 'Circle' ? newTable.x() - 25 : newTable.x() + 10)
    tag.y(tableShapeInput.value === 'Circle' ? newTable.y() - 65 : newTable.y() - 25)
    text.x(tableShapeInput.value === 'Circle' ? newTable.x() - 25 : newTable.x() + 10)
    text.y(tableShapeInput.value === 'Circle' ? newTable.y() - 65 : newTable.y() - 25)
  })

  targetRoom.add(newTable)
  targetRoom.add(label)

  tableNameInput.value = ''
  tableMaxCoverInput.value = ''
  tableMinCoverInput.value = ''
}

// Code related to tables

const activateEditing = () => {
  roomEditingActivated.value = true
  const room = rooms.value.find((item) => String(item.id) === String(selectedRoomId.value))
  roomNameInput.value = room.name
}
onMounted(() => {
  if (canvasContainer.value) {
    stageConfig.width = canvasContainer.value.clientWidth
    stageConfig.height = canvasContainer.value.clientHeight
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
.tableForm > div,
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
  background-color: rgb(207, 207, 207);
}
</style>
