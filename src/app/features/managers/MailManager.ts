import { Constants, Layer } from "../constants";
import { PROPERTIES, PropertyType } from "../locations";
import { ItemType } from "../objects";
import MainGame from "../scenes/mainGame";
import { weightedRandom } from "../utils/random";

export default class MailManager {
  private scene: MainGame;
  private mailContents: PropertyType[];
  private sprites: (Phaser.GameObjects.Image | Phaser.GameObjects.Text)[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
    this.mailContents = [];
  }

  public nextDay() {
    this.addMailContents(
      Array(2)
        .fill(0)
        .map(() =>
          weightedRandom([
            { value: PropertyType.SMALL_HOUSE, weight: 200 },
            { value: PropertyType.BOOKSTORE, weight: 5 },
            { value: PropertyType.BARN, weight: 5 },
            { value: PropertyType.HOSPITAL, weight: 5 },
            { value: PropertyType.MALL, weight: 5 },
            { value: PropertyType.MUSEUM, weight: 5 },
            { value: PropertyType.PLAYGROUND, weight: 5 },
            { value: PropertyType.SEED_MARKET, weight: 5 },
            { value: PropertyType.RANCH, weight: 5 },
          ])
        )
    );
  }

  public addMailContents(mailContents: PropertyType[]) {
    this.mailContents = [...this.mailContents, ...mailContents];
  }

  public initialize() {
    this.drawMailBox();
    this.addMailContents([
      PropertyType.HOME,
      ...Array(8)
        .fill(0)
        .map(() =>
          weightedRandom([
            { value: PropertyType.SMALL_HOUSE, weight: 200 },
            { value: PropertyType.BOOKSTORE, weight: 5 },
            { value: PropertyType.BARN, weight: 5 },
            { value: PropertyType.HOSPITAL, weight: 5 },
            { value: PropertyType.MALL, weight: 5 },
            { value: PropertyType.MUSEUM, weight: 5 },
            { value: PropertyType.PLAYGROUND, weight: 5 },
            { value: PropertyType.SEED_MARKET, weight: 5 },
            { value: PropertyType.RANCH, weight: 5 },
          ])
        ),
    ]);
  }

  public init() {
    this.drawMailBox();
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

    this.sprites = [marker, mailText];
  }

  public destroy() {
    this.sprites.forEach((sprite) => sprite.setAlpha(0));
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
      buildText.setScrollFactor(0);
      buildText.depth = Layer.UI;

      const numLogs =
        this.scene.itemManager.findItemWithType(ItemType.LOG)?.quantity || 0;
      const numRocks =
        this.scene.itemManager.findItemWithType(ItemType.ROCK)?.quantity || 0;
      const numMoney = this.scene.moneyManager.money;
      const energy = this.scene.energyManager.getEnergy();

      if (
        numMoney < property.cost.money ||
        numLogs < property.cost.log ||
        numRocks < property.cost.rock ||
        energy < 40
      ) {
        buildButton.setTint(0x888800);
      } else {
        buildText.setInteractive();
        buildButton.on("pointerdown", () => {
          black.destroy();
          mailContents.forEach((item) => item.destroy());
          if (this.scene.buildManager.build(propertyType)) {
            this.mailContents = this.mailContents.filter(
              (item, index) => index !== i - 2
            );
          }
        });
      }

      mailContents.push(rectangle);
      mailContents.push(propertyText);
      mailContents.push(buildButton);
      mailContents.push(buildText);
    });
  }
}
