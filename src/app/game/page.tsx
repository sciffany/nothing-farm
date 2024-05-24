"use client";

import Phaser from "phaser";
import { useEffect } from "react";
import { NothingFarmSingleton } from "../features/game";
import "./page.css";

export default function App() {
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
      <div className='flex justify-center items-center'>
        <div className='game-display'></div>
      </div>
    </>
  );
}
