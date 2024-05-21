import Tool from "./Tool";
import MainGame from "../scenes/mainGame";
import { TilePlantType, TileType } from "../managers/TileManager";

const SEED_FRAME = 5;

export default class Seed extends Tool {
  constructor(scene: Phaser.Scene) {
    super(scene, "Seed");
  }

  public initialize() {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", SEED_FRAME)
      .setOrigin(0, 0);

    this.sprite.scale = 2;

    this.moveToPosition(0, 1);
  }

  public use(x: number, y: number) {
    const tile = (this.scene as MainGame).tileManager?.getTile(x, y);
    if (tile?.getType() === TileType.TILLED) {
      tile.changePlantType(TilePlantType.SEEDED);
    }
  }
}
