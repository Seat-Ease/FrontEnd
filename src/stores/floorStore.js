import { ref } from 'vue'
import { defineStore } from 'pinia'

export const floorStore = defineStore('floorStore', () => {
  const roomsList = ref([])
  const updateRoomsList = (newRoom) => {
    roomsList.value.push(newRoom)
  }
  const getRoomsList = () => {
    return roomsList.value
  }
  const deleteRoom = (room_id) => {
    roomsList.value = roomsList.value.filter((room) => room.id !== Number(room_id))
  }
  const updateRoomName = (roomObj) => {
    const index = roomsList.value.findIndex((item) => String(item.id) === String(roomObj.id))
    if (index !== -1) {
      roomsList.value[index].name = roomObj.name
    }
  }

  return { updateRoomsList, getRoomsList, updateRoomName, deleteRoom }
})
