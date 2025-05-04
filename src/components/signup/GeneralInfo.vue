<template>
  <div class="general-info-container">
    <div class="header-container">
      <div class="title-description-container">
        <p class="title">Informations générales</p>
        <p class="description">Entrez les informations générales de votre restaurant.</p>
      </div>
    </div>
    <form>
      <p v-if="error" class="error">Tous les champs avec (*) sont obligatoire</p>
      <div class="input-container">
        <input v-model="generalInfo.name" id="restaurant-name" type="text" placeholder="Nom*" />
      </div>
      <div class="input-container">
        <input
          v-model="generalInfo.phone"
          id="restaurant-phone"
          type="number"
          placeholder="Téléphone*"
        />
      </div>
      <div class="input-container">
        <input
          v-model="generalInfo.address"
          id="restaurant-address"
          type="text"
          placeholder="Adresse*"
        />
      </div>
      <div class="input-container">
        <input v-model="generalInfo.city" id="restaurant-city" type="text" placeholder="Ville*" />
      </div>
      <div class="input-container">
        <input
          v-model="generalInfo.postal_code"
          id="restaurant-postal"
          type="text"
          placeholder="Code postal*"
        />
      </div>
      <div class="input-container">
        <input
          v-model="generalInfo.website_link"
          id="restaurant-website"
          type="text"
          placeholder="Site Web"
        />
      </div>
    </form>
  </div>
</template>
<script setup>
import { signup } from '@/stores/signup'
import { ref, onBeforeUnmount, onBeforeMount } from 'vue'

const error = ref(false)

function validateBeforeLeave() {
  if (
    !generalInfo.value.name ||
    !generalInfo.value.phone ||
    !generalInfo.value.address ||
    !generalInfo.value.postal_code
  ) {
    error.value = true
    return false
  } else {
    error.value = false
    return true
  }
}

defineExpose({
  validateBeforeLeave,
})

const generalInfo = ref({
  name: '',
  phone: '',
  address: '',
  city: '',
  postal_code: '',
  website_link: '',
})

onBeforeUnmount(() => {
  signup().setGeneralInfo({ ...generalInfo.value })
  generalInfo.value = {
    name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    website_link: '',
  }
})

onBeforeMount(() => (generalInfo.value = JSON.parse(JSON.stringify(signup().getGeneralInfo()))))
</script>
<style scoped>
.error {
  font-size: 1rem;
  color: red;
}
.general-info-container {
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
  width: 100%;
}
.input-container > input {
  background-color: #0f172a;
  padding: 1rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  color: #f1f5f9;
  font-size: 1.4rem;
  width: 100%;
}
.input-container > input:focus {
  outline: 0.2rem solid #1a365d;
}
.input-container > input::placeholder {
  color: rgb(161, 161, 161) 7;
}
</style>
