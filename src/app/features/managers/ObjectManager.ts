import { Constants } from "../constants";
import { LOCATIONS, LocationType } from "../locations";
import { CLICKABLE_OBJECTS, ClickableObjectType } from "../objects";
import MainGame from "../scenes/mainGame";

export default class ObjectManager {
  private scene: MainGame;
  private sprites: Phaser.GameObjects.Sprite[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(locationType: LocationType) {
    // Object.entries(LOCATIONS[this.currLoc].objects).forEach(
    //   ([type, object]) => {
    //     const { location, spriteFrame } = object;
    //     let sprite;
    //     const houseSprite = this.scene.add.sprite(
    //       location.x * Constants.TILE_DISPLAY_SIZE,
    //       location.y * Constants.TILE_DISPLAY_SIZE,
    //       "objects",
    //       spriteFrame
    //     );
    //     houseSprite.setOrigin(0, 0);
    //     houseSprite.setScale(2);
    //     sprite = houseSprite;
    //     const objectProperties = CLICKABLE_OBJECTS[parseInt(type)];
    //     sprite.setInteractive();
    //     sprite.on("pointerdown", () => {
    //       objectProperties.action(this.scene);
    //     });
    //     this.sprites.push(sprite);
    //   }
    // );
  }

  public destroy() {
    this.sprites.forEach((sprite) => sprite.destroy());
  }
}
