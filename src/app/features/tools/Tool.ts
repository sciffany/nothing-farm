import { Constants } from "../constants";

export default abstract class Tool {
  protected scene: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite | null = null;
  public name: string;

  constructor(scene: Phaser.Scene, name: string) {
    this.scene = scene;
    this.name = name;
  }

  abstract initialize(): void;
  abstract use(x: number, y: number): void;

  public moveToPosition(x: number, y: number) {
    if (!this.sprite) return;
    this.sprite.setScrollFactor(0);
    this.sprite.x = x;
    this.sprite.y = y * Constants.TILE_DISPLAY_SIZE;
  }
}
