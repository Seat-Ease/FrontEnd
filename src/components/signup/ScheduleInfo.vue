<template>
  <div class="schedule-info-container">
    <div class="header-container">
      <div class="title-description-container">
        <p class="title">Horaire</p>
      </div>
    </div>
    <form>
      <p>Cochez les jours que vous êtes ouvert</p>
      <div class="inputs-container">
        <div class="checkbox-container">
          <input v-model="scheduleData.monday" id="monday-check" type="checkbox" />
          <label for="monday-check">Lundi</label>
        </div>
        <div class="checkbox-container">
          <input v-model="scheduleData.tuesday" id="tuesday-check" type="checkbox" />
          <label for="tuesday-check">Mardi</label>
        </div>
        <div class="checkbox-container">
          <input v-model="scheduleData.wednesday" id="wednesday-check" type="checkbox" />
          <label for="wednesday-check">Mercredi</label>
        </div>
        <div class="checkbox-container">
          <input v-model="scheduleData.thursday" id="thursday-check" type="checkbox" />
          <label for="thursday-check">Jeudi</label>
        </div>
        <div class="checkbox-container">
          <input v-model="scheduleData.friday" id="friday-check" type="checkbox" />
          <label for="friday-check">Vendredi</label>
        </div>
        <div class="checkbox-container">
          <input v-model="scheduleData.saturday" id="saturday-check" type="checkbox" />
          <label for="saturday-check">Samedi</label>
        </div>
        <div class="checkbox-container">
          <input v-model="scheduleData.sunday" id="sunday-check" type="checkbox" />
          <label for="sunday-check">Dimanche</label>
        </div>
      </div>
      <p>Entrez les heures d'ouverture</p>
      <div class="openin-closing-container">
        <div class="input-container">
          <label for="opening">Heure d'ouverture</label>
          <input v-model="scheduleData.opening_time" id="opening" type="time" />
        </div>
        <div class="input-container">
          <label for="closing">Heure de fermeture</label>
          <input v-model="scheduleData.closing_time" id="closing" type="time" />
        </div>
      </div>
    </form>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const scheduleData = ref({
  monday: false,
  tuesday: true,
  wednesday: true,
  thursday: true,
  friday: true,
  saturday: true,
  sunday: false,
  opening_time: '11:00',
  closing_time: '23:00',
})
</script>
<style scoped>
.schedule-info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #0f172a;
  padding: 3rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
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
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  font-size: 1.2rem;
  color: #f1f5f9;
}
.inputs-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}
.checkbox-container {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 1.2rem;
  color: #f1f5f9;
}
input[type='checkbox'] {
  accent-color: #0d9488;
}
.input-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.input-container input {
  width: 50%;
}
.openin-closing-container {
  display: flex;
  align-content: center;
  justify-content: space-between;
}
</style>
