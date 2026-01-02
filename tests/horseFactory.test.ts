import { describe, it, expect } from "vitest";
import { generateHorsePool } from "@/services/horseFactory";

describe("horseFactory", () => {
  it("toplam 20 adet at oluşturur", () => {
    const horses = generateHorsePool();
    expect(horses).toHaveLength(20);
  });

  it("her atın rengi farklıdır", () => {
    const horses = generateHorsePool();
    const colors = horses.map((h) => h.color);
    expect(new Set(colors).size).toBe(20);
  });

  it("atların condition değeri 1 ile 100 arasındadır", () => {
    const horses = generateHorsePool();
    for (const h of horses) {
      expect(h.condition).toBeGreaterThanOrEqual(1);
      expect(h.condition).toBeLessThanOrEqual(100);
    }
  });

  it("at id'leri 1'den 20'ye kadardır", () => {
    const horses = generateHorsePool();
    const ids = horses.map((h) => h.id).sort((a, b) => a - b);
    expect(ids).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });
});