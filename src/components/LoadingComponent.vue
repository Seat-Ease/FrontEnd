<template>
  <div id="loader">
    <div class="circle-loader">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
    </div>
  </div>
</template>
<style scoped>
#loader {
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.circle {
  position: absolute;
  border: 3.5px solid transparent;
  border-radius: 50%;
  animation: rotate 3s infinite ease-in-out;
}

.circle-1 {
  width: 25rem;
  height: 25rem;
  border-top-color: #0d9488;
  border-right-color: #0d9488;
  animation-delay: -0.15s;
}

.circle-2 {
  width: 20rem;
  height: 20rem;
  border-top-color: #1a365d;
  border-right-color: #1a365d;
  animation-delay: -0.3s;
}

.circle-3 {
  width: 15rem;
  height: 15rem;
  border-top-color: #0d9488;
  border-right-color: #0d9488;
  animation-delay: -0.45s;
}

.circle-4 {
  width: 10rem;
  height: 10rem;
  border-top-color: #1a365d;
  border-right-color: #1a365d;
  animation-delay: -0.6s;
}

@keyframes rotate {
  50% {
    transform: rotate(360deg);
  }
}

.timer-text {
  position: absolute;
  font-size: 4.8rem;
  color: black;
}
</style>
