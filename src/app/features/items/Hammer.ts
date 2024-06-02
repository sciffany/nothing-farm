import Item from "./Item";
import MainGame from "../scenes/mainGame";
import { Layer } from "../constants";
import { ItemType, PickupableObjectType } from "../objects";
import PickupableObject from "./PickupableObject";

const HAMMER_FRAME = 3;

export default class Hammer extends Item {
  constructor(scene: MainGame) {
    super(scene, "Hammer");
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", HAMMER_FRAME)
      .setOrigin(0, 0);

    this.sprite.depth = Layer.UI;

    this.moveToPosition(0, position);
  }

  public getType() {
    return ItemType.HAMMER;
  }

  public use(x: number, y: number) {
    const tile = (this.scene as MainGame).tileManager?.getTile(x, y);
    if (tile?.objectType === PickupableObjectType.ROCK) {
      if (this.scene.energyManager.getEnergy() < 5) return;
      this.scene.energyManager.addEnergy(-5);
      tile.breakPickupable();
      tile.changeObjectType(PickupableObjectType.NONE);
    }
  }
}
