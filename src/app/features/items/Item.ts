import { Constants } from "../constants";
import { ItemType } from "../items";
import { ObjectType } from "../objects";
import MainGame from "../scenes/mainGame";

export default abstract class Item {
  protected scene: MainGame;
  protected sprite: Phaser.GameObjects.Sprite | null = null;
  public name: string;
  public quantity: number;

  constructor(scene: MainGame, name: string, quantity: number = 1) {
    this.scene = scene;
    this.name = name;
    this.quantity = quantity;
  }

  abstract getType(): ItemType;
  abstract initialize(index: number): void;
  abstract use(x: number, y: number): void;
  public useUp() {
    this.quantity -= 1;
    this.scene.itemManager.updateItemQuantity(this);
    if (this.quantity === 0) {
      this.sprite?.destroy();
      this.scene.itemManager.deleteItem(this);
    }
  }

  public addQuantity(quantity: number) {
    this.quantity += quantity;
  }

  public moveToPosition(x: number, y: number) {
    if (!this.sprite) return;
    this.sprite.setScrollFactor(0);
    this.sprite.x = x;
    this.sprite.y = y * Constants.TILE_DISPLAY_SIZE;
  }
}
