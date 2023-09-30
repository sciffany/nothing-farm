import Phaser from "phaser";
import MainGame from "./scenes/mainGame";

const config = {
  width: 384,
  height: 256,
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

class NothingFarm extends Phaser.Game {}
