import { Constants, Layer } from "../constants";
import nothingFarmJson from "../../../../public/assets/nothing_farm.json";
import westSideJson from "../../../../public/assets/west_side.json";
import { PlantType } from "../items/Seed";
import MainGame from "../scenes/mainGame";
import { HouseType } from "../locations";
import { PICKUPABLE_OBJECTS, PickupableObjectType } from "../objects";
import { weightedRandom } from "../utils/random";
import { fadeOut } from "../utils/animation";

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
  public plantStage: TilePlantStage;
  public objectType: PickupableObjectType = PickupableObjectType.NONE;

  private tileSprite: Phaser.GameObjects.Sprite | null = null;
  private tilePlantSprite: Phaser.GameObjects.Sprite | null = null;
  private objectSprite: Phaser.GameObjects.Sprite | null = null;

  private scene: MainGame;
  public plantType: PlantType = PlantType.TURNIP;

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
      this.tileSprite.depth = Layer.TILES;
    }
  }

  public changeObjectType(objectType: PickupableObjectType) {
    this.objectType = objectType;
    if (objectType == PickupableObjectType.NONE) {
      this.scene.tweens.add(fadeOut([this.objectSprite], 200));
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
    }
  }

  public hide() {
    this.tilePlantSprite?.setAlpha(0);
    this.tileSprite?.setAlpha(0);
    this.objectSprite?.setAlpha(0);
  }

  public show() {
    this.tilePlantSprite?.setAlpha(1);
    this.tileSprite?.setAlpha(1);
    this.objectSprite?.setAlpha(1);
  }

  public changePlantStage(plantStage: TilePlantStage, plantType?: PlantType) {
    if (plantType) {
      this.plantType = plantType;
    }
    this.plantStage = plantStage;

    if (this.plantStage === TilePlantStage.NONE) {
      this.tilePlantSprite?.destroy();
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
        this.tilePlantSprite.depth = Layer.TILES;
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
  private currLoc: HouseType = HouseType.FARM;
  private currentTileMap?: Array<Array<Tile>>;
  private tileMap: { [houseType: string]: Array<Array<Tile>> };
  private plantedTileList: { [houseType: string]: Array<Tile> } = {};
  private scene: MainGame;
  private sprites: Phaser.GameObjects.GameObject[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
    this.tileMap = {
      [HouseType.FARM]: Array(Constants.MAP_HEIGHT)
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
      [HouseType.WEST]: Array(Constants.MAP_HEIGHT)
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

  public initialize(currLoc: HouseType) {
    this.currLoc = currLoc;
    this.currentTileMap = this.tileMap[currLoc];

    if (this.plantedTileList[this.currLoc]) {
      this.plantedTileList[this.currLoc].forEach((tile) => {
        tile.show();
      });
    } else {
      this.plantedTileList[this.currLoc] = [];
    }

    this.currentTileMap?.forEach((row) => {
      row.forEach((tile) => {
        tile.changeObjectType(tile.objectType);
      });
    });
  }

  public destroy() {
    this.currentTileMap?.flat()?.forEach((tile) => {
      tile.hide();
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
    this.plantedTileList[this.currLoc]?.push(tile);
  }
}
