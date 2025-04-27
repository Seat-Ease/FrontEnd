<template>
  <div class="app-container">
    <div v-if="mainStore().newRoomFormShowing">
      <NewRoomForm />
    </div>
    <div v-if="mainStore().editRoomFormShowing">
      <EditDeleteForm />
    </div>
    <div v-if="mainStore().newTableFormShowing">
      <NewTableForm />
    </div>
    <div v-if="mainStore().editTableFormShowing">
      <EditTableForm />
    </div>
    <div
      v-if="
        mainStore().freeTablesListShowingReservation || mainStore().freeTablesListShowingWaitList
      "
    >
      <FreeTablesComponent />
    </div>
    <div v-if="mainStore().waitlistedFormShowing">
      <WaitlistedForm />
    </div>
    <div v-if="mainStore().newReservationFormShowing">
      <NewReservationForm />
    </div>
    <Sidebar />
    <div class="header-page-container">
      <Header />
      <main>
        <div v-if="mainStore().calendarShowing" class="calendar-container">
          <v-date-picker @click="changeDate" color="teal" highlights="dark" v-model="date" />
        </div>
        <Transition name="slide">
          <RouterView />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
import { mainStore } from '@/stores/mainStore'
import NewRoomForm from '@/components/floor plan/NewRoomForm.vue'
import EditDeleteForm from '@/components/floor plan/EditDeleteForm.vue'
import NewTableForm from '@/components/floor plan/NewTableForm.vue'
import EditTableForm from '@/components/floor plan/EditTableForm.vue'
import FreeTablesComponent from '@/components/reservation/FreeTablesComponent.vue'
import WaitlistedForm from '@/components/waitlist/WaitlistedForm.vue'
import NewReservationForm from '@/components/reservation/NewReservationForm.vue'
import { ref } from 'vue'

const date = ref(new Date(mainStore().appDate))

function changeDate() {
  mainStore().appDate = new Date(date.value)
  mainStore().toggleCalendar()
}
</script>

<style scoped>
.app-container {
  display: flex;
  flex-grow: 1;
  width: 100%;
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.header-page-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100vh;
  overflow: hidden;
}
main {
  flex: 1;
  overflow-y: scroll;
  position: relative;
  background-color: #1e293b;
}
.calendar-container {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  color: #0f172a;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.6s ease;
  position: absolute;
  width: 100%;
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
