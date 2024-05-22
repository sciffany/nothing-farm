import { Constants } from "../constants";
import MainGame from "../scenes/mainGame";

export enum HouseType {
  Farm,
  Home,
  Barn,
  Market,
  Neighbor,
}

export const Houses = {
  [HouseType.Farm]: {
    [HouseType.Home]: {
      location: { x: 1, y: 3 },
      spriteFrame: 0,
    },
    [HouseType.Market]: {
      location: { x: 22, y: 8 },
      spriteFrame: 2,
    },
  },
  [HouseType.Home]: {},
  [HouseType.Barn]: {},
  [HouseType.Market]: {},
  [HouseType.Neighbor]: {},
};

export default class HouseManager {
  private scene: MainGame;
  private currLoc: HouseType = HouseType.Farm;
  private sprites: Phaser.GameObjects.Sprite[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(currLoc: HouseType) {
    this.currLoc = currLoc;
    Object.entries(Houses[this.currLoc]).forEach(([type, house]) => {
      const { location, spriteFrame } = house;
      const houseSprite = this.scene.add.sprite(
        location.x * Constants.TILE_DISPLAY_SIZE,
        location.y * Constants.TILE_DISPLAY_SIZE,
        "houses",
        spriteFrame
      );
      houseSprite.setOrigin(0, 0);
      houseSprite.setScale(2);
      houseSprite.setInteractive();

      houseSprite.on("pointerdown", () => {
        this.scene.changeLocation(type as unknown as HouseType);
      });
      this.sprites.push(houseSprite);
    });
  }

  public destroy() {
    this.sprites.forEach((sprite) => sprite.destroy());
  }
}
