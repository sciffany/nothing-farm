import { AnimalType, ANIMALS } from "../objects";
import MainGame from "../scenes/mainGame";
import Item from "./Item";

export default class Animal extends Item {
  public type: AnimalType = AnimalType.NONE;

  constructor(scene: MainGame, type: AnimalType, quantity: number) {
    super(scene, ANIMALS[type].name, quantity);
    this.type = type;
  }

  public getType() {
    return ANIMALS[this.type].itemType;
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(0, 0, ANIMALS[this.type].sprite, ANIMALS[this.type].frame)
      .setOrigin(0, 0);

    this.sprite.scale = 2;
    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {}
}
