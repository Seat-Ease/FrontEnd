<template>
  <form class="reservationForm">
    <button @click="closeForm">close</button>
  </form>
</template>
<script setup>
const emit = defineEmits(['close'])

function closeForm(e) {
  e.preventDefault()
  emit('close')
}
</script>
