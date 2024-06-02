import { Constants, Layer } from "../constants";
import { PROPERTIES, PropertyType } from "../locations";
import { ItemType } from "../objects";
import MainGame from "../scenes/mainGame";
import cuid from "cuid";

export default class BuildManager {
  private scene: MainGame;
  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public build(propertyType: PropertyType) {
    const property = PROPERTIES[propertyType];

    this.scene.moneyManager.addMoney(-property.cost.money);
    this.scene.itemManager
      .findItemWithType(ItemType.LOG)
      ?.useUp(property.cost.log);
    this.scene.itemManager
      .findItemWithType(ItemType.ROCK)
      ?.useUp(property.cost.rock);

    this.scene.energyManager.addEnergy(-40);

    const propertyShadow = this.scene.add.sprite(
      0,
      0,
      property.sprite,
      property.frame
    );
    propertyShadow.setOrigin(0, 0);
    propertyShadow.displayWidth = Constants.TILE_DISPLAY_SIZE * 2;
    propertyShadow.displayHeight = Constants.TILE_DISPLAY_SIZE * 2;
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
      const [tileX, tileY] = this.scene.getTileCoordinates();
      propertyShadow.x = tileX * Constants.TILE_DISPLAY_SIZE;
      propertyShadow.y = tileY * Constants.TILE_DISPLAY_SIZE;
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

    return true;
  }
}
