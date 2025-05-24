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
            async () => {
              if (editRestaurantDataActivated) {
                loadingGeneral = true
                await settingsStore().editGeneralInfo({ ...restaurantData })
                loadingGeneral = false
                editRestaurantDataActivated = false
                return
              }
              editRestaurantDataActivated = true
            }
          "
          class="edit-btn"
        >
          {{ editRestaurantDataActivated ? 'Enregistrer' : 'Modifier' }}
          <span v-if="loadingGeneral"><SpinnerComponent /></span>
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
            <p v-else class="text-box">{{ settingsStore().getGeneralInfo().name }}</p>
          </div>
          <div class="info-container">
            <p class="text">Téléphone</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.phone"
              id="telephone"
              type="number"
            />
            <p v-else class="text-box">{{ settingsStore().getGeneralInfo().phone }}</p>
          </div>
          <div class="info-container">
            <p class="text">Site Web</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.website_link"
              id="website_link"
              type="text"
            />
            <p v-else class="text-box">{{ settingsStore().getGeneralInfo().website_link }}</p>
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
            <p v-else class="text-box">{{ settingsStore().getGeneralInfo().address }}</p>
          </div>
          <div class="info-container">
            <p class="text">Ville</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.city"
              id="city"
              type="text"
            />
            <p v-else class="text-box">{{ settingsStore().getGeneralInfo().city }}</p>
          </div>
          <div class="info-container">
            <p class="text">Code postal</p>
            <input
              v-if="editRestaurantDataActivated"
              v-model="restaurantData.postal_code"
              id="postal_code"
              type="text"
            />
            <p v-else class="text-box">{{ settingsStore().getGeneralInfo().postal_code }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="schedule-information-box">
      <div class="box-header-container">
        <div class="title-description-container">
          <h3 class="box-title">Horaires</h3>
          <p class="box-description">
            Définissez les jours et heures d'ouverture de votre restaurant
          </p>
        </div>
        <button
          @click="
            async () => {
              if (editScheduleDataActivated) {
                loadingSchedule = true
                await settingsStore().editScheduleData({ ...scheduleData })
                loadingSchedule = false
                editScheduleDataActivated = false
                return
              }
              editScheduleDataActivated = true
            }
          "
          class="edit-btn"
        >
          {{ editScheduleDataActivated ? 'Enregistrer' : 'Modifier' }}
          <span v-if="loadingSchedule"><SpinnerComponent /></span>
        </button>
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
    <div class="reservation-settings-box">
      <div class="box-header-container">
        <div class="title-description-container">
          <h3 class="box-title">Paramètres de réservation</h3>
          <p class="box-description">
            Configurez le fonctionnement des réservations pour votre réservation
          </p>
        </div>
        <button
          @click="
            async () => {
              if (editReservationSettingActivated) {
                loadingReservation = true
                await settingsStore().editAvailabiltiesSettings({ ...reservationSettings })
                loadingReservation = false
                editReservationSettingActivated = false
                return
              }
              editReservationSettingActivated = true
            }
          "
          class="edit-btn"
        >
          {{ editReservationSettingActivated ? 'Enregistrer' : 'Modifier' }}
          <span v-if="loadingReservation"><SpinnerComponent /></span>
        </button>
      </div>
      <div class="grid-container">
        <div class="info-container">
          <p class="text">Intervalle de réservation (minutes)</p>
          <input
            v-if="editReservationSettingActivated"
            v-model="reservationSettings.intervalle"
            id="intervalle"
            type="number"
          />
          <p v-else class="text-box">{{ settingsStore().getAvailabiltiesSettings().intervalle }}</p>
        </div>
        <div class="info-container">
          <p class="text">Nombre de tables disponibles pour chaque période de réservation</p>
          <input
            v-if="editReservationSettingActivated"
            v-model="reservationSettings.available_tables"
            id="est_srvice_duration"
            type="number"
          />
          <p v-else class="text-box">
            {{ settingsStore().getAvailabiltiesSettings().available_tables }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { settingsStore } from '@/stores/settingsStore'
import { ref, onBeforeMount } from 'vue'
import SpinnerComponent from '@/components/SpinnerComponent.vue'

const restaurantData = ref(null)
const scheduleData = ref(null)
const reservationSettings = ref(null)

const loadingGeneral = ref(false)
const loadingSchedule = ref(false)
const loadingReservation = ref(false)

const editRestaurantDataActivated = ref(false)
const editScheduleDataActivated = ref(false)
const editReservationSettingActivated = ref(false)

onBeforeMount(async () => {
  restaurantData.value = JSON.parse(JSON.stringify(settingsStore().getGeneralInfo()))
  scheduleData.value = JSON.parse(JSON.stringify(settingsStore().getScheduleData()))
  reservationSettings.value = JSON.parse(JSON.stringify(settingsStore().getAvailabiltiesSettings()))
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
  display: flex;
  align-items: center;
  gap: 1rem;
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
  gap: 3rem;
}
</style>
