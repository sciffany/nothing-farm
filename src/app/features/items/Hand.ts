import Item from "./Item";
import MainGame from "../scenes/mainGame";
import { TilePlantStage, TileType } from "../managers/TileManager";
import Vegetable from "./Vegetable";
import { Layer } from "../constants";
import { ObjectType } from "../objects";
import { ItemType } from "../items";

const HAND_FRAME = 4;

export default class Hand extends Item {
  constructor(scene: Phaser.Scene) {
    super(scene, "Hand");
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", HAND_FRAME)
      .setOrigin(0, 0);

    // this.sprite.scale = 2;
    this.sprite.depth = Layer.UI;

    this.moveToPosition(0, position);
  }

  public getType() {
    return ItemType.HAND;
  }
  public use(x: number, y: number) {
    const tile = (this.scene as MainGame).tileManager?.getTile(x, y);
    if (tile?.plantStage === TilePlantStage.GROWN_STAGE_4) {
      const plantType = tile?.plantType;
      tile?.changeType(TileType.PLAIN);
      tile?.changePlantStage(TilePlantStage.NONE);
      (this.scene as MainGame).itemManager?.addItem(
        new Vegetable(this.scene, plantType!, 1)
      );
    }
  }
}
