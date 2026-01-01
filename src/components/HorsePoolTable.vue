<template>
  <div class="tableWrap">
    <table class="table" v-if="horses.length">
      <thead>
        <tr>
          <th>ID</th>
          <th>Color</th>
          <th>Name</th>
          <th>Condition</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="h in horses" :key="h.id">
          <td>{{ h.id }}</td>
          <td>
            <span class="dot" :style="{ background: h.color }"></span>
          </td>
          <td>{{ h.name }}</td>
          <td>{{ h.condition }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else class="empty">Generate ile 20 at oluştur.</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";
import type { Horse } from "@/store/modules/game/types";

const store = useStore();
const horses = computed<Horse[]>(() => store.state.game.horses);
</script>

<style scoped>
.tableWrap { overflow: auto; max-height: 360px; }
.table { width: 100%; border-collapse: collapse; font-size: 12px; }
th, td { border-bottom: 1px solid #eee; padding: 6px; text-align: left; }
.dot { width: 12px; height: 12px; border-radius: 50%; display: inline-block; border: 1px solid #ddd; }
.empty { font-size: 12px; color: #6b7280; padding: 8px 0; }
</style>