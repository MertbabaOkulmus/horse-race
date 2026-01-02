export const TICK_MS = 60;

export function computeSpeed(condition: number) {
  const min = 0.4;
  const max = 1.2;
  return min + (condition / 100) * (max - min);
}