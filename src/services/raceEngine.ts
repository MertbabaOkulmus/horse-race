import type { Horse, RoundDistance } from "@/store/modules/game/types";

export const TICK_MS = 60;

function baseSpeedByCondition(condition: number) {
  
  return 0.75 + (condition / 100) * 0.60;
}

function jitter() {
  return 0.90 + Math.random() * 0.20;
}

export function computeProgressDelta(params: {
  horse: Horse;
  distance: RoundDistance;
}) {
  const { horse, distance } = params;

  const distanceFactor = 1200 / distance;
  const speedFactor = baseSpeedByCondition(horse.condition) * jitter();

 
  const delta = 0.55 * distanceFactor * speedFactor;

  return delta; 
}