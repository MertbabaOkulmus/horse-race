import type { GameState } from "./state";

export const getters = {
  horsesById: (s: GameState) => {
    const map = new Map<number, (typeof s.horses)[number]>();
    for (const h of s.horses) map.set(h.id, h);
    return map;
  },
  currentRound: (s: GameState) => s.schedule[s.currentRoundIndex] ?? null,
  isReady: (s: GameState) => s.raceStatus === "generated",
  isRunning: (s: GameState) => s.raceStatus === "running",

  liveStandings: (s: GameState) => {
    const race = s.activeRace;
    if (!race) return [];

    const finishedSet = race.finished ?? {};
    const positions = race.positions ?? {};

    const list = race.horseIds.map((horseId) => {
      const timeMs = finishedSet[horseId];
      const progress = positions[horseId] ?? 0;

      return {
        horseId,
        progress,
        isFinished: timeMs != null,
        timeMs: timeMs ?? null,
      };
    });

    list.sort((a, b) => {
      if (a.isFinished && b.isFinished) return (a.timeMs! - b.timeMs!);
      if (a.isFinished && !b.isFinished) return -1;
      if (!a.isFinished && b.isFinished) return 1;
      return b.progress - a.progress;
    });

    return list;
  },
};