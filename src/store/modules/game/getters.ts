import type { GameState } from "./state";
import type { Horse } from "./types";

export const getters = {
  horsesById: (s: GameState) => new Map<number, Horse>(s.horses.map((h) => [h.id, h])),
  currentRound: (s: GameState) => s.schedule[s.currentRoundIndex] ?? null,
  isReady: (s: GameState) => s.raceStatus === "generated",
  isRunning: (s: GameState) => s.raceStatus === "running",

  liveStandings: (s: GameState) => {
    const race = s.activeRace;
    if (!race) return [];

    const finished = race.finished ?? {};
    const positions = race.positions ?? {};

    const rows = race.horseIds.map((horseId) => {
      const timeMs = finished[horseId];
      const progress = positions[horseId] ?? 0;
      return {
        horseId,
        progress,
        isFinished: timeMs != null,
        timeMs: timeMs ?? null,
      };
    });

    rows.sort((a, b) => {
      if (a.isFinished && b.isFinished) return a.timeMs! - b.timeMs!;
      if (a.isFinished && !b.isFinished) return -1;
      if (!a.isFinished && b.isFinished) return 1;
      return b.progress - a.progress;
    });

    return rows;
  },
};