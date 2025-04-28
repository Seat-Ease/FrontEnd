<template>
  <div class="email-password-container">
    <div class="header-container">
      <div class="title-description-container">
        <p class="title">Courriel et mot de passe</p>
      </div>
    </div>
    <div class="input-container">
      <input
        v-model="credentials.email"
        id="restaurant-email"
        type="text"
        placeholder="Courriel*"
      />
    </div>
    <div class="input-container">
      <input
        v-model="credentials.password"
        id="restaurant-password"
        type="password"
        placeholder="Mot de passe*"
      />
    </div>
    <button @click="" class="submit-btn">Soumettre</button>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const credentials = ref({
  email: '',
  password: '',
})
</script>
<style scoped>
.email-password-container {
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
.input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
.submit-btn {
  border: none;
  color: #fff;
  font-size: 1.6rem;
  padding: 1rem 2rem;
  cursor: pointer;
  border-radius: 0.75rem;
  letter-spacing: 0.05rem;
  background-color: rgb(0, 74, 177);
}
</style>
