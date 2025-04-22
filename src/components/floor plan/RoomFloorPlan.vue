<template>
  <div class="room-floor-plan">
    <div class="container-header">
      <div class="name-stat-container">
        <p class="room-name">{{ mainStore().selectedRoom.name }}</p>
        <div class="room-stats-container">
          <p class="tables-count">
            {{ floorStore().getTablesCount(mainStore().selectedRoom.id) }} tables
          </p>
          <hr />
          <p class="places-count">
            {{ floorStore().getPlacesCount(mainStore().selectedRoom.id) }} places au total
          </p>
        </div>
      </div>
      <div v-if="mainStore().tableEditingActivated" class="tables-btns-container">
        <button v-if="mainStore().selectedTable.occupied" class="free-table btn">
          Libérer la table
        </button>
        <button class="delete-table btn">Supprimer la table</button>
        <button @click="mainStore().editTableFormShowing = true" class="edit-table btn">
          Modifier la table
        </button>
      </div>
    </div>
    <div ref="canvasContainer" class="canvas-container">
      <v-stage ref="stageRef" :config="stageConfig"></v-stage>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, nextTick, reactive, watch } from 'vue'
import Konva from 'konva'
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'

const stageRef = ref(null)
const canvasContainer = ref(null)

const stageConfig = reactive({
  width: 800,
  height: 650,
  draggable: false,
})
function createTable(stage, newTableData) {
  const targetRoom = stage.find((room) => room.attrs.id === newTableData.room_id)
  if (!targetRoom) return

  if (newTableData.shape === 'Circle') {
    const radius = newTableData.width / 2
    const newTable = new Konva.Circle({
      id: String(newTableData.id),
      x: newTableData.x,
      y: newTableData.y,
      radius,
      draggable: true,
      stroke: '#1a365d',
      strokeWidth: 3,
      name: newTableData.name,
      fill: '#516d99',
    })

    const tableName = new Konva.Text({
      id: newTableData.id + '-label-name',
      text: newTable.attrs.name,
      fontSize: 12,
      fill: '#fff',
    })

    const tableCapacity = new Konva.Text({
      id: newTableData.id + '-label-capacity',
      text: newTableData.maxCovers + ' places',
      fontSize: 12,
      fill: '#fff',
    })

    tableName.offsetX(tableName.width() / 2)
    tableName.offsetY(tableName.height() / 2 + 55)
    tableName.x(newTable.x())
    tableName.y(newTable.y())

    tableCapacity.offsetX(tableCapacity.width() / 2)
    tableCapacity.offsetY(tableCapacity.height() / 2 + 35)
    tableCapacity.x(newTable.x())
    tableCapacity.y(newTable.y())

    newTable.on('dragmove', function () {
      tableName.x(newTable.x())
      tableName.y(newTable.y())
      tableCapacity.x(newTable.x())
      tableCapacity.y(newTable.y())
    })

    newTable.on('dragend', function () {
      const tableIndex = floorStore()
        .getTables()
        .findIndex((table) => String(table.id) === String(newTableData.id))
      floorStore().getTables()[tableIndex].x = newTable.x()
      floorStore().getTables()[tableIndex].y = newTable.y()
    })

    newTable.on('click tap', function () {
      mainStore().tableEditingActivated = true
      mainStore().selectedTable = newTableData
    })

    targetRoom.add(newTable)
    targetRoom.add(tableName)
    targetRoom.add(tableCapacity)
  } else if (newTableData.shape === 'Rect') {
    const newTable = new Konva.Rect({
      id: String(newTableData.id),
      x: newTableData.x,
      y: newTableData.y,
      width: newTableData.width,
      height: newTableData.height,
      draggable: true,
      stroke: '#1a365d',
      strokeWidth: 3,
      name: newTableData.name,
      cornerRadius: 4,
      fill: '#516d99',
    })

    const tableName = new Konva.Text({
      text: newTable.attrs.name,
      fontSize: 12,
      fill: '#fff',
    })

    const tableCapacity = new Konva.Text({
      text: newTableData.maxCovers + ' places',
      fontSize: 12,
      fill: '#fff',
    })

    tableName.offsetX(tableName.width() / 2)
    tableName.offsetY(tableName.height() / 2 + 55)
    tableName.x(newTable.x() + newTable.width() / 2)
    tableName.y(newTable.y() + newTable.height() / 2)

    tableCapacity.offsetX(tableCapacity.width() / 2)
    tableCapacity.offsetY(tableCapacity.height() / 2 + 35)
    tableCapacity.x(newTable.x() + newTable.width() / 2)
    tableCapacity.y(newTable.y() + newTable.height() / 2)

    newTable.on('dragmove', function () {
      tableName.x(newTable.x() + newTable.width() / 2)
      tableName.y(newTable.y() + newTable.height() / 2)
      tableCapacity.x(newTable.x() + newTable.width() / 2)
      tableCapacity.y(newTable.y() + newTable.height() / 2)
    })

    newTable.on('dragend', function () {
      const tableIndex = floorStore()
        .getTables()
        .findIndex((table) => String(table.id) === String(newTableData.id))
      floorStore().getTables()[tableIndex].x = newTable.x()
      floorStore().getTables()[tableIndex].y = newTable.y()
    })

    targetRoom.add(newTable)
    targetRoom.add(tableName)
    targetRoom.add(tableCapacity)
  }
}
function toggleRoomVisibility(selectedRoom) {
  nextTick(() => {
    const stage = stageRef.value.getNode().children
    stage.forEach((room) => {
      if (room.attrs.id !== selectedRoom.id) {
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
  if (stage && floorStore().getRooms() !== null) {
    // Create layers
    floorStore()
      .getRooms()
      .forEach((room) => {
        const layer = new Konva.Layer({
          ...room,
          opacity: 1,
          visible: true,
        })
        stage.add(layer)
      })
    // Makes the first one in the list visible
    mainStore().selectedRoom = floorStore().getRooms()[0]
    stage.children.forEach((room) => {
      if (room.attrs.id !== mainStore().selectedRoom.id) {
        room.visible(false)
      } else {
        room.visible(true)
      }
    })
    // Create tables in respective rooms
    floorStore()
      .getTables()
      .forEach((table) => {
        createTable(stage.children, table)
      })
    stageRef.value.getNode().batchDraw()
  }
})
watch(
  () => floorStore().getTables().length,
  (newLength, oldLength) => {
    if (newLength > oldLength) {
      const latestTable = floorStore().getTables()[newLength - 1]
      const stage = stageRef.value.getNode()
      createTable(stage.children, latestTable)

      // Redraw the canvas
      stage.batchDraw()
    }
  },
  { deep: true, immediate: true },
)
watch(
  () => mainStore().selectedRoom,
  (newValue) => toggleRoomVisibility(newValue),
)
watch(
  () =>
    floorStore()
      .getTables()
      .map((t) => ({ ...t })), // shallow copy
  (newTables, oldTables) => {
    const changedTable = newTables.find((newT, idx) => {
      const oldT = oldTables[idx]
      return JSON.stringify(newT) !== JSON.stringify(oldT)
    })

    if (changedTable) {
      const stage = stageRef.value.getNode()
      const layer = stage.children.find((room) => room.attrs.id === changedTable.room_id)
      if (!layer) return

      const oldShape = layer.findOne(`#${changedTable.id}`)
      if (oldShape) oldShape.destroy()

      // 💣 DESTROY existing label(s) by specific ID
      const oldNameLabel = layer.findOne(`#${changedTable.id}-label-name`)
      if (oldNameLabel) oldNameLabel.destroy()

      const oldCapacityLabel = layer.findOne(`#${changedTable.id}-label-capacity`)
      if (oldCapacityLabel) oldCapacityLabel.destroy()

      createTable(stage.children, changedTable)
      stage.batchDraw()
    }
  },
  { deep: true },
)
</script>
<style scoped>
.room-floor-plan {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex-grow: 1;
}
.container-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.room-stats-container {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.room-name {
  font-size: 2rem;
  color: #fff;
  font-weight: bold;
}
.tables-count,
.places-count {
  color: #f1f5f9;
  font-size: 1.2rem;
}
.canvas-container {
  flex-grow: 1;
  background-color: #0f172a;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  min-height: 50rem;
}
.tables-btns-container {
  display: flex;
  gap: 0.75rem;
}

.btn {
  border: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
}
.delete-table {
  background-color: red;
}
.edit-table {
  border: 0.2rem solid #1a365d;
  background-color: #1e293b;
  border-radius: 0.75rem;
}
.free-table {
  background-color: #516d99;
}
</style>
