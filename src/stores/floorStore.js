import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore'
import { app } from '@/firebase'

export const floorStore = defineStore('floorStore', () => {
  const rooms = ref([
    { id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719', name: 'Salle Principale' },
    { id: '20c97f29-5cc0-466a-9b9e-e395538fa890', name: 'Terrasse' },
  ])
  function getRooms() {
    return rooms.value
  }
  async function loadRooms(restaurant_id) {
    try {
      const q = query(
        collection(getFirestore(app), 'rooms'),
        where('restaurant_id', '==', restaurant_id),
      )
      const snapshot = await getDocs(q)
      rooms.value = snapshot.docs.map((doc) => doc.data())
    } catch (error) {
      console.log(error)
    }
  }
  async function addRoom(newRoom) {
    try {
      await setDoc(doc(getFirestore(app), 'rooms', newRoom.id), newRoom)
      await loadRooms(newRoom.restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }
  async function editRoomName(room_id, newName) {
    const restaurant_id = rooms.find((room) => room.i === room_id).restaurant_id
    try {
      const roomRef = doc(getFirestore(app), 'rooms', room_id)
      await updateDoc(roomRef, { name: newName })
      await loadRooms(restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }
  async function deleteRoom(room_id) {
    const restaurant_id = rooms.find((room) => room.i === room_id).restaurant_id
    try {
      await deleteDoc(doc(getFirestore(app), 'rooms', room_id))
      await loadRooms(restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }

  // Tables
  const tables = ref([
    {
      id: 'dc701711-324a-4021-875d-ffc8adb751e5',
      x: 70,
      y: 80,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 1',
      minCovers: 2,
      maxCovers: 4,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'ec056551-41ef-4844-ab8a-7d5384ca7ae8',
      x: 45,
      y: 160,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 2',
      minCovers: 3,
      maxCovers: 7,
      shape: 'Rect',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: '1df3c65b-a6bf-47f6-a175-dde07c01b7c0',
      x: 45,
      y: 270,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 3',
      minCovers: 3,
      maxCovers: 4,
      shape: 'Rect',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'c8c6fcee-0904-47a3-a02d-e61c46220ad0',
      x: 70,
      y: 400,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 4',
      minCovers: 2,
      maxCovers: 7,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'ea081a16-7eed-4341-86ed-0c7d6e2c4e6a',
      x: 70,
      y: 510,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 5',
      minCovers: 3,
      maxCovers: 6,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'b7f7691e-2641-42a7-8e5b-1f6e7cfd4c10',
      x: 160,
      y: 60,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 6',
      minCovers: 3,
      maxCovers: 7,
      shape: 'Rect',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: '05092a1b-a095-49a1-a47f-2ecbe0e6e3ff',
      x: 160,
      y: 160,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 7',
      minCovers: 2,
      maxCovers: 5,
      shape: 'Rect',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: '71fb47df-06f0-4fbf-8e8d-5c687a93b665',
      x: 180,
      y: 300,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 8',
      minCovers: 3,
      maxCovers: 4,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: '40fc2a12-faff-428f-a5a8-ff9516546560',
      x: 180,
      y: 400,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 9',
      minCovers: 2,
      maxCovers: 7,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'abbb41b5-3817-4ba6-8e8c-941e9fe38fcd',
      x: 160,
      y: 485,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 10',
      minCovers: 2,
      maxCovers: 5,
      shape: 'Rect',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'e9c00415-4a7d-4472-9f34-7ebfe57e2537',
      x: 330,
      y: 80,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 11',
      minCovers: 2,
      maxCovers: 7,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'b39c1459-074c-4ce4-8cd6-d40159d7c692',
      x: 330,
      y: 210,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 12',
      minCovers: 2,
      maxCovers: 6,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'a753000c-3564-4b10-b9c1-db69240abb4c',
      x: 330,
      y: 340,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 13',
      minCovers: 2,
      maxCovers: 6,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'dcd10dec-9209-4f9f-b41a-2290111eaebf',
      x: 330,
      y: 470,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 14',
      minCovers: 2,
      maxCovers: 7,
      shape: 'Circle',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: '71b17652-583b-4e81-9651-9b4048a9c19f',
      x: 290,
      y: 560,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 15',
      minCovers: 2,
      maxCovers: 6,
      shape: 'Rect',
      room_id: '97a2da6c-f5bf-46d6-a97c-0a964ae9f719',
      occupied: false,
    },
    {
      id: 'cbffe662-9d13-4dae-9ce2-5a182b8fd5d4',
      x: 90,
      y: 100,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 1',
      minCovers: 3,
      maxCovers: 7,
      shape: 'Circle',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: '14e2d59a-9efb-4472-b283-3618920830df',
      x: 50,
      y: 190,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 2',
      minCovers: 2,
      maxCovers: 4,
      shape: 'Rect',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: '1524f5f4-880a-4891-ab05-f2026b33062a',
      x: 50,
      y: 320,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 3',
      minCovers: 3,
      maxCovers: 7,
      shape: 'Rect',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: '43f18015-aa00-40a2-bad0-7785ed80dcf5',
      x: 50,
      y: 450,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 4',
      minCovers: 2,
      maxCovers: 4,
      shape: 'Rect',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: 'ec47dd44-64b1-4631-b86e-7a4a68152711',
      x: 190,
      y: 60,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 5',
      minCovers: 2,
      maxCovers: 7,
      shape: 'Rect',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: '53235234-0886-45df-85cd-328567343964',
      x: 230,
      y: 230,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 6',
      minCovers: 3,
      maxCovers: 5,
      shape: 'Circle',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: 'c1ba8962-96f9-43dc-8498-c709bdc45aa0',
      x: 230,
      y: 360,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 7',
      minCovers: 2,
      maxCovers: 4,
      shape: 'Circle',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: 'a9f6a304-327b-41e5-bf27-4f2a02199c79',
      x: 230,
      y: 490,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 8',
      minCovers: 2,
      maxCovers: 4,
      shape: 'Circle',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: '1adc4dbf-efce-442d-a51a-8fe4897fc7f2',
      x: 320,
      y: 130,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 9',
      minCovers: 2,
      maxCovers: 5,
      shape: 'Rect',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: '74b1f2a8-2503-44e0-aca3-240e9b4b39ec',
      x: 360,
      y: 300,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 10',
      minCovers: 2,
      maxCovers: 4,
      shape: 'Circle',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: 'f50cb7f7-3abe-486a-a071-2bf32cf4b9fa',
      x: 360,
      y: 430,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 11',
      minCovers: 2,
      maxCovers: 7,
      shape: 'Circle',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: 'd23754df-b4af-43c1-b0f7-00ef11a06235',
      x: 450,
      y: 130,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 12',
      minCovers: 3,
      maxCovers: 4,
      shape: 'Rect',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: 'ad24b1a7-93e4-46b0-b372-9a7241914095',
      x: 450,
      y: 260,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 13',
      minCovers: 2,
      maxCovers: 6,
      shape: 'Rect',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: '9df1bdcc-78be-4d03-a9e0-d805f955507f',
      x: 490,
      y: 430,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 14',
      minCovers: 2,
      maxCovers: 6,
      shape: 'Circle',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
    {
      id: '9583cedc-404b-4b29-8e15-454ae1673fdd',
      x: 620,
      y: 300,
      width: 50,
      height: 50,
      draggable: true,
      stroke: '#252189',
      strokeWidth: 3,
      name: 'Table 15',
      minCovers: 2,
      maxCovers: 7,
      shape: 'Circle',
      room_id: '20c97f29-5cc0-466a-9b9e-e395538fa890',
      occupied: false,
    },
  ])
  async function loadTables(room_id) {
    try {
      const q = query(collection(getFirestore(app), 'tables'), where('room_id', '==', room_id))
      const snapshot = await getDocs(q)
      tables.value = snapshot.docs.map((doc) => doc.data())
    } catch (error) {
      console.log(error)
    }
  }
  function getTables() {
    return tables.value
  }
  async function addTable(newTable) {
    try {
      await setDoc(doc(getFirestore(app), 'tables', newTable.id), newTable)
      await loadTables(newTable.room_id)
    } catch (error) {
      console.log(error)
    }
  }
  async function editTable(updatedTable) {
    try {
      const tableRef = doc(getFirestore(app), 'tables', updatedTable.id)
      await updateDoc(tableRef, updatedTable)
      await loadTables(updatedTable.room_id)
    } catch (error) {
      console.log(error)
    }
  }
  async function deleteTable(table_id) {
    const table = tables.value.find((t) => t.id === table_id)
    if (!table) return
    try {
      await deleteDoc(doc(getFirestore(app), 'tables', table_id))
      await loadTables(table.room_id)
    } catch (error) {
      console.log(error)
    }
  }
  async function updateTableState(table_id) {
    const table = tables.value.find((t) => t.id === table_id)
    if (!table) return
    try {
      const newState = !table.occupied
      await updateDoc(doc(getFirestore(app), 'tables', table_id), { occupied: newState })
      await loadTables(table.room_id)
    } catch (error) {
      console.log(error)
    }
  }
  function getTablesCount(id) {
    return tables.value.filter((table) => table.room_id === id).length
  }
  function getPlacesCount(id) {
    const roomsTables = tables.value.filter((table) => table.room_id === id)
    const totalCount = roomsTables.reduce(
      (accumulator, currentValue) => accumulator + currentValue.maxCovers,
      0,
    )
    return totalCount
  }
  function getTablesPerRoom(room_id) {
    return getTables().filter((table) => table.room_id === room_id)
  }
  function getFreeTablesPerRoom(room_id) {
    return getTablesPerRoom(room_id).filter((table) => table.occupied === false)
  }
  return {
    getRooms,
    addRoom,
    editRoomName,
    deleteRoom,
    getTablesCount,
    getPlacesCount,
    getTables,
    addTable,
    updateTableState,
    editTable,
    deleteTable,
    getFreeTablesPerRoom,
  }
})
