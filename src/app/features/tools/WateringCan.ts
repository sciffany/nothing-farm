import { TileType } from "../managers/TileManager";
import MainGame from "../scenes/mainGame";
import Tool from "./Tool";

const WATERING_CAN_FRAME = 1;

export default class WateringCan extends Tool {
  constructor(scene: Phaser.Scene) {
    super(scene, "Watering Can");
  }

  public initialize() {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", WATERING_CAN_FRAME)
      .setOrigin(0, 0);

    this.sprite.scale = 2;

    this.moveToPosition(0, 3);
  }

  public use(x: number, y: number) {
    const tile = (this.scene as MainGame).tileManager?.getTile(x, y);
    if (tile?.getType() === TileType.TILLED) {
      tile?.changeType(TileType.WATERED);
    }
  }
}
