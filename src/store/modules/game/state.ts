import type { ActiveRace, Horse, RaceStatus, Round, RoundResult } from "./types";

export type GameState = {
  horses: Horse[];
  schedule: Round[];
  currentRoundIndex: number; // 0..5
  raceStatus: RaceStatus;
  activeRace: ActiveRace | null;
  results: RoundResult[];
};

export const state = (): GameState => ({
  horses: [],
  schedule: [],
  currentRoundIndex: 0,
  raceStatus: "idle",
  activeRace: null,
  results: [],
});