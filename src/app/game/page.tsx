"use client";

import Phaser from "phaser";
import { useEffect } from "react";
import { NothingFarmSingleton } from "../features/game";

export default function App() {
  useEffect(() => {
    NothingFarmSingleton.getInstance();
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="game-display"></div>
    </div>
  );
}
