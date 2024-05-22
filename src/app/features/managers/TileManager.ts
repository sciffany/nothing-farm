import { Constants } from "../constants";
import nothingFarmJson from "../../../../public/assets/nothing_farm.json";
import { PlantType } from "../items/Seed";

export enum TileType {
  PLAIN,
  GROUND,
  TILLED,
  WATERED,
  DOOR,
  ITEM,
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
  private tileSprite: Phaser.GameObjects.Sprite | null = null;
  private tilePlantSprite: Phaser.GameObjects.Sprite | null = null;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene, x: number, y: number, design: number) {
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
        break;
      default:
        this.type = TileType.PLAIN;
        break;
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

      this.tileSprite.scale = 2;
    }
  }

  public changePlantStage(plantType: PlantType, plantStage: TilePlantStage) {
    this.plantStage = plantStage;
    const plantFrame =
      plantStage - 1 + (Object.keys(TilePlantStage).length / 2 - 1) * plantType;
    if (this.tilePlantSprite) {
      this.tilePlantSprite.setTexture("plants", plantFrame);
    } else {
      this.tilePlantSprite = this.scene.add.sprite(
        this.x * Constants.TILE_DISPLAY_SIZE,
        (this.y - 1) * Constants.TILE_DISPLAY_SIZE,
        "plants",
        plantFrame
      );

      this.tilePlantSprite.setOrigin(0, 0);

      this.tilePlantSprite.scale = 2;
      this.tilePlantSprite.z = 1;
    }
  }

  public typeToSpriteFrame(type: TileType) {
    switch (type) {
      case TileType.PLAIN:
        return 0;
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
  private tileMap: Array<Array<Tile>>;
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.tileMap = Array(Constants.MAP_HEIGHT)
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
      );
  }

  public getTile(x: number, y: number) {
    return this.tileMap[y][x];
  }
}
