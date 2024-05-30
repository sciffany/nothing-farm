import { Constants, Layer } from "../constants";
import { MAILBOX, PROPERTIES, PropertyType } from "../locations";
import MainGame from "../scenes/mainGame";

export default class MailManager {
  private scene: MainGame;
  private mailContents: PropertyType[];

  constructor(scene: MainGame) {
    this.scene = scene;
    this.mailContents = [];
  }

  public nextDay() {
    this.addMailContents(MAILBOX[this.scene.dayManager.day] || []);
  }

  private addMailContents(mailContents: PropertyType[]) {
    this.mailContents = [...this.mailContents, ...mailContents];
  }

  public initialize() {
    this.drawMailBox();
    this.addMailContents(MAILBOX[1] || []);
  }

  private drawMailBox() {
    const marker = this.scene.add
      .image(Constants.WIDTH - 8 * Constants.TILE_DISPLAY_SIZE, 0, "marker", 0)
      .setOrigin(0, 0);
    marker.setScrollFactor(0);
    marker.depth = Layer.UI;

    const mailText = this.scene.add.text(
      Constants.WIDTH - 6 * Constants.TILE_DISPLAY_SIZE,
      Constants.TILE_DISPLAY_SIZE / 2,
      "Move-in Requests",
      Constants.TEXT_PROPS
    );
    mailText.depth = Layer.UI;
    mailText.setOrigin(0.5, 0.5);
    mailText.setScrollFactor(0);

    marker.setInteractive();
    marker.on("pointerdown", () => {
      this.openMailBox();
    });
  }

  private openMailBox() {
    const mailContents: Phaser.GameObjects.GameObject[] = [];
    const black = this.scene.add.rectangle(
      0,
      0,
      Constants.WIDTH,
      Constants.HEIGHT,
      0x000000
    );
    black.setOrigin(0, 0);
    black.setAlpha(0.5);
    black.setScrollFactor(0);
    black.depth = Layer.UI;
    black.setInteractive();
    black.on("pointerdown", () => {
      black.destroy();
      mailContents.forEach((item) => item.destroy());
    });

    this.mailContents.forEach((propertyType, i) => {
      i += 2;
      const property = PROPERTIES[propertyType];
      const rectangle = this.scene.add.rectangle(
        Constants.WIDTH / 2,
        (i + 1) * Constants.TILE_DISPLAY_SIZE,
        Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
        Constants.TILE_DISPLAY_SIZE,
        property.color
      );

      rectangle.setOrigin(0.5, 0.5);
      rectangle.setInteractive();
      rectangle.setScrollFactor(0);
      rectangle.depth = Layer.UI;

      const propertyText = this.scene.add.text(
        Constants.TILE_DISPLAY_SIZE * 2,
        (i + 1) * Constants.TILE_DISPLAY_SIZE,
        `${property.name} - $ ${property.cost.money}, ${property.cost.log} logs, ${property.cost.rock} rocks, ${property.cost.days} days`,
        Constants.TEXT_PROPS
      );
      propertyText.setOrigin(0, 0.5);
      propertyText.setInteractive();
      propertyText.setScrollFactor(0);
      propertyText.depth = Layer.UI;

      const buildButton = this.scene.add.image(
        Constants.WIDTH - 6 * Constants.TILE_DISPLAY_SIZE,
        (i + 1) * Constants.TILE_DISPLAY_SIZE,
        "marker"
      );

      buildButton.setOrigin(0, 0.5);
      buildButton.setInteractive();
      buildButton.setScrollFactor(0);
      buildButton.depth = Layer.UI;

      const buildText = this.scene.add.text(
        Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE,
        (i + 1) * Constants.TILE_DISPLAY_SIZE,
        "Build",
        Constants.TEXT_PROPS
      );

      buildText.setOrigin(0.5, 0.5);
      buildText.setInteractive();
      buildText.setScrollFactor(0);
      buildText.depth = Layer.UI;

      buildButton.on("pointerdown", () => {
        black.destroy();
        mailContents.forEach((item) => item.destroy());
        this.scene.buildManager.build(propertyType);

        this.mailContents = this.mailContents.filter(
          (item, index) => index !== i - 2
        );
      });

      mailContents.push(rectangle);
      mailContents.push(propertyText);
      mailContents.push(buildButton);
      mailContents.push(buildText);
    });
  }
}
