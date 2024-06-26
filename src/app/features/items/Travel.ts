import { Layer } from "../constants";
import { ItemType } from "../objects";
import MainGame from "../scenes/mainGame";
import Item from "./Item";

const TRAVEL_FRAME = 6;

export default class Travel extends Item {
  constructor(scene: MainGame) {
    super(scene, "Travel");
  }

  public getType() {
    return ItemType.TRAVEL;
  }

  public initialize(position: number) {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", TRAVEL_FRAME)
      .setOrigin(0, 0);

    this.sprite.depth = Layer.UI;

    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {}
}
