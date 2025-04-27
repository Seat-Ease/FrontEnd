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
          @click="
            () => {
              if (editRestaurantDataActivated) {
                settingsStore().editRestaurantData(restaurantData)
                editRestaurantDataActivated = false
                return
              }
              editRestaurantDataActivated = true
            }
          "
          class="edit-btn"
        >
          {{ editRestaurantDataActivated ? 'Enregistrer' : 'Modifier' }}
        </button>
      </div>
      <div class="grid-container">
        <div class="infos-container">
          <div class="info-container">
            <p class="text">Nom</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.name"
              id="name"
              type="text"
            />
            <p v-else class="text-box">{{ settingsStore().getRestaurantData().name }}</p>
          </div>
          <div class="info-container">
            <p class="text">Téléphone</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.telephone"
              id="telephone"
              type="number"
            />
            <p v-else class="text-box">{{ settingsStore().getRestaurantData().telephone }}</p>
          </div>
          <div class="info-container">
            <p class="text">Site Web</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.website_link"
              id="website_link"
              type="text"
            />
            <p v-else class="text-box">{{ settingsStore().getRestaurantData().website_link }}</p>
          </div>
        </div>
        <div class="infos-container">
          <div class="info-container">
            <p class="text">Adresse</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.address"
              id="address"
              type="text"
            />
            <p v-else class="text-box">{{ settingsStore().getRestaurantData().address }}</p>
          </div>
          <div class="info-container">
            <p class="text">Ville</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.city"
              id="city"
              type="text"
            />
            <p v-else class="text-box">{{ settingsStore().getRestaurantData().city }}</p>
          </div>
          <div class="info-container">
            <p class="text">Code postal</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.postal_code"
              id="postal_code"
              type="text"
            />
            <p v-else class="text-box">{{ settingsStore().getRestaurantData().postal_code }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="schedule-information-box">
      <div class="box-header-container">
        <div class="title-description-container">
          <h3 class="box-title">Horaires</h3>
          <p class="box-description">Définissez les heures d'ouverture de votre restaurant</p>
        </div>
        <button @click="editScheduleDataActivated = !editScheduleDataActivated" class="edit-btn">
          {{ editScheduleDataActivated ? 'Enregistrer' : 'Modifier' }}
        </button>
      </div>
      <div class="infos-container">
        <div class="grid-container">
          <p class="text">Lundi</p>
          <div class="hours-container">
            <p class="text-box">{{ settingsStore().getScheduleData().monday.split('-')[0] }}</p>
            <p class="text-box">{{ settingsStore().getScheduleData().monday.split('-')[1] }}</p>
          </div>
        </div>
        <div class="grid-container">
          <p class="text">Mardi</p>
          <div class="hours-container">
            <p class="text-box">{{ settingsStore().getScheduleData().tuesday.split('-')[0] }}</p>
            <p class="text-box">{{ settingsStore().getScheduleData().tuesday.split('-')[1] }}</p>
          </div>
        </div>
        <div class="grid-container">
          <p class="text">Mercredi</p>
          <div class="hours-container">
            <p class="text-box">{{ settingsStore().getScheduleData().wednesday.split('-')[0] }}</p>
            <p class="text-box">{{ settingsStore().getScheduleData().wednesday.split('-')[1] }}</p>
          </div>
        </div>
        <div class="grid-container">
          <p class="text">Jeudi</p>
          <div class="hours-container">
            <p class="text-box">{{ settingsStore().getScheduleData().thursday.split('-')[0] }}</p>
            <p class="text-box">{{ settingsStore().getScheduleData().thursday.split('-')[1] }}</p>
          </div>
        </div>
        <div class="grid-container">
          <p class="text">Vendredi</p>
          <div class="hours-container">
            <p class="text-box">{{ settingsStore().getScheduleData().friday.split('-')[0] }}</p>
            <p class="text-box">{{ settingsStore().getScheduleData().friday.split('-')[1] }}</p>
          </div>
        </div>
        <div class="grid-container">
          <p class="text">Samedi</p>
          <div class="hours-container">
            <p class="text-box">{{ settingsStore().getScheduleData().saturday.split('-')[0] }}</p>
            <p class="text-box">{{ settingsStore().getScheduleData().saturday.split('-')[1] }}</p>
          </div>
        </div>
        <div class="grid-container">
          <p class="text">Dimanche</p>
          <div class="hours-container">
            <p class="text-box">{{ settingsStore().getScheduleData().sunday.split('-')[0] }}</p>
            <p class="text-box">{{ settingsStore().getScheduleData().sunday.split('-')[1] }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="reservation-settings-box">
      <div class="box-header-container">
        <div class="title-description-container">
          <h3 class="box-title">Paramètres de réservation</h3>
          <p class="box-description">
            Configurez le fonctionnement des réservations pour votre réservation
          </p>
        </div>
        <button
          @click="editReservationSettingActivated = !editReservationSettingActivated"
          class="edit-btn"
        >
          {{ editReservationSettingActivated ? 'Enregistrer' : 'Modifier' }}
        </button>
      </div>
      <div class="grid-container">
        <div class="info-container">
          <p class="text">Intervalle de réservation (minutes)</p>
          <p class="text-box">{{ settingsStore().getAvailabiltiesSettings().intervalle }}</p>
        </div>
        <div class="info-container">
          <p class="text">Durée de service estimée par client (minutes)</p>
          <p class="text-box">
            {{ settingsStore().getAvailabiltiesSettings().est_srvice_duration }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { settingsStore } from '@/stores/settingsStore'
import { ref, onBeforeMount } from 'vue'

const restaurantData = ref(null)

const editRestaurantDataActivated = ref(false)
const editScheduleDataActivated = ref(false)
const editReservationSettingActivated = ref(false)

onBeforeMount(() => {
  restaurantData.value = { ...settingsStore().getRestaurantData() }
})
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
.restaurant-information-box,
.schedule-information-box,
.reservation-settings-box {
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
.hours-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}
.info-container > input {
  background-color: #0f172a;
  padding: 1rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #f1f5f9;
  font-size: 1.4rem;
}
.info-container > input:focus {
  outline: 0.2rem solid #1a365d;
}
.info-container > input::placeholder {
  color: rgb(161, 161, 161) 7;
}
</style>
