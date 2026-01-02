import type { Horse } from "@/store/modules/game/types";

const COLOR_PALETTE_20 = [
  "#E6194B", "#3CB44B", "#FFE119", "#4363D8", "#F58231",
  "#911EB4", "#46F0F0", "#F032E6", "#BCF60C", "#FABEBE",
  "#008080", "#E6BEFF", "#9A6324", "#FFFAC8", "#800000",
  "#AAFFC3", "#808000", "#FFD8B1", "#000075", "#A9A9A9",
];

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateHorsePool(): Horse[] {
  return Array.from({ length: 20 }).map((_, idx) => ({
    id: idx + 1,
    name: `Horse ${idx + 1}`,
    color: COLOR_PALETTE_20[idx],
    condition: randInt(1, 100),
  }));
}