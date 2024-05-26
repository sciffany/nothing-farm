"use client";

import { useEffect } from "react";
import { NothingFarmSingleton } from "../features/game";
import "./page.css";
import NoSsr from "./noSsr";

function App() {
  useEffect(() => {
    if (!window) return;
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

export default function () {
  return (
    <>
      <NoSsr>
        <App />
      </NoSsr>
    </>
  );
}
