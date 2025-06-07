<template>
  <div class="form-container">
    <form>
      <div class="header-container">
        <div class="title-description-container">
          <p class="title">Modifier la salle</p>
          <p class="description">Changer le nom de la salle</p>
        </div>
        <button @click="mainStore().editRoomFormShowing = false" class="close-btn">X</button>
      </div>
      <div class="input-container">
        <label for="nom-salle">Nom de la salle</label>
        <input v-model="roomNameInput" id="nom-salle" type="text" placeholder="Nom de la salle" />
      </div>
      <div class="btns-container">
        <button @click="editName" class="submit-btn">
          Enregistrer
          <span v-if="loadingSave"><SpinnerComponent /></span>
        </button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { floorStore } from '@/stores/floorStore'
import { mainStore } from '@/stores/mainStore'
import { roomNameEdited } from '@/stores/events'
import { ref } from 'vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const loadingSave = ref(false)

const roomNameInput = ref(mainStore().selectedRoom.name)
async function editName(e) {
  e.preventDefault()
  if (roomNameInput.value.length === 0) return
  try {
    loadingSave.value = true
    await floorStore().editRoomName(mainStore().selectedRoom.id, roomNameInput.value)
    mainStore().selectedRoom = floorStore()
      .getRooms()
      .find((room) => room.id === mainStore().selectedRoom.id)
    roomNameEdited().triggerEvent(true)
  } catch (error) {
    roomNameEdited().triggerEvent(false)
    console.log(error)
  } finally {
    loadingSave.value = false
    roomNameInput.value = ''
    mainStore().editRoomFormShowing = false
  }
}
</script>
<style scoped>
.form-container {
  background-color: #00000077;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  min-height: 100%;
  min-width: 100%;
  z-index: 1000000;
}
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 3rem;
  border-radius: 0.75rem;
  border: 0.1rem solid #1a365d;
  background-color: #0f172a;
  min-width: 40%;
}
.header-container {
  display: flex;
  align-self: center;
  justify-content: space-between;
  width: 100%;
}
.title-description-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.title {
  font-size: 1.6rem;
  color: #fff;
  font-weight: 600;
}
.description {
  font-size: 1.2rem;
  color: #f1f5f9;
}
.close-btn {
  border: none;
  background-color: #0f172a;
  color: #fff;
  font-size: 1.5rem;
  align-self: flex-start;
  cursor: pointer;
  font-weight: bold;
}
.input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.input-container > label {
  font-size: 1.4rem;
  color: #fff;
}
.input-container > input {
  background-color: #0f172a;
  padding: 1rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #f1f5f9;
  font-size: 1.4rem;
}
.input-container > input:focus {
  outline: 0.2rem solid #1a365d;
}
.input-container > input::placeholder {
  color: rgb(161, 161, 161) 7;
}
.btns-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.submit-btn,
.delete-btn {
  border: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.submit-btn {
  background-color: rgb(0, 74, 177);
  justify-self: flex-end;
}
.delete-btn {
  background-color: red;
}
</style>
