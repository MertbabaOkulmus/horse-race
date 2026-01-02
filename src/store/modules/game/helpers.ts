import type { Round, RoundDistance } from "./types";

const ROUND_DISTANCES: RoundDistance[] = [1200, 1400, 1600, 1800, 2000, 2200];

export function pickRandomUnique<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

export function buildSchedule(allHorseIds: number[]): Round[] {
  return ROUND_DISTANCES.map((distance, i) => ({
    index: i as 0 | 1 | 2 | 3 | 4 | 5,
    distance,
    horseIds: pickRandomUnique(allHorseIds, 10),
  }));
}