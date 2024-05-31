import { Constants, Layer } from "../constants";
import { DialogueType } from "../dialogues";
import {
  FIRST_NAMES,
  LAST_NAMES,
  MBTI,
  PROPERTIES,
  PropertyType,
} from "../locations";
import { ItemType } from "../objects";
import MainGame from "../scenes/mainGame";

export default class PropertyManager {
  public properties: {
    [propertyId: string]: {
      propertyType: PropertyType;
      occupants: {
        propertyId: string;
        firstName: string;
        lastName: string;
        mbti: string;
        relationship: number;
        favoriteItems: ItemType[];
      }[];
    };
  } = {};
  private scene: MainGame;
  private exitButton: Phaser.GameObjects.Image | null = null;
  private exitText: Phaser.GameObjects.Text | null = null;
  private interiorSprite: Phaser.GameObjects.Sprite | null = null;
  private occupantSprites: (
    | Phaser.GameObjects.Image
    | Phaser.GameObjects.Text
  )[] = [];

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
    const property = PROPERTIES[propertyType];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    this.properties[propertyId] = {
      propertyType,
      occupants: Array(property.people)
        .fill(0)
        .map(() => ({
          propertyId: propertyId,
          firstName:
            FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)],
          lastName,
          mbti: MBTI[Math.floor(Math.random() * MBTI.length)],
          favoriteItems: [],
        })),
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

    this.properties[propertyId].occupants.forEach((occupant, index) => {
      const image = this.scene.add.image(
        Constants.TILE_DISPLAY_SIZE * 6 +
          Constants.TILE_DISPLAY_SIZE * (index * 3 + 1),
        Constants.TILE_DISPLAY_SIZE * 2,
        occupant.firstName,
        0xffff00
      );

      const text = this.scene.add.text(
        Constants.TILE_DISPLAY_SIZE * 6 +
          Constants.TILE_DISPLAY_SIZE * (index * 3 + 1),
        Constants.TILE_DISPLAY_SIZE * 2 + Constants.TILE_DISPLAY_SIZE * 3,
        `${occupant.firstName}\n${occupant.lastName}`,
        { ...Constants.TEXT_PROPS, color: "#ffffff" }
      );
      text.setOrigin(0.5, 0.5);

      image.setInteractive();
      image.on("pointerdown", () => {
        this.scene.dialogueManager.playDialogue(DialogueType.CHIT_CHAT);
      });

      this.occupantSprites.push(image);
      this.occupantSprites.push(text);
    });
  }

  public close(propertyId: string) {
    const propertyType = this.properties[propertyId].propertyType;
    const property = PROPERTIES[propertyType];
    this.scene.dayManager.init(PropertyType.OUTSIDE);

    this.interiorSprite?.destroy();
    this.exitButton?.destroy();
    this.exitText?.destroy();
    this.occupantSprites.forEach((sprite) => sprite.destroy());
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
