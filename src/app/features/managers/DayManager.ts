import { Constants } from "../constants";
import { NothingFarm } from "../game";
import MainGame from "../scenes/mainGame";

export default class DayManager {
  private scene: MainGame;
  private day: number = 1;

  private dayText: Phaser.GameObjects.Text | null = null;

  constructor(scene: MainGame) {
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
    marker.depth = 1;

    this.dayText = this.scene.add.text(
      Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
      Constants.TILE_DISPLAY_SIZE / 2,
      `Day ${this.day}`,
      {
        fontSize: "12px",
        fontFamily: "joystix",
        color: "#000000",
      }
    );
    this.dayText.depth = 1;
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

    marker.depth = 1;

    marker.setScrollFactor(0);

    const nextDayText = this.scene.add
      .text(
        Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE / 2,
        "Next Day",
        {
          fontSize: "12px",
          fontFamily: "joystix",
          color: "#000000",
        }
      )
      .setOrigin(0.5, 0.5);
    nextDayText.depth = 1;
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
