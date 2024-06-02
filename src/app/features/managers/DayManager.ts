import { Constants, Layer } from "../constants";
import { PropertyType } from "../locations";
import MainGame from "../scenes/mainGame";

export default class DayManager {
  private scene: MainGame;
  public day: number = 1;

  private dayText: Phaser.GameObjects.Text | null = null;

  private nextDayButton: Phaser.GameObjects.Image | null = null;
  private nextDayText: Phaser.GameObjects.Text | null = null;

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize() {
    this.drawDayCounter();
    this.drawNextButton();
  }

  public init(propertyType: PropertyType) {
    if (propertyType == PropertyType.HOME) {
      this.nextDayButton?.setAlpha(1);
      this.nextDayText?.setAlpha(1);
    } else {
      this.nextDayButton?.setAlpha(0);
      this.nextDayText?.setAlpha(0);
    }
  }

  private drawDayCounter() {
    const marker = this.scene.add
      .image(Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE, 0, "marker", 0)
      .setOrigin(0, 0);
    marker.setScrollFactor(0);
    marker.depth = Layer.UI;

    this.dayText = this.scene.add.text(
      Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
      Constants.TILE_DISPLAY_SIZE / 2,
      `Day ${this.day}`,
      Constants.TEXT_PROPS
    );
    this.dayText.depth = Layer.UI;
    this.dayText.setOrigin(0.5, 0.5);
    this.dayText.setScrollFactor(0);
  }

  private drawNextButton() {
    this.nextDayButton = this.scene.add
      .image(
        Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 2,
        "marker",
        0
      )
      .setOrigin(0, 0);

    this.nextDayButton.depth = Layer.UI;
    this.nextDayButton.setScrollFactor(0);

    this.nextDayText = this.scene.add
      .text(
        Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT -
          Constants.TILE_DISPLAY_SIZE / 2 -
          Constants.TILE_DISPLAY_SIZE,
        "Sleep and Save",
        Constants.TEXT_PROPS
      )
      .setOrigin(0.5, 0.5);
    this.nextDayText.depth = Layer.UI;
    this.nextDayText.setScrollFactor(0);

    this.nextDayButton.setInteractive();
    this.nextDayButton.on("pointerdown", () => {
      this.nextDay();
    });
  }

  public nextDay() {
    this.day += 1;

    if (!this.dayText?.text) return;
    this.dayText.text = `Day ${this.day}`;

    // fade rectangle in
    const rect = this.scene.add.rectangle(
      0,
      0,
      Constants.WIDTH,
      Constants.HEIGHT,
      0x212020
    );

    rect.setOrigin(0, 0);
    rect.setDepth(Layer.UI);
    rect.setScrollFactor(0);
    rect.setAlpha(0);

    this.scene.tweens.add({
      targets: rect,
      alpha: 1,
      duration: 1000,
      onComplete: async () => {
        this.scene.tileManager.nextDay();
        this.scene.energyManager.refill();
        this.scene.mailManager.nextDay();
        this.scene.propertyManager.nextDay();
        this.scene.moneyManager.addMoney(
          this.scene.populationManager?.population * 10
        );

        const text = this.scene.add.text(
          Constants.WIDTH / 2,
          Constants.HEIGHT / 2,
          `Day Over.\nTaxes collected: ${
            this.scene.populationManager?.population * 10
          }`,
          { ...Constants.TEXT_PROPS, color: "#ffffff" }
        );
        text.setOrigin(0.5, 0.5);
        text.setDepth(Layer.APPRECIATION);
        await new Promise((r) => setTimeout(r, 2000));
        text.destroy();

        this.scene.tweens.add({
          targets: rect,
          alpha: 0,
          duration: 1000,
          onComplete: () => {
            rect.destroy();
          },
        });
      },
    });
  }
}
