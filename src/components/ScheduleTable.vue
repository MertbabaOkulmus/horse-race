<template>
  <div>
    <table class="table" v-if="schedule.length">
      <thead>
        <tr>
          <th>Round</th>
          <th>Distance</th>
          <th>Horses (10)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in schedule" :key="r.index" :class="{ active: r.index === currentRoundIndex }">
          <td>{{ r.index + 1 }}</td>
          <td>{{ r.distance }}m</td>
          <td class="horses">{{ r.horseIds.join(", ") }}</td>
        </tr>
      </tbody>
    </table>
    <div v-else class="empty">Generate ile 6 round schedule üret.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import type { Round } from "@/store/modules/game/types";

const store = useStore();
const schedule = computed<Round[]>(() => store.state.game.schedule);
const currentRoundIndex = computed(() => store.state.game.currentRoundIndex);
</script>

<style scoped>
.table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { border-bottom: 1px solid #eee; padding: 6px; text-align: left; vertical-align: top; }
.horses { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 11px; color: #374151; }
.active { background: #f9fafb; }
.empty { font-size: 12px; color: #6b7280; padding: 8px 0; }
</style>