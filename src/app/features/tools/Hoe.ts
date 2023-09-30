import { Constants } from "../constants";
import Tool from "./Tool";

const HOE_FRAME = 0;

export default class Hoe extends Tool {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  public initialize() {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", HOE_FRAME)
      .setOrigin(0, 0);

    this.moveToPosition(0, 0);
  }
}
