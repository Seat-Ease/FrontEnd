<template>
  <span class="simple-spinner">
    <span></span>
  </span>
</template>
<style scoped>
.simple-spinner {
  width: 3rem;
  height: 3rem;
  transform: translate(-50%, -50%);
}

.simple-spinner span {
  display: block;
  width: 1.6rem;
  height: 1.6rem;
  border: 0.3rem solid transparent;
  border-radius: 50%;
  border-right-color: rgba(255, 255, 255, 0.7);
  animation: spinner-anim 0.8s linear infinite;
}

@keyframes spinner-anim {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
