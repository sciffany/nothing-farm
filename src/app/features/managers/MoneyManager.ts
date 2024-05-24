import { Constants, Layer } from "../constants";
import MainGame from "../scenes/mainGame";

export default class MoneyManager {
  private scene: MainGame;
  private money: number = 500;

  private moneyText: Phaser.GameObjects.Text | null = null;

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize() {
    this.drawDayCounter();
  }

  public addMoney(amount: number) {
    this.money += amount;
    this.moneyText?.setText(`$ ${this.money}`);
  }

  private drawDayCounter() {
    const marker = this.scene.add
      .image(
        Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE,
        Constants.TILE_DISPLAY_SIZE,
        "marker",
        0
      )
      .setOrigin(0, 0);
    marker.setScrollFactor(0);
    marker.depth = Layer.UI;

    this.moneyText = this.scene.add.text(
      Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
      (Constants.TILE_DISPLAY_SIZE * 3) / 2,
      `$ ${this.money}`,
      {
        fontSize: "12px",
        fontFamily: "DePixelSchmal",
        color: "#000000",
      }
    );
    this.moneyText.depth = Layer.UI;
    this.moneyText.setOrigin(0.5, 0.5);
    this.moneyText.setScrollFactor(0);
  }
}
