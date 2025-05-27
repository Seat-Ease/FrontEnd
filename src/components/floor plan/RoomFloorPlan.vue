<template>
  <div class="room-floor-plan">
    <div class="container-header">
      <div class="name-stat-container">
        <p class="room-name">
          {{ mainStore().selectedRoom?.name }}
        </p>
        <div class="room-stats-container">
          <p class="tables-count">
            {{ floorStore().getTablesCount(mainStore().selectedRoom?.id) }}
            tables
          </p>
          <hr />
          <p class="places-count">
            {{ floorStore().getPlacesCount(mainStore().selectedRoom?.id) }}
            places au total
          </p>
        </div>
        <div class="table-state-legend-container">
          <div>
            <font-awesome-icon class="point available" :icon="['fas', 'circle']" />
            <p class="text">Disponible</p>
          </div>
          <div>
            <font-awesome-icon class="point occupied" :icon="['fas', 'circle']" />
            <p class="text">Occupée</p>
          </div>
        </div>
      </div>
      <div v-if="mainStore().tableEditingActivated" class="tables-btns-container">
        <button
          @click="handleFreeingTable"
          v-if="mainStore().selectedTable.occupied"
          class="free-table btn"
        >
          Libérer la table
        </button>
        <button
          v-if="!mainStore().selectedTable.occupied"
          @click="
            async () => {
              try {
                loadingDeletion = true
                await destroyTable()
              } finally {
                loadingDeletion = false
                mainStore().tableEditingActivated = false
              }
            }
          "
          class="delete-table btn"
        >
          Supprimer la table
          <span v-if="loadingDeletion"><SpinnerComponent /></span>
        </button>
        <button @click="mainStore().editTableFormShowing = true" class="edit-table btn">
          Modifier la table
        </button>
      </div>
    </div>
    <div v-if="loadingTables">
      <LoadingComponent />
    </div>
    <div v-else>
      <div v-if="noTables" class="no-table-container">
        <p class="first-line">Aucune table créée</p>
        <p class="second-line">
          Commencez par créer des tables pour la salle, <br />
          comme "Table VIP", "Table centrale".
        </p>
        <button @click="mainStore().newTableFormShowing = true" class="add-table-btn">
          Créer votre première table
        </button>
      </div>
      <div v-else ref="canvasContainer" class="canvas-container">
        <v-stage ref="stageRef" :config="stageConfig"></v-stage>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeMount, nextTick, reactive, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import Konva from 'konva'
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'
import LoadingComponent from '@/components/LoadingComponent.vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const route = useRoute()

const stageRef = ref(null)
const canvasContainer = ref(null)
const noTables = computed(() => {
  return floorStore().getTables().length === 0
})

const loadingTables = ref(true)
const loadingDeletion = ref(false)

const stageConfig = reactive({
  width: 800,
  height: 650,
  draggable: false,
})
function createTable(stage, newTableData) {
  const targetRoom = stage?.find((room) => room.attrs.id === newTableData.room_id)
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
      fill: newTableData.occupied ? '#516d99' : '#0d9488',
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

    newTable.on('dragend', async function () {
      try {
        mainStore().selectedTable = newTable.attrs
        await floorStore().editTable(newTable.attrs.id, {
          x: newTable.attrs.x,
          y: newTable.attrs.y,
        })
      } catch (e) {
        console.log(e)
      }
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
      fill: newTableData.occupied ? '#516d99' : '#0d9488',
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

    newTable.on('dragend', async function () {
      try {
        mainStore().selectedTable = newTable.attrs
        await floorStore().editTable(newTable.attrs.id, {
          x: newTable.attrs.x,
          y: newTable.attrs.y,
        })
      } catch (e) {
        console.log(e)
      }
    })

    newTable.on('click tap', function () {
      mainStore().tableEditingActivated = true
      mainStore().selectedTable = newTableData
    })

    targetRoom.add(newTable)
    targetRoom.add(tableName)
    targetRoom.add(tableCapacity)
  }
}
function toggleRoomVisibility(selectedRoom) {
  mainStore().tableEditingActivated = false
  nextTick(() => {
    const stage = stageRef.value?.getNode().children
    stage?.forEach((room) => {
      if (room.attrs.id !== selectedRoom?.id) {
        room.visible(false)
      } else {
        room.visible(true)
      }
    })
    stageRef.value?.getNode().batchDraw()
  })
}
async function destroyTable() {
  const stage = stageRef.value?.getNode()
  if (!stage || !mainStore().selectedTable?.id || !mainStore().selectedTable?.room_id) return

  const layer = stage?.children.find((room) => room.attrs.id === mainStore().selectedRoom.id)
  if (!layer) return

  const shape = layer?.findOne(`#${mainStore().selectedTable.id}`)
  if (shape) shape?.destroy()

  const nameText = layer?.findOne(`#${mainStore().selectedTable.id}-label-name`)
  if (nameText) nameText?.destroy()

  const capacityText = layer?.findOne(`#${mainStore().selectedTable.id}-label-capacity`)
  if (capacityText) capacityText?.destroy()

  // 🎨 Redraw layer
  layer?.batchDraw()
  await floorStore().deleteTable(mainStore().selectedTable.id)
  mainStore().selectedTable = null
  mainStore().tableEditingActivated = false
}
function handleFreeingTable() {
  floorStore().updateTableState(mainStore().selectedTable.id)
  mainStore().tableEditingActivated = false
}
onMounted(async () => {
  loadingTables.value = true
  mainStore().tableEditingActivated = false
  mainStore().selectedRoom = floorStore().getRooms()[0]
  try {
    await floorStore().loadTables(mainStore().selectedRoom.id)
  } finally {
    loadingTables.value = false
  }

  await nextTick()

  if (floorStore().getTables().length === 0) return

  if (canvasContainer.value) {
    stageConfig.width = canvasContainer.value.clientWidth
    stageConfig.height = canvasContainer.value.clientHeight
  }

  const stage = stageRef.value?.getNode()
  if (!stage || floorStore().getRooms().length === 0) return

  const layer = new Konva.Layer({
    ...mainStore().selectedRoom,
    opacity: 1,
    visible: true,
  })

  stage.add(layer)

  floorStore()
    .getTables()
    .forEach((table) => {
      createTable(stage.children, table)
    })

  stage.batchDraw()
})
watch(
  () => mainStore().selectedRoom,
  async (newValue) => {
    loadingTables.value = true
    try {
      await floorStore().loadTables(mainStore().selectedRoom.id)
    } finally {
      loadingTables.value = false
    }

    await nextTick()

    if (floorStore().getTables().length === 0) return

    const stage = stageRef.value?.getNode()

    const roomAlreadyExist = stage?.children.find((room) => room.attrs.id === newValue.id)
    if (roomAlreadyExist) {
      toggleRoomVisibility(newValue)
      return
    }

    if (canvasContainer.value) {
      stageConfig.width = canvasContainer.value.clientWidth
      stageConfig.height = canvasContainer.value.clientHeight
    }

    if (!stage || floorStore().getRooms().length === 0) return

    const layer = new Konva.Layer({
      ...newValue,
      opacity: 1,
      visible: true,
    })

    stage.add(layer)

    floorStore()
      .getTables()
      .forEach((table) => {
        createTable(stage.children, table)
      })

    stage.batchDraw()
  },
  { immediate: true },
)
watch(
  () => floorStore().getTables(),
  async (newVal) => {
    loadingTables.value = false
    if (floorStore().getLastOperationOnTable() === 'edit') {
      const stage = stageRef.value?.getNode()
      if (!stage) return

      const layer = stage?.children.find((room) => room.attrs.id === mainStore().selectedRoom.id)
      if (!layer) return

      const shape = layer?.findOne(`#${mainStore().selectedTable.id}`)
      if (shape) shape?.destroy()

      const nameText = layer?.findOne(`#${mainStore().selectedTable.id}-label-name`)
      if (nameText) nameText?.destroy()

      const capacityText = layer?.findOne(`#${mainStore().selectedTable.id}-label-capacity`)
      if (capacityText) capacityText?.destroy()

      const table = floorStore()
        .getTables()
        .find((t) => t.id === mainStore().selectedTable.id)

      createTable(stage.children, table)
      floorStore().setLastOperationOnTableNull()
    } else if (floorStore().getLastOperationOnTable() === 'add') {
      const stage = stageRef.value?.getNode()
      console.log(stage)
      if (!stage) return

      console.log(newVal[newVal.length - 1])

      createTable(stage.children, newVal[newVal.length - 1])
      floorStore().setLastOperationOnTableNull()
    }
  },
  { immediate: true },
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
.table-state-legend-container {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.table-state-legend-container > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.text {
  font-size: 1.2rem;
  color: #fff;
}
.point {
  font-size: 1.2rem;
  font-weight: bold;
}
.available {
  color: #0d9488;
}
.occupied {
  color: #516d99;
}
.name-stat-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.no-table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  min-height: 30rem;
  padding: 2rem 0;
}
.first-line {
  font-size: 2.5rem;
  color: #fff;
}
.second-line {
  color: #f1f5f9;
  font-size: 1.2rem;
}
.add-table-btn {
  border: none;
  background-color: rgb(0, 74, 177);
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
}
</style>
