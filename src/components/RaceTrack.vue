<template>
  <div class="track">
    <div v-if="!activeRace" class="empty">
      Generate → Start ile aktif round burada koşar.
    </div>

    <div v-else class="lanes">
      <div class="meta">
        Round {{ activeRace.roundIndex + 1 }} • {{ activeRace.distance }}m
      </div>

      <div class="lane" v-for="horse in laneHorses" :key="horse.id">
        <div class="laneLabel">
          <span class="dot" :style="{ background: horse.color }"></span>
          <span class="name">#{{ horse.id }} {{ horse.name }}</span>
          <span class="cond">cond: {{ horse.condition }}</span>
        </div>

        <div class="laneTrack">
          <!-- dolan bar -->
          <div class="fill" :style="{ width: progressWidth(horse.id), background: horse.color }"></div>

          <!-- koşan at/dot -->
          <div class="marker" :style="{ left: progressLeft(horse.id), background: horse.color }"
            :title="progressValue(horse.id) + '%'"></div>

          <div class="finish"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import type { ActiveRace, Horse } from "@/store/modules/game/types";

const store = useStore();

const activeRace = computed<ActiveRace | null>(() => store.state.game.activeRace);

const horsesById = computed(() => store.getters["game/horsesById"] as Map<number, Horse>);

const laneHorses = computed(() => {
  if (!activeRace.value) return [];
  return activeRace.value.horseIds
    .map((id) => horsesById.value.get(id))
    .filter(Boolean) as Horse[];
});

function progressValue(horseId: number) {
  const race = activeRace.value;
  if (!race) return 0;
  return Math.max(0, Math.min(100, race.positions[horseId] ?? 0));
}

function progressLeft(horseId: number) {
  // marker genişliğini de düşünerek sonlara taşmasın diye küçük -2%
  const p = progressValue(horseId);
  return `calc(${p}% - 6px)`;
}

function progressWidth(horseId: number) {
  const p = progressValue(horseId);
  return `${p}%`;
}
</script>

<style scoped>
.track {
  padding: 6px 0;
}

.empty {
  font-size: 12px;
  color: #6b7280;
}

.meta {
  font-size: 12px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
}

.lanes {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.lane {
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 8px;
}

.laneLabel {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  margin-bottom: 6px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid #ddd;
}

.name {
  font-weight: 600;
  color: #111827;
}

.cond {
  margin-left: auto;
  color: #6b7280;
  font-size: 11px;
}

.laneTrack {
  position: relative;
  height: 16px;
  border-radius: 999px;
  background: #f9fafb;
  border: 1px solid #eee;
  overflow: hidden;
}

.fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  opacity: 0.25;
  width: 0%;
  transition: width 60ms linear;
  will-change: width;
}

.marker {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.15);
  transition: left 60ms linear;
  will-change: left;
}

.finish {
  position: absolute;
  right: 4px;
  top: 2px;
  bottom: 2px;
  width: 2px;
  background: #111827;
  opacity: 0.25;
}
</style>