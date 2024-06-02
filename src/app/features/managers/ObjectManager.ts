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

  public initialize() {
    const houseSprite = this.scene.add.sprite(
      6 * Constants.TILE_DISPLAY_SIZE,
      6 * Constants.TILE_DISPLAY_SIZE,
      "sellbox",
      0
    );
    houseSprite.setOrigin(0, 0);
    houseSprite.setScale(2);
    const objectProperties = CLICKABLE_OBJECTS[ClickableObjectType.SHIP_BOX];
    houseSprite.setInteractive();
    houseSprite.on("pointerdown", () => {
      objectProperties.action(this.scene);
    });
    this.sprites.push(houseSprite);
  }

  public destroy() {
    this.sprites.forEach((sprite) => sprite.destroy());
  }
}
