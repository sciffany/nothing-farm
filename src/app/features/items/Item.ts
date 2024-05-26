import { Constants, Layer } from "../constants";
import { ClickableObjectType, ItemType } from "../objects";
import MainGame from "../scenes/mainGame";

export default abstract class Item {
  protected scene: MainGame;
  protected sprite:
    | Phaser.GameObjects.Container
    | Phaser.GameObjects.Sprite
    | null = null;
  public name: string;
  public quantity: number;
  public deleteOnEmpty: boolean = true;

  constructor(scene: MainGame, name: string, quantity: number = 1) {
    this.scene = scene;
    this.name = name;
    this.quantity = quantity;
  }

  abstract getType(): ItemType;
  abstract initialize(index: number): void;
  abstract use(x: number, y: number): void;
  public useUp() {
    if (this.quantity === 0) return;
    this.quantity -= 1;
    this.scene.itemManager.updateItemQuantity(this);
    if (this.quantity === 0 && this.deleteOnEmpty) {
      this.sprite?.destroy();
      this.scene.itemManager.deleteItem(this);
    }
  }

  public addQuantity(quantity: number) {
    this.quantity += quantity;
    const qtyText = this.scene.add.text(0, 0, `+${quantity} ${this.name}`, {
      fontSize: "12px",
      color: "#b55945",
      fontFamily: "DePixelSchmal",
    });
    qtyText.depth = Layer.UI;

    this.scene.tweens.add({
      targets: qtyText,
      y: -Constants.TILE_DISPLAY_SIZE,
      ease: "Power1",
      duration: 2000,
    });

    this.scene.tweens.add({
      targets: qtyText,
      alpha: 0,
      ease: "Power1",
      duration: 2000,
      onComplete: () => {
        qtyText.destroy();
      },
    });
  }

  public changeQuantity(quantity: number) {
    this.quantity = quantity;
  }

  public moveToPosition(x: number, y: number) {
    x = Math.floor(y / Constants.NUM_TILES_Y);
    y = y % Constants.NUM_TILES_Y;

    if (!this.sprite) return;
    this.sprite.depth = Layer.UI;
    this.sprite.setScrollFactor(0);
    this.sprite.x = x * Constants.TILE_DISPLAY_SIZE;
    this.sprite.y = y * Constants.TILE_DISPLAY_SIZE;
  }
}
