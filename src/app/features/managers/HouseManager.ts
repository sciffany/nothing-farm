import { Constants } from "../constants";

export enum HouseType {
  Home,
  Barn,
  Market,
  Neighbor,
}

export const Houses = {
  [HouseType.Home]: {
    location: { x: 1, y: 3 },
    spriteFrame: 0,
  },
  [HouseType.Barn]: {
    location: { x: 7, y: 0 },
    spriteFrame: 1,
  },
  [HouseType.Market]: {
    location: { x: 22, y: 8 },
    spriteFrame: 2,
  },
};

export default class HouseManager {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public initialize() {
    Object.values(Houses).forEach((house) => {
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
    });
  }
}
