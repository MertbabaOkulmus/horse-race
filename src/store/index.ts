import { createStore } from "vuex";
import game from "./modules/game";

export type RootState = {
};

export default createStore<RootState>({
  modules: {
    game,
  },
});