<template>
  <div class="page">
    <header class="header">
      <h1>Horse Racing Game</h1>
      <ControlsBar />
    </header>

    <main class="grid">
      <section class="card">
        <h2>Horse Pool (20)</h2>
        <HorsePoolTable />
      </section>

      <section class="card">
        <h2>Schedule (6 Rounds)</h2>
        <ScheduleTable />
      </section>

      <section class="card">
        <h2>Results</h2>
        <ResultsPanel />
      </section>
    </main>

    <section class="card trackCard">
      <h2>Race Track</h2>
      <RaceTrack />
      <div class="liveBox">
        <LiveResultsPanel />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ControlsBar from "@/components/ControlsBar.vue";
import HorsePoolTable from "@/components/HorsePoolTable.vue";
import ScheduleTable from "@/components/ScheduleTable.vue";
import ResultsPanel from "@/components/ResultsPanel.vue";
import RaceTrack from "@/components/RaceTrack.vue";
import LiveResultsPanel from "@/components/LiveResultsPanel.vue";

</script>

<style scoped>
.page {
  padding: 16px;
  font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 12px;
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  background: white;
}

.trackCard {
  margin-top: 12px;
}

h1 {
  margin: 0;
  font-size: 18px;
}

h2 {
  margin: 0 0 8px;
  font-size: 14px;
  color: #111827;
}

.liveBox {
  margin-top: 10px;
  border-top: 1px dashed #eee;
  padding-top: 10px;
}

@media (max-width: 1100px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>