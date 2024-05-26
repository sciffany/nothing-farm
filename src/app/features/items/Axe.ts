import Item from "./Item";
import MainGame from "../scenes/mainGame";
import { Layer } from "../constants";
import { ItemType, PickupableObjectType } from "../objects";
import PickupableObject from "./PickupableObject";

const AXE_FRAME = 2;

export default class Axe extends Item {
  constructor(scene: MainGame) {
    super(scene, "Axe");
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", AXE_FRAME)
      .setOrigin(0, 0);

    this.sprite.depth = Layer.UI;

    this.moveToPosition(0, position);
  }

  public getType() {
    return ItemType.AXE;
  }

  public use(x: number, y: number) {
    const tile = (this.scene as MainGame).tileManager?.getTile(x, y);
    if (tile?.objectType === PickupableObjectType.LOG) {
      if (this.scene.energyManager.getEnergy() < 20) return;
      this.scene.energyManager.addEnergy(-20);
      tile.changeObjectType(PickupableObjectType.NONE);
      this.scene.itemManager.addItem(
        new PickupableObject(this.scene, PickupableObjectType.LOG, 1)
      );
    }
  }
}
