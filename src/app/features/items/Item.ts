import { Constants } from "../constants";
import MainGame from "../scenes/mainGame";

export default abstract class Item {
  protected scene: Phaser.Scene;
  protected sprite: Phaser.GameObjects.Sprite | null = null;
  public name: string;
  public quantity: number;

  constructor(scene: Phaser.Scene, name: string, quantity: number = 1) {
    this.scene = scene;
    this.name = name;
    this.quantity = quantity;
  }

  abstract initialize(index: number): void;
  abstract use(x: number, y: number): void;
  public useUp() {
    this.quantity--;
    (this.scene as MainGame).itemManager?.updateItemQuantity(this);
  }

  public moveToPosition(x: number, y: number) {
    if (!this.sprite) return;
    this.sprite.setScrollFactor(0);
    this.sprite.x = x;
    this.sprite.y = y * Constants.TILE_DISPLAY_SIZE;
  }
}
