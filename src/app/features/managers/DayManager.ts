import { Constants } from "../constants";
import MainGame from "../scenes/mainGame";

export default class DayManager {
  private scene: Phaser.Scene;
  private day: number = 1;

  private dayText: Phaser.GameObjects.Text | null = null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public initialize() {
    this.drawDayCounter();
    this.drawNextButton();
  }

  private drawDayCounter() {
    const marker = this.scene.add
      .image(Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE, 0, "marker", 0)
      .setOrigin(0, 0);
    marker.setScrollFactor(0);
    marker.scale = 2;

    this.dayText = this.scene.add.text(
      Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
      Constants.TILE_DISPLAY_SIZE / 2,
      `Day ${this.day}`,
      {
        fontSize: "16px",
        fontFamily: "Arial",
        color: "#000000",
      }
    );
    this.dayText.setOrigin(0.5, 0.5);
    this.dayText.setScrollFactor(0);
  }

  private drawNextButton() {
    const marker = this.scene.add
      .image(
        Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE,
        "marker",
        0
      )
      .setOrigin(0, 0);

    marker.scale = 2;

    marker.setScrollFactor(0);

    const nextDayText = this.scene.add
      .text(
        Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE / 2,
        "Next Day",
        {
          fontSize: "16px",
          fontFamily: "Arial",
          color: "#000000",
        }
      )
      .setOrigin(0.5, 0.5);
    nextDayText.setScrollFactor(0);

    marker.setInteractive();
    marker.on("pointerdown", () => {
      this.nextDay();
    });
  }

  public nextDay() {
    this.day += 1;

    if (!this.dayText?.text) return;
    this.dayText.text = `Day ${this.day}`;

    (this.scene as MainGame).tileManager?.nextDay();
  }
}
