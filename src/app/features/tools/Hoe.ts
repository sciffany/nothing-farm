import Tool from "./Tool";
import nothingFarmJson from "../../../../public/assets/nothing_farm.json";
import { Constants } from "../constants";
import { TileNum } from "../enums/tiles";

const HOE_FRAME = 0;

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
    if (tile === TileNum.PLAIN_SOIL) {
      const rectangle = this.scene.add.rectangle(
        x * Constants.TILESIZE,
        y * Constants.TILESIZE,
        Constants.TILESIZE,
        Constants.TILESIZE,
        0xff0000
      );
      rectangle.setOrigin(0, 0);

      rectangle.setAlpha(0.5);
    }
  }
}
