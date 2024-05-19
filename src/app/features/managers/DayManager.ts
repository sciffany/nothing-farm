import { Constants } from "../constants";

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

    const dayText = this.scene.add.text(
      Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
      Constants.TILE_DISPLAY_SIZE / 2,
      `Day ${this.day}`,
      {
        fontSize: "16px",
        fontFamily: "Arial",
        color: "#000000",
      }
    );
    dayText.setOrigin(0.5, 0.5);
    dayText.setScrollFactor(0);
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
  }

  public nextDay() {
    this.day += 1;
    this.dayText?.setText(`Day ${this.day}`);
  }
}
