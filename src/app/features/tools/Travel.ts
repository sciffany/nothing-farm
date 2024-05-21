import Tool from "./Tool";

const TRAVEL_FRAME = 6;

export default class Travel extends Tool {
  constructor(scene: Phaser.Scene) {
    super(scene, "Travel");
  }

  public initialize() {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", TRAVEL_FRAME)
      .setOrigin(0, 0);

    this.sprite.scale = 2;

    this.moveToPosition(0, 2);
  }

  public use(x: number, y: number) {}
}
