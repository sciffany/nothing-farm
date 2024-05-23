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
    [HouseType.Barn]: {
      location: { x: 6, y: 0 },
      spriteFrame: 1,
    },
    [HouseType.Market]: {
      location: { x: 22, y: 8 },
      spriteFrame: 2,
    },
  },
  [HouseType.Home]: {
    [HouseType.Farm]: {
      location: { x: 8 + 2, y: 4 + 4 },
      spriteFrame: -1,
    },
  },
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

      let sprite;
      if (spriteFrame >= 0) {
        const houseSprite = this.scene.add.sprite(
          location.x * Constants.TILE_DISPLAY_SIZE,
          location.y * Constants.TILE_DISPLAY_SIZE,
          "houses",
          spriteFrame
        );
        houseSprite.setOrigin(0, 0);
        houseSprite.setScale(2);
        sprite = houseSprite;
      } else {
        // Invisible marker that leads to the location
        const marker = this.scene.add.sprite(
          location.x * Constants.TILE_DISPLAY_SIZE,
          location.y * Constants.TILE_DISPLAY_SIZE,
          "marker",
          0
        );
        marker.setOrigin(0, 0);
        marker.scaleX *= 0.5;
        marker.setAlpha(0.1);
        sprite = marker;
      }
      sprite.setInteractive();
      sprite.on("pointerdown", () => {
        this.scene.changeLocation(type as unknown as HouseType);
      });
      this.sprites.push(sprite);
    });
  }

  public destroy() {
    this.sprites.forEach((sprite) => sprite.destroy());
  }
}
