import type { GameState } from "./state";
import type { ActiveRace, Horse, RaceStatus, Round, RoundResult } from "./types";

export const mutations = {
  SET_HORSES(s: GameState, horses: Horse[]) {
    s.horses = horses;
  },
  SET_SCHEDULE(s: GameState, schedule: Round[]) {
    s.schedule = schedule;
  },
  SET_STATUS(s: GameState, status: RaceStatus) {
    s.raceStatus = status;
  },
  SET_CURRENT_ROUND_INDEX(s: GameState, idx: number) {
    s.currentRoundIndex = idx;
  },
  SET_ACTIVE_RACE(s: GameState, race: ActiveRace | null) {
    s.activeRace = race;
  },

  UPDATE_ACTIVE_RACE(
    s: GameState,
    payload: { positions: Record<number, number>; finished: Record<number, number> }
  ) {
    if (!s.activeRace) return;
    s.activeRace = {
      ...s.activeRace,
      positions: payload.positions,
      finished: payload.finished,
    };
  },

  PUSH_RESULT(s: GameState, result: RoundResult) {
    s.results.push(result);
  },

  RESET_RESULTS_ONLY(s: GameState) {
    s.results = [];
  },

  RESET(s: GameState) {
    s.horses = [];
    s.schedule = [];
    s.currentRoundIndex = 0;
    s.raceStatus = "idle";
    s.activeRace = null;
    s.results = [];
  },
};