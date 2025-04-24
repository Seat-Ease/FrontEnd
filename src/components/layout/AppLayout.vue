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
    <Sidebar />
    <div class="header-page-container">
      <Header />
      <main>
        <RouterView />
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
}
</style>
