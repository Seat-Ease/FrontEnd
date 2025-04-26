<template>
  <div class="settings-page-container">
    <div class="page-header-container">
      <div class="title-description-container">
        <h1 class="page-title">Paramètres</h1>
        <p class="page-description">Gérez les paramètres de votre restaurant</p>
      </div>
    </div>
    <div class="restaurant-information-box">
      <div class="box-header-container">
        <div class="title-description-container">
          <h3 class="box-title">Informations</h3>
          <p class="box-description">Informations générales sur votre restaurant</p>
        </div>
        <button
          @click="editRestaurantDataActivated = !editRestaurantDataActivated"
          class="edit-btn"
        >
          {{ editRestaurantDataActivated ? 'Enregistrer' : 'Modifier' }}
        </button>
      </div>
      <div class="grid-container">
        <div class="infos-container">
          <div class="info-container">
            <p class="text">Nom</p>
            <p class="text-box">{{ settingsStore().getRestaurantData().name }}</p>
          </div>
          <div class="info-container">
            <p class="text">Téléphone</p>
            <p class="text-box">{{ settingsStore().getRestaurantData().telephone }}</p>
          </div>
          <div class="info-container">
            <p class="text">Site Web</p>
            <p class="text-box">{{ settingsStore().getRestaurantData().website_link }}</p>
          </div>
        </div>
        <div class="infos-container">
          <div class="info-container">
            <p class="text">Adresse</p>
            <p class="text-box">{{ settingsStore().getRestaurantData().address }}</p>
          </div>
          <div class="info-container">
            <p class="text">Ville</p>
            <p class="text-box">{{ settingsStore().getRestaurantData().city }}</p>
          </div>
          <div class="info-container">
            <p class="text">Code postal</p>
            <p class="text-box">{{ settingsStore().getRestaurantData().postal_code }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { settingsStore } from '@/stores/settingsStore'
import { ref } from 'vue'

const editRestaurantDataActivated = ref(false)
</script>
<style scoped>
.settings-page-container {
  background-color: #1e293b;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
  padding: 3rem;
}
.page-header-container,
.box-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.restaurant-information-box {
  border: 0.1rem solid #1a365d;
  background-color: #0f172a;
  border-radius: 0.75rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.edit-btn {
  border: none;
  background-color: rgb(0, 74, 177);
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
}
.box-title {
  font-size: 1.6rem;
  color: #fef6f6;
}
.box-description,
.page-description {
  font-size: 1.1rem;
  color: #c0c0c0;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
}
.infos-container,
.info-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.info-container {
  gap: 0.75rem;
}
.text {
  font-size: 1.2rem;
  color: #fef6f6;
}
.text-box {
  font-size: 1.2rem;
  padding: 1rem;
  background-color: #1e293b;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #fef6f6;
}
</style>
