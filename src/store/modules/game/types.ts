export type RaceStatus = "idle" | "generated" | "running" | "finished";

export type Horse = {
  id: number;
  name: string;
  color: string;
  condition: number; // 1..100
};

export type RoundDistance = 1200 | 1400 | 1600 | 1800 | 2000 | 2200;

export type Round = {
  index: 0 | 1 | 2 | 3 | 4 | 5;
  distance: RoundDistance;
  horseIds: number[];
};

export type ActiveRace = {
  roundIndex: number;
  distance: RoundDistance;
  horseIds: number[];
  startTs: number;

  positions: Record<number, number>;
  finished: Record<number, number>; 
};

export type RoundResult = {
  roundIndex: number;
  distance: RoundDistance;
  placements: Array<{
    horseId: number;
    timeMs: number;
  }>;
};