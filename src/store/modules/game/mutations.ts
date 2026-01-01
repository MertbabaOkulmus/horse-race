import type { GameState } from "./state";
import type { ActiveRace, Horse, Round, RoundResult, RaceStatus } from "./types";

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
  UPDATE_POSITIONS(s: GameState, payload: { positions: Record<number, number> }) {
    if (!s.activeRace) return;
    s.activeRace = { ...s.activeRace, positions: payload.positions };
  },
  MARK_FINISHED(s: GameState, payload: { finished: Record<number, number> }) {
    if (!s.activeRace) return;
    s.activeRace = { ...s.activeRace, finished: payload.finished };
  },
  PUSH_RESULT(s: GameState, result: RoundResult) {
    s.results.push(result);
  },
  RESET(s: GameState) {
    s.horses = [];
    s.schedule = [];
    s.currentRoundIndex = 0;
    s.raceStatus = "idle";
    s.activeRace = null;
    s.results = [];
  },
  RESET_RESULTS_ONLY(s: GameState) {
    s.results = [];
  },
};
