import { Constants } from "../constants";
import nothingFarmJson from "../../../../public/assets/nothing_farm.json";

export enum TileType {
  PLAIN,
  GROUND,
  TILLED,
  SEEDED,
  WATERED,
  GROWN_STAGE_1,
  GROWN_STAGE_2,
  GROWN_STAGE_3,
  GROWN_STAGE_4,
  HARVESTED,
  WITHERED,
  DOOR,
  ITEM,
}

export class Tile {
  private x: number;
  private y: number;
  private type: TileType;

  constructor(x: number, y: number, design: number) {
    this.x = x;
    this.y = y;

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
      default:
        this.type = TileType.PLAIN;
    }
  }
}

export default class TileManager {
  private tileMap: Array<Array<Tile>>;

  constructor() {
    this.tileMap = Array(Constants.MAP_HEIGHT).map((y) =>
      Array(Constants.MAP_WIDTH).map(
        (x) =>
          new Tile(
            x,
            y,
            nothingFarmJson.layers[0].data[Constants.MAP_HEIGHT * y + x]
          )
      )
    );
  }

  public getTile(x: number, y: number) {
    return this.tileMap[y][x];
  }
}
