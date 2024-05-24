import { Constants } from "../constants";
import { DialogueType, DIALOGUES } from "../dialogues";
import { HouseType, LOCATIONS as LOCATIONS } from "../houses";
import MainGame from "../scenes/mainGame";

export default class HouseManager {
  private scene: MainGame;
  private currLoc: HouseType = HouseType.Farm;
  private sprites: Phaser.GameObjects.Sprite[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(currLoc: HouseType) {
    this.currLoc = currLoc;
    Object.entries(LOCATIONS[this.currLoc].houses).forEach(([type, house]) => {
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
