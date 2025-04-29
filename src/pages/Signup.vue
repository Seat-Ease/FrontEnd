<template>
  <div class="signup-container">
    <div class="btns-container">
      <button v-if="componentToShow !== 'GeneralInfo'" @click="goToPrevComponent" class="prev btn">
        Précedent
      </button>
      <button
        v-if="componentToShow !== 'EmailPasswordInfo'"
        @click="goToNextComponent"
        class="next btn"
      >
        Suivant
      </button>
    </div>
    <p class="redirect-login">
      Déjà client ? Connectez-vous
      <RouterLink to="/login">Ici</RouterLink>
    </p>
    <div class="form-container">
      <Transition name="slide" mode="out-in">
        <component :is="currentComponent" ref="currentComponentRef" :key="componentToShow" />
      </Transition>
    </div>
  </div>
</template>
<script setup>
import GeneralInfo from '@/components/signup/GeneralInfo.vue'
import ScheduleInfo from '@/components/signup/ScheduleInfo.vue'
import EmailPasswordInfo from '@/components/signup/EmailPasswordInfo.vue'
import { ref, computed } from 'vue'

const componentToShow = ref('GeneralInfo')
const currentComponentRef = ref(null)

const currentComponent = computed(() => {
  switch (componentToShow.value) {
    case 'GeneralInfo':
      return GeneralInfo
    case 'ScheduleInfo':
      return ScheduleInfo
    case 'EmailPasswordInfo':
      return EmailPasswordInfo
  }
})

async function validateBeforeChange() {
  if (currentComponentRef.value?.validateBeforeLeave) {
    return await currentComponentRef.value.validateBeforeLeave()
  }
  return true
}

async function goToNextComponent() {
  const canProceed = await validateBeforeChange()
  if (!canProceed) return

  if (componentToShow.value === 'GeneralInfo') componentToShow.value = 'ScheduleInfo'
  else if (componentToShow.value === 'ScheduleInfo') componentToShow.value = 'EmailPasswordInfo'
}

async function goToPrevComponent() {
  const canProceed = await validateBeforeChange()
  if (!canProceed) return

  if (componentToShow.value === 'EmailPasswordInfo') componentToShow.value = 'ScheduleInfo'
  else if (componentToShow.value === 'ScheduleInfo') componentToShow.value = 'GeneralInfo'
}
</script>
<style scoped>
.signup-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 40%;
  margin: 5rem auto;
  position: relative;
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
.form-container {
  position: relative;
  min-height: 400px;
  overflow: hidden;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s ease;
  position: absolute;
  width: 100%;
}
.slide-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
