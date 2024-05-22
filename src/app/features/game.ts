import Phaser from "phaser";
import MainGame from "./scenes/mainGame";
import { Constants } from "./constants";

const config = {
  width: Constants.WIDTH,
  height: Constants.HEIGHT,
  type: Phaser.AUTO,
  scene: [MainGame],
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-display",
  },
};

export const NothingFarmSingleton = (function () {
  let instance: NothingFarm;

  function createInstance() {
    let object = new NothingFarm(config);
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

export class NothingFarm extends Phaser.Game {
  public activeScene: Phaser.Scene | null = null;

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}
