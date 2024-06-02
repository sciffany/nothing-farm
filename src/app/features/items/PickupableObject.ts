import { PICKUPABLE_OBJECTS, PickupableObjectType } from "../objects";
import MainGame from "../scenes/mainGame";
import Item from "./Item";

export default class PickupableObject extends Item {
  public type: PickupableObjectType = PickupableObjectType.NONE;

  constructor(scene: MainGame, type: PickupableObjectType, quantity: number) {
    super(scene, PICKUPABLE_OBJECTS[type].name, quantity);
    this.type = type;
  }

  public getType() {
    return PICKUPABLE_OBJECTS[this.type].itemType;
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(
        0,
        0,
        PICKUPABLE_OBJECTS[this.type].sprite,
        PICKUPABLE_OBJECTS[this.type].frame
      )
      .setOrigin(0, 0);

    this.sprite.scale = 2;
    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {}
}
