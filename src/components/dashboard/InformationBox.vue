<template>
  <div class="information-box">
    <p class="box-title">{{ title }}</p>
    <p class="box-stat">{{ stat }}</p>
    <p class="box-description">{{ description }}</p>
  </div>
</template>
<script>
export default {
  name: 'InformationBox',
  props: {
    title: { type: String, required: true },
    stat: { type: String, required: true },
    description: { type: String, required: true },
  },
}
</script>
<style scoped>
.information-box {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #0f172a;
  border: 0.1rem solid #1a365d;
  border-radius: 1.5rem;
  padding: 3rem;
  color: #f1f5f9;
}
.box-title,
.box-stat {
  font-size: 2rem;
}
.box-description {
  font-size: 1.2rem;
}
</style>
