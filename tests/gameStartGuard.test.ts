import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createStore } from "vuex";
import gameModule from "@/store/modules/game";

describe("game store - start kuralları", () => {
  it("durum generated değilse yarış başlamaz", async () => {
    const store = createStore({
      modules: { game: gameModule },
    });

    const dispatchSpy = vi.spyOn(store, "dispatch");

    await store.dispatch("game/start");

    const runRoundCalled = dispatchSpy.mock.calls.some(
      (c) => c[0] === "game/runRound"
    );
    expect(runRoundCalled).toBe(false);
  });

  it("yarış sadece generated durumunda başlar ve biter", async () => {
    const store = createStore({
      modules: { game: gameModule },
    });

    await store.dispatch("game/generate");

    const originalDispatch = store.dispatch.bind(store);

    const dispatchSpy = vi
      .spyOn(store, "dispatch")
      .mockImplementation((type: any, payload?: any) => {
        if (type === "game/runRound") {
          return Promise.resolve();
        }
        return originalDispatch(type, payload);
      });

    await store.dispatch("game/start");

    expect(store.state.game.raceStatus).toBe("finished");

    const runRoundCalled = dispatchSpy.mock.calls.some(
      (c) => c[0] === "game/runRound"
    );
    expect(runRoundCalled).toBe(true);
  }, 10000);
});