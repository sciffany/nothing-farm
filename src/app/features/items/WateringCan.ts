import { Layer } from "../constants";
import { TileType } from "../managers/TileManager";
import { ItemType } from "../objects";
import MainGame from "../scenes/mainGame";
import Item from "./Item";

const WATERING_CAN_FRAME = 1;

export default class WateringCan extends Item {
  constructor(scene: MainGame, quantity: number) {
    super(scene, "Watering Can", quantity);
    this.deleteOnEmpty = false;
  }

  public getType() {
    return ItemType.WATERING_CAN;
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", WATERING_CAN_FRAME)
      .setOrigin(0, 0);

    this.sprite.depth = Layer.UI;

    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {
    this.useUp();
    const tile = this.scene.tileManager.getTile(x, y);
    if (tile?.getType() === TileType.TILLED) {
      tile?.changeType(TileType.WATERED);
    }

    if (tile?.getType() === TileType.WATER) {
      this.changeQuantity(45);
      this.scene.itemManager.updateItemQuantity(this);
      tile?.changeType(TileType.PLAIN);
    }
  }
}
