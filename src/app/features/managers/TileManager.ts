import { Constants, Layer } from "../constants";
import nothingFarmJson from "../../../../public/assets/nothing_farm.json";
import { PlantType } from "../items/Seed";
import MainGame from "../scenes/mainGame";
import { HouseType } from "./HouseManager";
import { initialize } from "next/dist/server/lib/render-server";

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
      this.tileSprite.depth = Layer.TilesAndHouses;
      // this.tileSprite.scale = 2;
    }
  }

  public hide() {
    this.tilePlantSprite?.setAlpha(0);
    this.tileSprite?.setAlpha(0);
  }

  public show() {
    this.tilePlantSprite?.setAlpha(1);
    this.tileSprite?.setAlpha(1);
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

        this.tilePlantSprite.setOrigin(0, 0);
        this.tilePlantSprite.depth = Layer.TilesAndHouses;
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
  private currLoc: HouseType = HouseType.Farm;
  private currentTileMap?: Array<Array<Tile>>;
  private tileMap: { [houseType: string]: Array<Array<Tile>> };
  private occupiedTileList: { [houseType: string]: Array<Tile> } = {};
  private scene: MainGame;
  private sprites: Phaser.GameObjects.GameObject[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
    this.tileMap = {
      [HouseType.Farm]: Array(Constants.MAP_HEIGHT)
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
    };
  }

  public initialize(currLoc: HouseType) {
    this.currLoc = currLoc;
    this.currentTileMap = this.tileMap[currLoc];

    if (this.occupiedTileList[this.currLoc]) {
      this.occupiedTileList[this.currLoc].forEach((tile) => {
        tile.show();
      });
    } else {
      this.occupiedTileList[this.currLoc] = [];
    }
  }

  public destroy() {
    this.occupiedTileList[this.currLoc].forEach((tile) => {
      tile.hide();
    });
  }

  public getTile(x: number, y: number) {
    return this.currentTileMap?.[y][x];
  }

  public nextDay() {
    this.occupiedTileList[this.currLoc].forEach((tile) => {
      tile?.nextDay();
    });
  }

  public addTile(tile: Tile) {
    this.occupiedTileList[this.currLoc]?.push(tile);
  }
}
