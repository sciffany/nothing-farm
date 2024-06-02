import { Constants, Layer } from "../constants";
import { DialogueType } from "../dialogues";
import {
  FIRST_NAMES,
  LAST_NAMES,
  MBTI,
  PROPERTIES,
  PropertyType,
} from "../locations";
import { ITEMS, ItemType } from "../objects";
import MainGame from "../scenes/mainGame";
import { weightedRandom } from "../utils/random";

export default class PropertyManager {
  public properties: {
    [propertyId: string]: {
      x: number;
      y: number;
      propertyType: PropertyType;
      request?: PropertyType;
      occupants: {
        propertyId: string;
        firstName: string;
        lastName: string;
        mbti: string;
        favoriteItem: ItemType;
        relationship: number;
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
    | Phaser.GameObjects.Rectangle
  )[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public addProperty({
    x,
    y,
    propertyId,
    propertyType,
  }: {
    x: number;
    y: number;
    propertyId: string;
    propertyType: PropertyType;
  }) {
    const property = PROPERTIES[propertyType];
    const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    this.properties[propertyId] = {
      x,
      y,
      propertyType,
      occupants: Array(property.people)
        .fill(0)
        .map(() => ({
          propertyId: propertyId,
          firstName:
            FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)],
          lastName,
          mbti: MBTI[Math.floor(Math.random() * MBTI.length)],
          favoriteItem: (Object.keys(ITEMS) as unknown[] as ItemType[])[
            Math.floor(Math.random() * Object.keys(ITEMS).length)
          ],
          relationship: 2,
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
      property.sprite,
      property.frame
    );

    this.interiorSprite.displayHeight = Constants.TILE_DISPLAY_SIZE * 8;
    this.interiorSprite.displayWidth = Constants.TILE_DISPLAY_SIZE * 8;
    this.interiorSprite.setOrigin(0, 0);
    this.interiorSprite.setInteractive();

    this.drawExitButton();

    this.properties[propertyId].occupants.forEach((occupant, index) => {
      const image = this.scene.add.image(
        Constants.TILE_DISPLAY_SIZE * 6 +
          Constants.TILE_DISPLAY_SIZE * (index * 4 + 1),
        Constants.TILE_DISPLAY_SIZE * 2,
        occupant.firstName,
        0
      );

      const rectangle = this.scene.add.rectangle(
        Constants.TILE_DISPLAY_SIZE * 6 +
          Constants.TILE_DISPLAY_SIZE * (index * 4 + 1),
        Constants.TILE_DISPLAY_SIZE * 2 + Constants.TILE_DISPLAY_SIZE * 3,
        Constants.TILE_DISPLAY_SIZE * 4,
        Constants.TILE_DISPLAY_SIZE,
        0xffffff
      );
      rectangle.setOrigin(0.5, 0.5);

      const text = this.scene.add.text(
        Constants.TILE_DISPLAY_SIZE * 6 +
          Constants.TILE_DISPLAY_SIZE * (index * 4 + 1),
        Constants.TILE_DISPLAY_SIZE * 2 + Constants.TILE_DISPLAY_SIZE * 3,
        `${occupant.firstName} ${occupant.lastName}\ninto ${
          ITEMS[occupant.favoriteItem].name
        }`,
        Constants.TEXT_PROPS
      );
      text.setOrigin(0.5, 0.5);

      image.setInteractive();
      image.on("pointerdown", () => {
        occupant.relationship += 5;
        relationshipBar.displayWidth =
          (occupant.relationship / 20) * Constants.TILE_DISPLAY_SIZE * 2;
        this.scene.dialogueManager.playCharacterDialogue(
          propertyType,
          occupant.mbti
        );
      });

      const relationship = this.scene.add.rectangle(
        Constants.TILE_DISPLAY_SIZE * 6 +
          Constants.TILE_DISPLAY_SIZE * (index * 4 + 1),
        Constants.TILE_DISPLAY_SIZE * 6,
        Constants.TILE_DISPLAY_SIZE * 4,
        Constants.TILE_DISPLAY_SIZE,
        0x000000
      );
      relationship.setOrigin(0.5, 0.5);

      const relationshipBar = this.scene.add.rectangle(
        Constants.TILE_DISPLAY_SIZE * 6 +
          Constants.TILE_DISPLAY_SIZE * (index * 4 + 1) -
          Constants.TILE_DISPLAY_SIZE * 2,
        Constants.TILE_DISPLAY_SIZE * 6,
        Constants.TILE_DISPLAY_SIZE * 4,
        Constants.TILE_DISPLAY_SIZE,
        0xffc0cb
      );
      relationshipBar.setOrigin(0, 0.5);

      relationshipBar.displayWidth =
        (occupant.relationship / 20) * Constants.TILE_DISPLAY_SIZE * 2;

      this.occupantSprites.push(relationshipBar);
      this.occupantSprites.push(relationship);
      this.occupantSprites.push(rectangle);
      this.occupantSprites.push(image);
      this.occupantSprites.push(text);
    });
  }

  public close() {
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

  public nextDay() {
    Object.values(this.properties).forEach((property) => {
      if (property.request) {
        return;
      }
      const growthStage =
        this.scene.tileManager.getTile(property.x, property.y)?.propertyStage ||
        0;
      if (growthStage < PROPERTIES[property.propertyType].cost.days) {
        return;
      }

      const hasRequest = weightedRandom([
        {
          value: true,
          weight: 0.1,
        },
        {
          value: false,
          weight: 0.9,
        },
      ]);
      property.request = hasRequest
        ? (Math.floor(
            Math.random() * Object.values(PROPERTIES).length
          ) as PropertyType)
        : undefined;

      if (property.request) {
        this.scene.tileManager
          .getTile(property.x, property.y)
          ?.changeRequest(property.request);
      }
    });
  }
}
