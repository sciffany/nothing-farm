import { Constants, Layer } from "../constants";
import nothingFarmJson from "../../../../public/assets/nothing_farm.json";
import westSideJson from "../../../../public/assets/west_side.json";
import { PlantType } from "../items/Seed";
import MainGame from "../scenes/mainGame";
import { PICKUPABLE_OBJECTS, PickupableObjectType } from "../objects";
import { weightedRandom } from "../utils/random";
import { fadeOut } from "../utils/animation";
import { LocationType, PROPERTIES, PropertyType } from "../locations";
import PickupableObject from "../items/PickupableObject";

export enum TileType {
  PLAIN,
  GROUND,
  TILLED,
  WATERED,
  ITEM,
  WATER,
}

export enum TilePlantStage {
  NONE,
  SEEDED,
  GROWN_STAGE_1,
  GROWN_STAGE_2,
  GROWN_STAGE_3,
  GROWN_STAGE_4,
  HARVESTED,
  WITHERED,
}

export class Tile {
  public x: number;
  public y: number;
  public type: TileType;
  public plantStageNum: number = 0;
  public plantStage: TilePlantStage;
  public objectType: PickupableObjectType = PickupableObjectType.NONE;
  public plantType: PlantType = PlantType.TURNIP;
  public propertyId?: string;
  public propertyType?: PropertyType;
  public propertyStage: number = 0;
  public requestIntensity?: number;

  private tileSprite: Phaser.GameObjects.Sprite | null = null;
  private tilePlantSprite: Phaser.GameObjects.Sprite | null = null;
  private objectSprite: Phaser.GameObjects.Sprite | null = null;
  private propertySprite:
    | Phaser.GameObjects.Sprite
    | Phaser.GameObjects.Image
    | null = null;
  public propertyRequestSprite: Phaser.GameObjects.Shape | null = null;

  private scene: MainGame;

  constructor(scene: MainGame, x: number, y: number, design: number) {
    this.x = x;
    this.y = y;
    this.scene = scene;

    this.plantStage = TilePlantStage.NONE;

    switch (design) {
      case 161:
      case 162:
      case 163:
      case 164:
      case 165:
      case 181:
      case 182:
      case 183:
      case 184:
      case 185:
      case 201:
      case 202:
      case 203:
        this.type = TileType.GROUND;
        this.objectType = weightedRandom([
          {
            value: PickupableObjectType.NONE,
            weight: 1,
          },
          {
            value: PickupableObjectType.LOG,
            weight: 0.5,
          },
          {
            value: PickupableObjectType.ROCK,
            weight: 0.5,
          },
          {
            value: PickupableObjectType.YELLOW_FLOWER,
            weight: 0.2,
          },
        ]);
        break;
      case 221:
      case 222:
      case 223:
      case 224:
      case 225:
      case 241:
      case 242:
      case 243:
      case 244:
      case 245:
      case 261:
      case 262:
      case 263:
        this.type = TileType.WATER;
        break;
      default:
        this.type = TileType.PLAIN;
        break;
    }
  }

  public nextDay() {
    // grow plant
    if (
      this.plantStage === TilePlantStage.SEEDED &&
      this.type === TileType.WATERED
    ) {
      this.changePlantStage(TilePlantStage.GROWN_STAGE_1);
    } else if (
      this.plantStage === TilePlantStage.GROWN_STAGE_1 &&
      this.type === TileType.WATERED
    ) {
      this.changePlantStage(TilePlantStage.GROWN_STAGE_2);
    } else if (
      this.plantStage === TilePlantStage.GROWN_STAGE_2 &&
      this.type === TileType.WATERED
    ) {
      this.changePlantStage(TilePlantStage.GROWN_STAGE_3);
    } else if (
      this.plantStage === TilePlantStage.GROWN_STAGE_3 &&
      this.type === TileType.WATERED
    ) {
      this.changePlantStage(TilePlantStage.GROWN_STAGE_4);
    }

    // unwater tile
    if (this.type === TileType.WATERED) {
      this.changeType(TileType.TILLED);
    }

    if (this.propertyType && this.propertySprite) {
      this.propertyStage += 1;
      const property = PROPERTIES[this.propertyType];
      if (this.propertyStage >= property.cost.days) {
        this.propertySprite?.setTexture(property.sprite, property.frame);
        this.propertySprite.setScale(2);
        this.propertySprite.setInteractive();
        this.propertySprite.on("pointerdown", () => {
          this.scene.enterProperty(this.propertyId!);
        });

        this.scene.populationManager.addPopulation(property.people);
      }
    }
  }

  public changeType(type: TileType) {
    this.type = type;
    if (this.tileSprite) {
      this.tileSprite.setTexture(
        "all_tiles_sprite",
        this.typeToSpriteFrame(this.type)
      );
    } else {
      this.tileSprite = this.scene.add.sprite(
        this.x * Constants.TILE_DISPLAY_SIZE,
        this.y * Constants.TILE_DISPLAY_SIZE,
        "all_tiles_sprite",
        this.typeToSpriteFrame(this.type)
      );

      this.tileSprite.setOrigin(0, 0);
      this.tileSprite.depth = Layer.TILES_PRESS;
    }
  }

  public breakPickupable() {
    if (this.objectType === PickupableObjectType.NONE) return;
    this.objectSprite?.destroy();
    let objectType = this.objectType;
    Array(5)
      .fill(0)
      .forEach(() => {
        const x =
          this.x * Constants.TILE_DISPLAY_SIZE +
          Math.random() * Constants.TILE_DISPLAY_SIZE;
        const y =
          this.y * Constants.TILE_DISPLAY_SIZE +
          Math.random() * Constants.TILE_DISPLAY_SIZE;
        const image = this.scene.add.image(
          x,
          y,
          PICKUPABLE_OBJECTS[this.objectType].sprite,
          PICKUPABLE_OBJECTS[this.objectType].frame
        );
        image.setInteractive();
        image.depth = Layer.UI;
        image.on("pointerover", () => {
          this.scene.itemManager.addItem(
            new PickupableObject(this.scene, objectType, 1)
          );

          const qtyText = this.scene.add.text(
            x,
            y,
            `+1 ${PICKUPABLE_OBJECTS[objectType].name}`,
            {
              fontSize: "12px",
              color: "#b55945",
              fontFamily: "DePixelSchmal",
            }
          );
          qtyText.depth = Layer.UI;

          this.scene.tweens.add({
            targets: qtyText,
            y: -Constants.TILE_DISPLAY_SIZE,
            ease: "Power1",
            duration: 2000,
          });

          this.scene.tweens.add({
            targets: qtyText,
            alpha: 0,
            ease: "Power1",
            duration: 2000,
            onComplete: () => {
              qtyText.destroy();
            },
          });
          image.destroy();
        });
      });
  }

  public addProperty(propertyId: string, propertyType: PropertyType) {
    this.propertyId = propertyId;
    this.propertyType = propertyType;
    this.propertyStage = 0;

    const property = PROPERTIES[propertyType];

    let propertySprite;
    if (property.cost.days === 0) {
      propertySprite = this.scene.add.sprite(
        this.x * Constants.TILE_DISPLAY_SIZE,
        this.y * Constants.TILE_DISPLAY_SIZE,
        property.sprite,
        property.frame
      );
      propertySprite.setScale(2);
      propertySprite.setInteractive();
      propertySprite.on("pointerdown", () => {
        this.scene.enterProperty(propertyId);
      });
    } else {
      propertySprite = this.scene.add.image(
        this.x * Constants.TILE_DISPLAY_SIZE,
        this.y * Constants.TILE_DISPLAY_SIZE,
        "construction"
      );
    }
    propertySprite.displayHeight = Constants.TILE_DISPLAY_SIZE * 2;
    propertySprite.displayWidth = Constants.TILE_DISPLAY_SIZE * 2;
    propertySprite.setOrigin(0, 0);
    propertySprite.depth = Layer.PROPERTIES;
    this.propertySprite = propertySprite;

    this.scene.tileManager.addTile(this);
  }

  public changeRequest(request: PropertyType) {
    this.propertyRequestSprite = this.scene.add.circle(
      this.x * Constants.TILE_DISPLAY_SIZE,
      this.y * Constants.TILE_DISPLAY_SIZE,
      10,
      PROPERTIES[request].color
    );
    this.propertyRequestSprite.depth = Layer.PROPERTIES;
    this.scene.tweens.add({
      targets: this.propertyRequestSprite,
      alpha: 0,
      duration: 1000,
      yoyo: true,
      repeat: -1,
    });
  }

  public changeObjectType(objectType: PickupableObjectType) {
    this.objectType = objectType;
    if (objectType == PickupableObjectType.NONE) {
      this.objectSprite?.destroy();
      return;
    } else {
      this.objectSprite = this.scene.add.sprite(
        this.x * Constants.TILE_DISPLAY_SIZE,
        this.y * Constants.TILE_DISPLAY_SIZE,
        PICKUPABLE_OBJECTS[objectType].sprite,
        PICKUPABLE_OBJECTS[objectType].frame
      );
      this.objectSprite.setOrigin(0, 0);
      this.objectSprite.setScale(2);
      this.objectSprite.depth = Layer.TILES_PRESS;

      this.scene.tileManager.addTile(this);
    }
  }

  public hide() {
    this.tilePlantSprite?.setAlpha(0);
    this.tileSprite?.setAlpha(0);
    this.objectSprite?.setAlpha(0);
    this.propertySprite?.setAlpha(0);
    this.propertyRequestSprite?.setAlpha(0);
  }

  public show() {
    this.tilePlantSprite?.setAlpha(1);
    this.tileSprite?.setAlpha(1);
    this.objectSprite?.setAlpha(1);
    this.propertySprite?.setAlpha(1);
    if (this.propertySprite) {
      this.propertySprite.displayHeight = Constants.TILE_DISPLAY_SIZE * 2;
      this.propertySprite.displayWidth = Constants.TILE_DISPLAY_SIZE * 2;
    }
    this.propertyRequestSprite?.setAlpha(1);
  }

  public changePlantStage(plantStage: TilePlantStage, plantType?: PlantType) {
    if (plantType) {
      this.plantType = plantType;
    }
    this.plantStage = plantStage;

    if (this.plantStage == TilePlantStage.NONE) {
      this.tilePlantSprite?.destroy();
      this.tilePlantSprite = null;
    } else {
      const plantFrame =
        plantStage -
        1 +
        (Object.keys(TilePlantStage).length / 2 - 1) * this.plantType!;

      if (this.tilePlantSprite) {
        this.tilePlantSprite.setTexture("plants", plantFrame);
      } else {
        this.tilePlantSprite = this.scene.add.sprite(
          this.x * Constants.TILE_DISPLAY_SIZE,
          (this.y - 1) * Constants.TILE_DISPLAY_SIZE,
          "plants",
          plantFrame
        );

        this.tilePlantSprite.setScale(2);
        this.tilePlantSprite.setOrigin(0, 0);
        this.tilePlantSprite.depth = Layer.TILES_PRESS;
      }
    }
  }

  public typeToSpriteFrame(type: TileType) {
    switch (type) {
      case TileType.PLAIN:
        return 8;
      case TileType.TILLED:
        return 5;
      case TileType.WATERED:
        return 6;
    }
  }

  public getType() {
    return this.type;
  }
}

export default class TileManager {
  private location: LocationType = LocationType.FARM;
  private currentTileMap?: Array<Array<Tile>>;
  private tileMap: { [houseType: string]: Array<Array<Tile>> };
  private plantedTileList: { [houseType: string]: Array<Tile> } = {};

  constructor(scene: MainGame) {
    this.tileMap = {
      [LocationType.FARM]: Array(Constants.MAP_HEIGHT)
        .fill(0)
        .map((_, y) =>
          Array(Constants.MAP_WIDTH)
            .fill(0)
            .map((_, x) => {
              return new Tile(
                scene,
                x,
                y,
                nothingFarmJson.layers[0].data[Constants.MAP_WIDTH * y + x]
              );
            })
        ),
      [LocationType.WEST]: Array(Constants.MAP_HEIGHT)
        .fill(0)
        .map((_, y) =>
          Array(Constants.MAP_WIDTH)
            .fill(0)
            .map((_, x) => {
              return new Tile(
                scene,
                x,
                y,
                westSideJson.layers[0].data[Constants.MAP_WIDTH * y + x]
              );
            })
        ),
    };
  }

  public initialize(location: LocationType) {
    this.location = location;
    this.currentTileMap = this.tileMap[location];

    if (this.plantedTileList[this.location]) {
      this.plantedTileList[this.location].forEach((tile) => {
        tile.show();
      });
    } else {
      this.plantedTileList[this.location] = [];
    }

    this.currentTileMap?.forEach((row) => {
      row.forEach((tile) => {
        tile.changeObjectType(tile.objectType);
      });
    });
  }

  public destroy() {
    this.plantedTileList[this.location].forEach((tile) => {
      tile.hide();
    });
  }

  public init() {
    this.plantedTileList[this.location].forEach((tile) => {
      tile.show();
    });
  }

  public getTile(x: number, y: number) {
    return this.currentTileMap?.[y][x];
  }

  public nextDay() {
    Object.values(this.plantedTileList).forEach((tileList) => {
      tileList.forEach((tile) => {
        tile?.nextDay();
      });
    });
  }

  public addTile(tile: Tile) {
    this.plantedTileList[this.location]?.push(tile);
  }
}
