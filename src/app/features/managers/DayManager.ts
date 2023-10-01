import { Constants } from "../constants";

export default class DayManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public initialize() {
    this.drawDayCounter();
    this.drawNextButton();
  }

  private drawDayCounter() {
    const marker = this.scene.add
      .image(Constants.WIDTH - 4 * Constants.TILESIZE, 0, "marker", 0)
      .setOrigin(0, 0);
    marker.setScrollFactor(0);
    const dayText = this.scene.add.text(
      Constants.WIDTH - 2 * Constants.TILESIZE,
      Constants.TILESIZE / 2,
      "Day 1",
      {
        fontSize: "8px",
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
        Constants.WIDTH - 4 * Constants.TILESIZE,
        Constants.HEIGHT - Constants.TILESIZE,
        "marker",
        0
      )
      .setOrigin(0, 0);

    marker.setScrollFactor(0);

    const nextDayText = this.scene.add
      .text(
        Constants.WIDTH - 2 * Constants.TILESIZE,
        Constants.HEIGHT - Constants.TILESIZE / 2,
        "Next Day",
        {
          fontSize: "8px",
          fontFamily: "Arial",
          color: "#000000",
        }
      )
      .setOrigin(0.5, 0.5);
    nextDayText.setScrollFactor(0);
  }
}
