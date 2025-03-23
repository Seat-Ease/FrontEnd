<script setup>
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'
import { ref, onBeforeMount, reactive } from 'vue'
import Konva from 'konva'
import { onMounted } from 'vue'

const main_store = mainStore()
const floor_store = floorStore()
const floorData = ref(null)

const stageRef = ref(null)
const canvasContainer = ref(null)

const selectedRoomId = ref('')

const stageConfig = reactive({
  width: 800,
  height: 600,
  draggable: false,
})

onBeforeMount(() => {
  if (floor_store.getFloorSetting() !== null) {
    floorData.value = JSON.parse(JSON.stringify(floor_store.getFloorSetting()))
  }
})

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
      name: newTableData.name,
    })

    const label = new Konva.Label({
      x: newTable.x() - 25,
      y: newTable.y() - 65,
      opacity: 0.75,
      id: String(newTableData.id),
    })

    const tag = new Konva.Tag({
      fill: 'black',
      cornerRadius: 4,
      x: newTable.x() - 25,
      y: newTable.y() - 65,
      id: String(newTableData.id),
    })

    const text = new Konva.Text({
      text: newTable.attrs.name,
      fontSize: 14,
      fill: '#252189',
      padding: 4,
      x: newTable.x() - 25,
      y: newTable.y() - 65,
      id: String(newTableData.id),
    })

    targetRoom.add(tag)
    targetRoom.add(text)

    newTable.on('dragmove', function () {
      label.x(newTable.x() - 25)
      label.y(newTable.y() - 65)
      tag.x(newTable.x() - 25)
      tag.y(newTable.y() - 65)
      text.x(newTable.x() - 25)
      text.y(newTable.y() - 65)
    })

    newTable.on('dragend', function () {
      const tableToEdit = tables.value.find((table) => String(table.id) === String(newTableData.id))
      tableToEdit.x = newTable.x()
      tableToEdit.y = newTable.y()
    })

    targetRoom.add(newTable)
    targetRoom.add(label)

    newTable.on('click tap', function (e) {
      e.cancelBubble = true
      tableEditingActivated.value = true
      selectedTableId.value = newTableData.id
      const tableToEdit = tables.value.find(
        (table) => String(table.id) === String(selectedTableId.value),
      )
      const stage = stageRef.value.getNode().children
      const room = stage.find((room) => String(room.attrs.id) === String(selectedRoomId.value))
      const table = room.find(`#${selectedTableId.value}`)[2] // Gets all the elements with the id passed and the circle element is at positon 2 in the array
      table.fill('#252189')
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
      cornerRadius: 4,
    })

    const label = new Konva.Label({
      x: newTable.x() + 10,
      y: newTable.y() - 25,
      opacity: 0.75,
      id: String(newTableData.id),
    })

    const tag = new Konva.Tag({
      fill: 'black',
      cornerRadius: 4,
      x: newTable.x() + 10,
      y: newTable.y() - 25,
      id: String(newTableData.id),
    })

    const text = new Konva.Text({
      text: newTable.attrs.name,
      fontSize: 14,
      fill: '#252189',
      padding: 4,
      x: newTable.x() + 10,
      y: newTable.y() - 25,
      id: String(newTableData.id),
    })

    targetRoom.add(tag)
    targetRoom.add(text)

    newTable.on('dragmove', function () {
      label.x(newTable.x() + 10)
      label.y(newTable.y() - 25)
      tag.x(newTable.x() + 10)
      tag.y(newTable.y() - 25)
      text.x(newTable.x() + 10)
      text.y(newTable.y() - 25)
    })

    newTable.on('dragend', function () {
      const tableToEdit = tables.value.find((table) => String(table.id) === String(newTableData.id))
      tableToEdit.x = newTable.x()
      tableToEdit.y = newTable.y()
    })

    targetRoom.add(newTable)
    targetRoom.add(label)

    newTable.on('click tap', function (e) {
      e.cancelBubble = true
      tableEditingActivated.value = true
      selectedTableId.value = newTableData.id
      const tableToEdit = tables.value.find(
        (table) => String(table.id) === String(selectedTableId.value),
      )
      const stage = stageRef.value.getNode().children
      const room = stage.find((room) => String(room.attrs.id) === String(selectedRoomId.value))
      const table = room.find(`#${selectedTableId.value}`)[2] // Gets all the elements with the id passed and the circle element is at positon 2 in the array
      table.fill('#252189')
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

onMounted(() => {
  if (canvasContainer.value) {
    stageConfig.width = canvasContainer.value.clientWidth
    stageConfig.height = canvasContainer.value.clientHeight
  }
  const stage = stageRef.value.getNode()
  if (stage && floorData.value !== null) {
    // Create layers
    floorData.value.rooms.forEach((room) => {
      const layer = new Konva.Layer({ ...room, opacity: 1, visible: true })
      stage.add(layer)
    })
    // Makes the first one in the list visible
    selectedRoomId.value = floorData.value.rooms[0].id
    stage.children.forEach((room) => {
      if (room.attrs.id !== selectedRoomId.value) {
        room.visible(false)
      } else {
        room.visible(true)
      }
    })
    // Create tables in respective rooms
    floorData.value.tables.forEach((table) => {
      createTable(stage.children, table)
    })
    stageRef.value.getNode().batchDraw()
  }
})
</script>

<template>
  <div class="floorPlanPanel">
    <div class="topBarFloorPanel">
      <div class="roomsList">
        <p
          v-if="floorData"
          @click="selectedRoomId = room.id"
          :class="{ selectedRoom: selectedRoomId === room.id }"
          v-for="room in floorData.rooms"
          :ref="room.id"
          :id="room.id"
        >
          {{ room.name }}
        </p>
      </div>
      <div class="modification">
        <p @click="main_store.floorSettingPanelShowing = true">Modifier le plan</p>
      </div>
    </div>
    <div ref="canvasContainer" class="floorContainer">
      <v-stage ref="stageRef" :config="stageConfig"></v-stage>
    </div>
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
.roomsList > p {
  cursor: pointer;
}
.roomsList {
  display: flex;
  gap: 4rem;
  padding-left: 1rem;
}
.selectedRoom {
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
  background-color: rgb(241, 241, 241);
}
</style>
