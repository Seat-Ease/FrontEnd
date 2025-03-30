<script setup>
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'
import { ref, onBeforeMount, reactive, nextTick } from 'vue'
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
      draggable: false,
      stroke: newTableData.occupied ? 'red' : 'green',
      strokeWidth: newTableData.strokeWidth,
      name: newTableData.name,
      fill: newTableData.occupied ? 'red' : 'green',
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

    targetRoom.add(newTable)
    targetRoom.add(label)
  } else if (newTableData.shape === 'Rect') {
    const newTable = new Konva.Rect({
      id: String(newTableData.id),
      x: newTableData.x,
      y: newTableData.y,
      width: newTableData.width,
      height: newTableData.height,
      draggable: false,
      stroke: newTableData.occupied ? 'red' : 'green',
      strokeWidth: newTableData.strokeWidth,
      name: newTableData.name,
      cornerRadius: 4,
      fill: newTableData.occupied ? 'red' : 'green',
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

    targetRoom.add(newTable)
    targetRoom.add(label)
  }
}

function toggleRoomVisibility(e) {
  const roomId = e.target.id
  selectedRoomId.value = roomId
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

onMounted(() => {
  if (canvasContainer.value) {
    stageConfig.width = canvasContainer.value.clientWidth
    stageConfig.height = canvasContainer.value.clientHeight
  }
  const stage = stageRef.value.getNode()
  if (stage && floorData.value !== null) {
    // Create layers
    floorData.value.rooms.forEach((room) => {
      const layer = new Konva.Layer({
        ...room,
        opacity: 1,
        visible: true,
      })
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
          @click="toggleRoomVisibility"
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
  height: 100%;
  background-color: rgb(241, 241, 241);
}
</style>
