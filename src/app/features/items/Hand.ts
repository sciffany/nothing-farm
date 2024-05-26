import Item from "./Item";
import MainGame from "../scenes/mainGame";
import { TilePlantStage, TileType } from "../managers/TileManager";
import Vegetable from "./Vegetable";
import { Layer } from "../constants";
import { ItemType, PickupableObjectType } from "../objects";
import PickupableObject from "./PickupableObject";

const HAND_FRAME = 4;

export default class Hand extends Item {
  constructor(scene: MainGame) {
    super(scene, "Hand");
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", HAND_FRAME)
      .setOrigin(0, 0);

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
    } else if (tile?.objectType === PickupableObjectType.YELLOW_FLOWER) {
      tile.changeObjectType(PickupableObjectType.NONE);
      this.scene.itemManager.addItem(
        new PickupableObject(this.scene, PickupableObjectType.YELLOW_FLOWER, 1)
      );
    }
  }
}
