import { describe, it, expect } from "vitest";
import { buildSchedule } from "@/store/modules/game/helpers";

describe("schedule helpers", () => {
  it("6 adet round oluşturur ve mesafeleri doğrudur", () => {
    const ids = Array.from({ length: 20 }, (_, i) => i + 1);
    const schedule = buildSchedule(ids);

    expect(schedule).toHaveLength(6);

    const distances = schedule.map((r) => r.distance);
    expect(distances).toEqual([1200, 1400, 1600, 1800, 2000, 2200]);
  });

  it("her round 10 farklı at içerir", () => {
    const ids = Array.from({ length: 20 }, (_, i) => i + 1);
    const schedule = buildSchedule(ids);

    for (const round of schedule) {
      expect(round.horseIds).toHaveLength(10);
      expect(new Set(round.horseIds).size).toBe(10);
    }
  });

  it("round'larda sadece mevcut 20 at kullanılır", () => {
    const ids = Array.from({ length: 20 }, (_, i) => i + 1);
    const schedule = buildSchedule(ids);

    for (const round of schedule) {
      for (const id of round.horseIds) {
        expect(ids.includes(id)).toBe(true);
      }
    }
  });
});