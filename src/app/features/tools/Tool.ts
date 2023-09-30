import { Constants } from "../constants";

export default class Tool {
  protected scene: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public moveToPosition(x: number, y: number) {
    if (!this.sprite) return;
    this.sprite.setScrollFactor(0);
    this.sprite.x = x;
    this.sprite.y = y * Constants.TILESIZE;
  }
}
