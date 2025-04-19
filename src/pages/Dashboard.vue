<template>
  <div class="dashboard-page-container">
    <div class="title-description-container">
      <h1 class="page-title">Tableau de bord</h1>
      <p class="page-description">Aperçu de votre restaurant</p>
    </div>
    <div class="informations-box-container">
      <InformationBox
        title="Réservation du jour"
        stat="0"
        description="Réservations totales pour aujourd'hui"
      />
      <InformationBox title="Clients assis" stat="0" description="Convives actuellement à table" />
      <InformationBox title="Réservation à venir" stat="0" description="Arrivées attendues" />
      <InformationBox
        title="Liste d'attente"
        stat="0"
        description="Clients en attente d'une table"
      />
      <InformationBox title="Teminées" stat="0" description="Services complétés" />
      <InformationBox
        title="Annulées/Absentes"
        stat="0"
        description="Réservations manquées et/ou annulées"
      />
    </div>
  </div>
</template>
<script setup>
import InformationBox from '@/components/dashboard/InformationBox.vue'
</script>
<style>
.dashboard-page-container {
  background-color: #1e293b;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 3rem;
}
.title-description-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.page-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #fff;
}
.page-description {
  color: #f1f5f9;
  font-size: 1.1rem;
}
.informations-box-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  flex-wrap: wrap;
  gap: 1.5rem;
}
</style>
