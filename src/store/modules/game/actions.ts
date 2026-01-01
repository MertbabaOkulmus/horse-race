import type { ActionContext } from "vuex";
import type { RootState } from "@/store";
import type { GameState } from "./state";
import type { ActiveRace, Round, RoundDistance, RoundResult } from "./types";
import { generateHorsePool } from "@/services/horseFactory";
import { computeProgressDelta, TICK_MS } from "@/services/raceEngine";

let intervalHandle: number | null = null;

const ROUND_DISTANCES: RoundDistance[] = [1200, 1400, 1600, 1800, 2000, 2200];

function pickRandomUnique<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function buildSchedule(allHorseIds: number[]): Round[] {
  return ROUND_DISTANCES.map((distance, i) => {
    const picked = pickRandomUnique(allHorseIds, 10);
    return {
      index: i as 0 | 1 | 2 | 3 | 4 | 5,
      distance,
      horseIds: picked,
    };
  });
}

function clearTimer() {
  if (intervalHandle !== null) {
    clearInterval(intervalHandle);
    intervalHandle = null;
  }
}

export const actions = {
  generate({ commit }: ActionContext<GameState, RootState>) {
    clearTimer();

    const horses = generateHorsePool();
    const schedule = buildSchedule(horses.map((h) => h.id));

    commit("SET_HORSES", horses);
    commit("SET_SCHEDULE", schedule);
    commit("SET_CURRENT_ROUND_INDEX", 0);
    commit("SET_ACTIVE_RACE", null);
    commit("SET_STATUS", "generated");
    commit("RESET_RESULTS_ONLY");
  },

  async start({ state, commit, dispatch, getters }: ActionContext<GameState, RootState>) {
    if (getters.isRunning) return;
    if (state.schedule.length !== 6 || state.horses.length !== 20) return;

    commit("SET_STATUS", "running");

    for (let idx = state.currentRoundIndex; idx < 6; idx++) {
      commit("SET_CURRENT_ROUND_INDEX", idx);
      await dispatch("runRound", idx);
    }

    commit("SET_STATUS", "finished");
    commit("SET_ACTIVE_RACE", null);
  },

  runRound({ state, commit, getters }: ActionContext<GameState, RootState>, roundIndex: number) {
    clearTimer();

    const round = state.schedule[roundIndex];
    if (!round) return Promise.resolve();

    const horsesById: Map<number, any> = getters.horsesById;

    const positions: Record<number, number> = {};
    const finished: Record<number, number> = {};
    for (const id of round.horseIds) positions[id] = 0;

    const activeRace: ActiveRace = {
      roundIndex: round.index,
      distance: round.distance,
      horseIds: [...round.horseIds],
      startTs: Date.now(),
      positions,
      finished,
    };

    commit("SET_ACTIVE_RACE", activeRace);

    return new Promise<void>((resolve) => {
      intervalHandle = window.setInterval(() => {
        const now = Date.now();
        const nextPositions: Record<number, number> = { ...activeRace.positions };
        const nextFinished: Record<number, number> = { ...activeRace.finished };

        for (const horseId of activeRace.horseIds) {
          if (nextFinished[horseId] != null) continue;

          const horse = horsesById.get(horseId);
          if (!horse) continue;

          const delta = computeProgressDelta({ horse, distance: activeRace.distance });
          nextPositions[horseId] = Math.min(100, (nextPositions[horseId] ?? 0) + delta);

          if (nextPositions[horseId] >= 100) {
            nextFinished[horseId] = now - activeRace.startTs; // ms
          }
        }

        activeRace.positions = nextPositions;
        activeRace.finished = nextFinished;

        commit("UPDATE_POSITIONS", { positions: nextPositions });
        commit("MARK_FINISHED", { finished: nextFinished });

        const allFinished = activeRace.horseIds.every((id) => nextFinished[id] != null);
        if (allFinished) {
          clearTimer();

          const placements = [...activeRace.horseIds]
            .map((id) => ({ horseId: id, timeMs: nextFinished[id]! }))
            .sort((a, b) => a.timeMs - b.timeMs);

          const result: RoundResult = {
            roundIndex: activeRace.roundIndex,
            distance: activeRace.distance,
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