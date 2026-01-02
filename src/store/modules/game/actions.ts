import type { ActionContext } from "vuex";
import type { RootState } from "@/store";
import type { GameState } from "./state";
import type { ActiveRace, RoundResult } from "./types";

import { generateHorsePool } from "@/services/horseFactory";
import { computeSpeed, TICK_MS } from "@/services/raceEngine";
import { buildSchedule } from "./helpers";

let intervalHandle: number | null = null;

function clearTimer() {
  if (intervalHandle != null) {
    clearInterval(intervalHandle);
    intervalHandle = null;
  }
}

function distanceFactor(distance: number) {
  return 1200 / distance;
}

export const actions = {
  generate({ commit }: ActionContext<GameState, RootState>) {
    clearTimer();

    const horses = generateHorsePool(); // 20
    const schedule = buildSchedule(horses.map((h) => h.id)); // 6 rounds

    commit("SET_HORSES", horses);
    commit("SET_SCHEDULE", schedule);
    commit("SET_CURRENT_ROUND_INDEX", 0);
    commit("SET_ACTIVE_RACE", null);
    commit("RESET_RESULTS_ONLY");
    commit("SET_STATUS", "generated");
  },

  async start({ state, commit, dispatch }: ActionContext<GameState, RootState>) {
    if (state.raceStatus === "running") return;
    if (state.horses.length !== 20 || state.schedule.length !== 6) return;

    commit("SET_STATUS", "running");

    for (let i = state.currentRoundIndex; i < 6; i++) {
      commit("SET_CURRENT_ROUND_INDEX", i);
      await dispatch("runRound", i);
    }

    commit("SET_STATUS", "finished");
    commit("SET_ACTIVE_RACE", null);
  },

  runRound(
    { state, commit, getters }: ActionContext<GameState, RootState>,
    roundIndex: number
  ) {
    clearTimer();

    const round = state.schedule[roundIndex];
    if (!round) return Promise.resolve();

    const horsesById = getters.horsesById as Map<number, any>;

    const positions: Record<number, number> = {};
    const finished: Record<number, number> = {};

    for (const id of round.horseIds) {
      positions[id] = 0;
    }

    const race: ActiveRace = {
      roundIndex: round.index,
      distance: round.distance,
      horseIds: [...round.horseIds],
      startTs: Date.now(),
      positions,
      finished,
    };

    commit("SET_ACTIVE_RACE", race);

    return new Promise<void>((resolve) => {
      intervalHandle = window.setInterval(() => {
        const now = Date.now();

        const nextPositions: Record<number, number> = { ...race.positions };
        const nextFinished: Record<number, number> = { ...race.finished };

        const df = distanceFactor(race.distance); 
        for (const horseId of race.horseIds) {
          if (nextFinished[horseId] != null) continue;

          const horse = horsesById.get(horseId);
          if (!horse) continue;

          const speed = computeSpeed(horse.condition); 
          const inc = speed * df;                     
          nextPositions[horseId] = Math.min(100, (nextPositions[horseId] ?? 0) + inc);

          if (nextPositions[horseId] >= 100) {
            nextFinished[horseId] = now - race.startTs; 
          }
        }

        race.positions = nextPositions;
        race.finished = nextFinished;

        commit("UPDATE_ACTIVE_RACE", { positions: nextPositions, finished: nextFinished });

        const allFinished = race.horseIds.every((id) => nextFinished[id] != null);
        if (allFinished) {
          clearTimer();

          const placements = [...race.horseIds]
            .map((id) => ({ horseId: id, timeMs: nextFinished[id]! }))
            .sort((a, b) => a.timeMs - b.timeMs);

          const result: RoundResult = {
            roundIndex: race.roundIndex,
            distance: race.distance,
            placements,
          };

          commit("PUSH_RESULT", result);
          commit("SET_ACTIVE_RACE", null);
          resolve();
        }
      }, TICK_MS);
    });
  },

  reset({ commit }: ActionContext<GameState, RootState>) {
    clearTimer();
    commit("RESET");
  },
};