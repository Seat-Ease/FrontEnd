<script setup>
import Topbar from '@/components/Topbar.vue'
</script>

<template>
  <main>
    <Topbar />
    <div class="side-bar">
      <div class="reserveBtnContainer">
        <button class="reserveBtm">
          <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
      </div>
    </div>
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
html,
body {
  font-size: 62.5%;
  height: 100%;
}
main {
  display: flex;
  flex-direction: column;
}
.side-bar {
  display: flex;
  flex-direction: column;
}
</style>
