<template>
  <div class="login-container">
    <p class="title">Connectez-vous au compte de votre restaurant</p>
    <div class="input-container">
      <input v-model="credentials.email" id="restaurant-email" type="text" placeholder="Courriel" />
    </div>
    <div class="input-container">
      <input
        v-model="credentials.password"
        id="restaurant-password"
        type="password"
        placeholder="Mot de passe"
      />
    </div>
    <RouterLink to="#" class="forgot-password"> Mot de passe oublié? </RouterLink>
    <p class="redirect-signup">
      <span>Nouveau ? Enregistrez-vous </span>
      <RouterLink to="/signup">Ici</RouterLink>
    </p>
    <button @click="" class="submit-btn">Connecter</button>
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
.login-container {
  background-color: #0f172a;
  width: 30%;
  margin: 5rem auto;
  padding: 3rem;
  border: 0.1rem solid #1a365d;
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.title {
  font-size: 1.6rem;
  color: #f1f5f9;
}
.forgot-password {
  font-size: 1.2rem;
  color: #e4e4e4;
  cursor: pointer;
  transition: all 0.6s;
}
.forgot-password:hover {
  text-decoration: underline;
  color: #0d9488;
}
.redirect-signup {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #f1f5f9;
}
.redirect-signup a:link,
.redirect-signup a:visited,
.redirect-signup a:active,
.redirect-signup a:hover {
  color: #0d9488;
  font-weight: bold;
  letter-spacing: 0.1rem;
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
}
</style>
