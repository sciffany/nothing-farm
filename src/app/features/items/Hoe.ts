import Item from "./Item";
import MainGame from "../scenes/mainGame";
import { TileType } from "../managers/TileManager";
import { Layer } from "../constants";

const HOE_FRAME = 0;

export default class Hoe extends Item {
  constructor(scene: Phaser.Scene) {
    super(scene, "Hoe");
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", HOE_FRAME)
      .setOrigin(0, 0);

    // this.sprite.scale = 2;
    this.sprite.depth = Layer.UI;

    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {
    const tile = (this.scene as MainGame).tileManager?.getTile(x, y);
    if (!tile) return;
    (this.scene as MainGame).tileManager?.addTile(tile);
    if (tile?.getType() === TileType.GROUND) {
      tile?.changeType(TileType.TILLED);
    }
  }
}
