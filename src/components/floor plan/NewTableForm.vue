<template>
  <div class="form-container">
    <form>
      <div class="header-container">
        <div class="title-description-container">
          <p class="title">Ajouter une nouvelle table</p>
          <p class="description">Créer une nouvelle pour {{ mainStore().selectedRoom.name }}</p>
        </div>
        <button @click="mainStore().newTableFormShowing = false" class="close-btn">X</button>
      </div>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="input-container">
        <label for="nom-table">Nom de la table</label>
        <input
          v-model="newTableData.name"
          id="nom-table"
          type="text"
          placeholder="ex: Table 1, Table VIP"
        />
      </div>
      <div class="input-container">
        <label for="min-covers">Capacité minimale</label>
        <input v-model="newTableData.minCovers" id="min-covers" type="number" placeholder="ex: 1" />
      </div>
      <div class="input-container">
        <label for="max-covers">Capacité maximale</label>
        <input v-model="newTableData.maxCovers" id="max-covers" type="number" placeholder="ex: 3" />
      </div>
      <div class="input-container">
        <label for="table-shape">Forme de la table</label>
        <select v-model="newTableData.shape" id="table-shape">
          <option value="Rect">Rectangle</option>
          <option value="Circle">Cercle</option>
        </select>
      </div>
      <button @click="submitForm" class="submit-btn">
        Enregistrer
        <span v-if="loading"><SpinnerComponent /></span>
      </button>
    </form>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
import { floorStore } from '@/stores/floorStore'
import { tableCreated } from '@/stores/events'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const errorMessage = ref('')
const loading = ref(false)

const newTableData = ref({
  id: String(uuidv4()),
  x: 600,
  y: 100,
  width: 50,
  height: 50,
  name: '',
  minCovers: 1,
  maxCovers: 1,
  shape: 'Rect',
  room_id: mainStore().selectedRoom.id,
  occupied: false,
})

async function submitForm(e) {
  e.preventDefault()
  if (newTableData.value.name.length === 0) {
    errorMessage.value = 'Nom de table obligatoire'
    return
  } else if (newTableData.value.minCovers > newTableData.value.maxCovers) {
    errorMessage.value = 'Capacité minimale ne peut pas être supérieure à la capacité maximale'
    return
  } else errorMessage.value = ''
  try {
    loading.value = true
    await floorStore().addTable({ ...newTableData.value })
    mainStore().lastTableCreatedId = newTableData.value.id
    tableCreated().triggerEvent(true)
  } catch (e) {
    tableCreated().triggerEvent(false)
    mainStore().lastTableCreatedId = ''
    console.log(e)
  } finally {
    loading.value = false
    newTableData.value.name = ''
    newTableData.value.minCovers = 1
    newTableData.value.maxCovers = 1
    newTableData.value.shape = 'Rect'
    mainStore().newTableFormShowing = false
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
.input-container > input,
.input-container > select {
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
.submit-btn {
  border: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
  background-color: rgb(0, 74, 177);
  align-self: flex-end;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.error-message {
  font-size: 1.2rem;
  color: red;
}
</style>
