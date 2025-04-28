<template>
  <div class="signup-container">
    <div class="btns-container">
      <button class="prev btn">Précedent</button>
      <button class="next btn">Suivant</button>
    </div>
    <p class="redirect-login">
      Déjà client ? Connectez-vous
      <RouterLink to="/login">Ici</RouterLink>
    </p>
    <!-- <GeneralInfo /> -->
    <ScheduleInfo />
  </div>
</template>
<script setup>
import GeneralInfo from '@/components/signup/GeneralInfo.vue'
import ScheduleInfo from '@/components/signup/ScheduleInfo.vue'
</script>
<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40%;
  margin: 5rem auto;
}
.btns-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.btn {
  border: none;
  background-color: #1e293b;
  color: #0d9488;
  text-decoration: underline;
}
.redirect-login {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.2rem;
  color: #f1f5f9;
}
.redirect-login a:link,
.redirect-login a:visited,
.redirect-login a:active,
.redirect-login a:hover {
  color: #0d9488;
  font-weight: bold;
  letter-spacing: 0.1rem;
}
</style>
