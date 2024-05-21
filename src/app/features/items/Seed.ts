import Item from "./Item";
import MainGame from "../scenes/mainGame";
import { TilePlantStage, TileType } from "../managers/TileManager";

const SEED_FRAME = 5;

export default class Seed extends Item {
  constructor(scene: Phaser.Scene, quantity: number = 1) {
    super(scene, "Seed", quantity);
  }

  public initialize() {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", SEED_FRAME)
      .setOrigin(0, 0);

    this.sprite.scale = 2;

    this.moveToPosition(0, 1);
  }

  public use(x: number, y: number) {
    this.useUp();
    const tile = (this.scene as MainGame).tileManager?.getTile(x, y);
    if (
      tile?.getType() === TileType.TILLED ||
      tile?.getType() === TileType.WATERED
    ) {
      tile.changePlantStage(TilePlantStage.SEEDED);
    }
  }
}
