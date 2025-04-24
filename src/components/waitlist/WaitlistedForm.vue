<template>
  <div class="form-container">
    <form>
      <div class="header-container">
        <div class="title-description-container">
          <p class="title">Ajouter à la liste d'attente</p>
        </div>
        <button @click="mainStore().waitlistedFormShowing = false" class="close-btn">X</button>
      </div>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="input-container">
        <label for="nom-client">Nom du client</label>
        <input id="nom-client" type="text" placeholder="ex: Jean-Claude Wemba" />
      </div>
      <div class="input-container">
        <label for="telephone">Téléphone</label>
        <input id="telephone" type="number" placeholder="ex: 0894568902" />
      </div>
      <div class="input-container">
        <label for="party-size">Nombre de personnes</label>
        <input id="party-size" type="number" placeholder="ex: 3" />
      </div>
      <div class="input-container">
        <label for="notes">Notes</label>
        <textarea id="notes" cols="30" rows="10"></textarea>
      </div>
      <button class="submit-btn">Enregistrer</button>
    </form>
  </div>
</template>
<script setup>
import { mainStore } from '@/stores/mainStore'
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
.input-container > textarea {
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
}
.error-message {
  font-size: 1.2rem;
  color: red;
}
</style>
