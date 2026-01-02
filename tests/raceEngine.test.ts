import { describe, it, expect } from "vitest";
import { computeSpeed } from "@/services/raceEngine";

describe("raceEngine", () => {
  it("condition yüksek olan at daha hızlıdır", () => {
    expect(computeSpeed(10)).toBeLessThan(computeSpeed(90));
  });

  it("condition 1 ile 100 arasında mantıklı hız üretir", () => {
    const s1 = computeSpeed(1);
    const s100 = computeSpeed(100);

    expect(s1).toBeCloseTo(0.408, 3);
    expect(s100).toBeCloseTo(1.2, 3);

    expect(s1).toBeGreaterThan(0.3);
    expect(s100).toBeLessThan(1.3);
  });
});