import { Constants, Layer } from "../constants";
import { PROPERTIES, PropertyType } from "../locations";
import MainGame from "../scenes/mainGame";
import cuid from "cuid";

export default class BuildManager {
  private scene: MainGame;
  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public build(propertyType: PropertyType) {
    const property = PROPERTIES[propertyType];

    if (this.scene.moneyManager.money < property.cost.money) {
      return;
    }
    this.scene.moneyManager.addMoney(-property.cost.money);

    const propertyShadow = this.scene.add.sprite(
      0,
      0,
      property.sprite,
      property.frame
    );
    propertyShadow.setOrigin(0, 0);
    propertyShadow.displayWidth = Constants.TILE_DISPLAY_SIZE * 4;
    propertyShadow.displayHeight = Constants.TILE_DISPLAY_SIZE * 4;
    propertyShadow.setAlpha(0.5);
    propertyShadow.setScrollFactor(0);
    propertyShadow.depth = Layer.PROPERTIES;

    const buildArea = this.scene.add.rectangle(
      0,
      0,
      Constants.WIDTH,
      Constants.HEIGHT,
      0x000000
    );

    buildArea.setOrigin(0, 0);
    buildArea.setInteractive();
    buildArea.setAlpha(0.01);
    buildArea.setScrollFactor(0);
    buildArea.depth = Layer.BUILD_PRESS;

    buildArea.on("pointermove", (pointer: Phaser.Input.Pointer) => {
      propertyShadow.x = pointer.x;
      propertyShadow.y = pointer.y;
    });
    buildArea.on("pointerdown", () => {
      const [tileX, tileY] = this.scene.getTileCoordinates();
      const tile = this.scene.tileManager.getTile(tileX, tileY);
      const propertyId = cuid();
      tile?.addProperty(propertyId, propertyType);
      this.scene.propertyManager.addProperty({
        x: tileX,
        y: tileY,
        propertyId,
        propertyType,
      });

      propertyShadow.destroy();
      buildArea.destroy();
    });
  }
}
