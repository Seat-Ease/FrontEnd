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
    console.log('before', roomsList.value)
    roomsList.value = roomsList.value.filter((room) => room.id !== room_id)
    console.log('after', roomsList.value)
  }
  const updateRoom = (roomObj) => {
    const index = roomsList.value.findIndex((item) => item.id === roomObj.id)
    if (index !== -1) {
      roomsList.value[index].name = roomObj.name
    }
  }

  return { updateRoomsList, getRoomsList, updateRoom, deleteRoom }
})
