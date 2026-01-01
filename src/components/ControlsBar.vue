<template>
  <div class="controls">
    <button class="btn" @click="onGenerate">Generate</button>
    <button class="btn primary" :disabled="!canStart" @click="onStart">
      Start
    </button>
    <button class="btn danger" @click="onReset">Reset</button>

    <span class="status">
      Status: <b>{{ status }}</b>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const status = computed(() => store.state.game.raceStatus);
const canStart = computed(() => store.getters["game/isReady"] || store.state.game.raceStatus === "finished");

const onGenerate = () => store.dispatch("game/generate");
const onStart = () => store.dispatch("game/start");
const onReset = () => store.dispatch("game/reset");
</script>

<style scoped>
.controls { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
.btn {
  border: 1px solid #d1d5db;
  background: white;
  padding: 8px 10px;
  border-radius: 8px;
  cursor: pointer;
}
.btn:disabled { opacity: 0.5; cursor: not-allowed; }
.primary { border-color: #2563eb; }
.danger { border-color: #ef4444; }
.status { margin-left: 8px; font-size: 12px; color: #374151; }
</style>