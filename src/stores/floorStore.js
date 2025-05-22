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
  const rooms = ref([])
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
  function getRooms() {
    return rooms.value
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
    const restaurant_id = rooms.value.find((room) => room.id === room_id).restaurant_id
    try {
      const roomRef = doc(getFirestore(app), 'rooms', room_id)
      await updateDoc(roomRef, { name: newName })
      await loadRooms(restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }
  async function deleteRoom(room_id) {
    const restaurant_id = rooms.value.find((room) => room.id === room_id).restaurant_id
    try {
      await deleteDoc(doc(getFirestore(app), 'rooms', room_id))
      await loadRooms(restaurant_id)
    } catch (error) {
      console.log(error)
    }
  }

  const tables = ref([])
  async function loadTables(room_id) {
    console.log('Before ', tables.value)
    try {
      const q = query(collection(getFirestore(app), 'tables'), where('room_id', '==', room_id))
      const snapshot = await getDocs(q)
      tables.value = snapshot.docs.map((doc) => doc.data())
      console.log('After ', tables.value)
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
      const table = await updateDoc(tableRef, updatedTable)
      console.log(table)
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
    loadRooms,
    getRooms,
    addRoom,
    editRoomName,
    deleteRoom,
    loadTables,
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
