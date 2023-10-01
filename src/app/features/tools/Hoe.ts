import Tool from "./Tool";
import nothingFarmJson from "../../../../public/assets/nothing_farm.json";
import { Constants } from "../constants";
import { PLAIN_SOILS } from "../enums/tiles";

const HOE_FRAME = 0;
const TILLED_SOIL_FRAME = 5;

export default class Hoe extends Tool {
  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  public initialize() {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", HOE_FRAME)
      .setOrigin(0, 0);

    this.moveToPosition(0, 0);
  }

  public use(x: number, y: number) {
    const tileNum = y * Constants.MAP_WIDTH + x;
    const tile = nothingFarmJson.layers[0].data[tileNum];
    if (PLAIN_SOILS.includes(tile)) {
      const soil = this.scene.add.sprite(
        x * Constants.TILESIZE,
        y * Constants.TILESIZE,
        "all_tiles_sprite",
        TILLED_SOIL_FRAME
      );
      soil.setOrigin(0, 0);
      soil.setDepth(1);
    }
  }
}
