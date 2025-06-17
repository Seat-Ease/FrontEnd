<template>
  <div class="not-found-container">
    <h1 class="oops-title">Oops!</h1>
    <p>404 - Page non trouvée</p>
    <p>Veuillez demander au restaurant de vous fournir un lien valide.</p>
  </div>
</template>
<style scoped>
.not-found-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: #1e293b;
  padding: 0 3rem;
  text-align: center;
}
.oops-title {
  font-size: 10rem;
  letter-spacing: 0.5rem;
  font-weight: bold;
  color: #4b6cb7;
}
.not-found-container p {
  font-size: 1.6rem;
  color: #fff;
}
@media (min-width: 430px) {
  .not-found-container {
    padding: 0;
  }
}
</style>
