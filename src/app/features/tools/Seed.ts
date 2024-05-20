import Tool from "./Tool";
import nothingFarmJson from "../../../../public/assets/nothing_farm.json";
import { Constants } from "../constants";
import { PLAIN_SOILS } from "../enums/tiles";

const SEED_FRAME = 5;

export default class Seed extends Tool {
  constructor(scene: Phaser.Scene) {
    super(scene, "Seed");
  }

  public initialize() {
    this.sprite = this.scene.add
      .sprite(0, 0, "tools", SEED_FRAME)
      .setOrigin(0, 0);

    this.sprite.scale = 2;

    this.moveToPosition(0, 1);
  }

  public use(x: number, y: number) {
    const tileNum = y * Constants.MAP_WIDTH + x;
    const tile = nothingFarmJson.layers[0].data[tileNum];
    if (PLAIN_SOILS.includes(tile)) {
      const soil = this.scene.add.sprite(
        x * Constants.TILE_DISPLAY_SIZE,
        y * Constants.TILE_DISPLAY_SIZE,
        "all_tiles_sprite"
        // TILLED_SOIL_FRAME
      );
      soil.scale = 2;
      soil.setOrigin(0, 0);
      soil.setDepth(1);
    }
  }
}
