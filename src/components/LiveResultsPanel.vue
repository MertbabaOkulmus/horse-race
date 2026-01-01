<template>
  <div class="wrap">
    <div v-if="!activeRace" class="empty">
      Yarış başlayınca canlı sıralama burada görünecek.
    </div>

    <div v-else>
      <div class="title">
        Live • Round {{ activeRace.roundIndex + 1 }} • {{ activeRace.distance }}m
      </div>

      <ol class="list">
        <li v-for="row in rows" :key="row.horseId" class="item">
          <div class="left">
            <span class="dot" :style="{ background: horse(row.horseId)?.color || '#999' }"></span>
            <span class="mono">#{{ row.horseId }}</span>
            <span class="name">{{ horse(row.horseId)?.name }}</span>
          </div>

          <div class="right">
            <template v-if="row.isFinished">
              <span class="badge done">FIN</span>
              <span class="mono muted">{{ formatMs(row.timeMs!) }}</span>
            </template>
            <template v-else>
              <span class="badge run">RUN</span>
              <span class="mono muted">{{ row.progress.toFixed(1) }}%</span>
            </template>
          </div>
        </li>
      </ol>
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
const rows = computed(() => store.getters["game/liveStandings"] as Array<{
  horseId: number;
  progress: number;
  isFinished: boolean;
  timeMs: number | null;
}>);

function horse(id: number) {
  return horsesById.value.get(id);
}

function formatMs(ms: number) {
  return `${(ms / 1000).toFixed(2)}s`;
}
</script>

<style scoped>
.wrap { }
.title { font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 8px; }
.empty { font-size: 12px; color: #6b7280; }

.list { margin: 0; padding-left: 18px; font-size: 12px; }
.item { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 4px 0; }
.left { display: flex; align-items: center; gap: 8px; min-width: 0; }
.right { display: flex; align-items: center; gap: 8px; }

.dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; border: 1px solid #ddd; }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.name { color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 180px; }
.muted { color: #6b7280; }

.badge {
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 999px;
  border: 1px solid #e5e7eb;
}
.done { border-color: #10b98155; }
.run { border-color: #2563eb55; }
</style>