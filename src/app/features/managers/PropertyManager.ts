import { Constants, Layer } from "../constants";
import { PROPERTIES, PropertyType } from "../locations";
import MainGame from "../scenes/mainGame";

export default class PropertyManager {
  public properties: {
    [propertyId: string]: {
      propertyType: PropertyType;
      occupantIds: string[];
    };
  } = {};
  private scene: MainGame;
  private exitButton: Phaser.GameObjects.Image | null = null;
  private exitText: Phaser.GameObjects.Text | null = null;
  private interiorSprite: Phaser.GameObjects.Sprite | null = null;
  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public addProperty({
    propertyId,
    propertyType,
  }: {
    propertyId: string;
    propertyType: PropertyType;
  }) {
    this.properties[propertyId] = {
      propertyType,
      occupantIds: [],
    };
  }

  public open(propertyId: string) {
    const propertyType = this.properties[propertyId].propertyType;
    const property = PROPERTIES[propertyType];

    this.scene.dayManager.init(propertyType);

    this.interiorSprite = this.scene.add.sprite(
      Constants.TILE_DISPLAY_SIZE * 6,
      Constants.TILE_DISPLAY_SIZE * 2,
      property.interiorChoices[0].sprite,
      property.interiorChoices[0].frame
    );

    this.interiorSprite.setScale(2);
    this.interiorSprite.setOrigin(0, 0);
    this.interiorSprite.setInteractive();

    this.drawExitButton();
  }

  public close(propertyId: string) {
    const propertyType = this.properties[propertyId].propertyType;
    const property = PROPERTIES[propertyType];
    this.scene.dayManager.init(PropertyType.OUTSIDE);

    this.interiorSprite?.destroy();
    this.exitButton?.destroy();
    this.exitText?.destroy();
  }

  private drawExitButton() {
    this.exitButton = this.scene.add
      .image(
        Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE,
        "marker",
        0
      )
      .setOrigin(0, 0);

    this.exitButton.depth = Layer.UI;
    this.exitButton.setScrollFactor(0);

    this.exitText = this.scene.add
      .text(
        Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE / 2,
        "EXIT",
        Constants.TEXT_PROPS
      )
      .setOrigin(0.5, 0.5);
    this.exitText.depth = Layer.UI;
    this.exitText.setScrollFactor(0);

    this.exitButton.setInteractive();
    this.exitButton.on("pointerdown", () => {
      this.scene.exitProperty();
    });
  }
}
