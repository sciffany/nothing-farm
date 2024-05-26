"use client";

import Phaser from "phaser";
import { useEffect } from "react";
import "./page.css";
import NoSsr from "./noSsr";
import { Constants } from "../features/constants";
import MainGame from "../features/scenes/mainGame";

const config = {
  width: Constants.WIDTH,
  height: Constants.HEIGHT,
  type: Phaser.AUTO,
  scene: [MainGame],
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game-display",
  },
  pixelArt: true,
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

const isSSR = () => typeof window === "undefined";

function App() {
  useEffect(() => {
    NothingFarmSingleton.getInstance();
  }, []);

  return (
    <>
      <div
        style={{
          fontFamily: "DePixelSchmal",
          visibility: "hidden",
          position: "absolute",
        }}
      >
        .
      </div>
      {isSSR() && (
        <div className='flex justify-center items-center'>
          <div className='game-display'></div>
        </div>
      )}
    </>
  );
}

export default function () {
  return (
    <>
      <NoSsr>
        <App />
      </NoSsr>
    </>
  );
}
