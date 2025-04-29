<template>
  <div class="home-container">
    <div class="top-bar">
      <h1 class="brand-container">Seat Ease</h1>
    </div>
    <main>
      <Transition name="slide">
        <RouterView></RouterView>
      </Transition>
    </main>
  </div>
</template>
<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.top-bar {
  display: flex;
  justify-content: center;
  padding: 2.5rem 0;
  background-color: #0f172a;
  border-bottom: 0.15rem solid #1a365d;
}
.brand-container {
  font-size: 3rem;
  color: #0d9488;
  font-weight: bold;
}
main {
  background-color: #1e293b;
  flex-grow: 1;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.6s ease;
  position: absolute;
  width: 40%;
  height: 100%;
  top: 0;
  left: 0;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(100%);
}
</style>
