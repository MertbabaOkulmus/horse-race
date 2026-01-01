<template>
  <div class="results">
    <div v-if="!results.length" class="empty">Start sonrası sonuçlar buraya sırayla akar.</div>

    <div v-for="res in results" :key="res.roundIndex" class="round">
      <div class="roundTitle">
        Round {{ res.roundIndex + 1 }} • {{ res.distance }}m
      </div>

      <ol class="list">
        <li v-for="p in res.placements.slice(0, 10)" :key="p.horseId">
          <span class="mono">#{{ p.horseId }}</span>
          <span class="muted">{{ formatMs(p.timeMs) }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import type { RoundResult } from "@/store/modules/game/types";

const store = useStore();
const results = computed<RoundResult[]>(() => store.state.game.results);

function formatMs(ms: number) {
  const sec = ms / 1000;
  return `${sec.toFixed(2)}s`;
}
</script>

<style scoped>
.results { display: flex; flex-direction: column; gap: 10px; max-height: 360px; overflow: auto; }
.round { border: 1px solid #eee; border-radius: 10px; padding: 8px; }
.roundTitle { font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 6px; }
.list { margin: 0; padding-left: 18px; font-size: 12px; }
.list li { display: flex; align-items: center; justify-content: space-between; padding: 2px 0; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.muted { color: #6b7280; }
.empty { font-size: 12px; color: #6b7280; }
</style>