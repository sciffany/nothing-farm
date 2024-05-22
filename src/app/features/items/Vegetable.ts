import Item from "./Item";
import { TilePlantStage } from "../managers/TileManager";
import { PlantProps, PlantType } from "./Seed";

export default class Vegetable extends Item {
  public plantType: PlantType;

  constructor(scene: Phaser.Scene, plantType: PlantType, quantity: number) {
    const plantName = PlantProps[plantType].name;
    super(scene, plantName, quantity);
    this.plantType = plantType;
  }

  public initialize(position: number) {
    const plantFrame =
      TilePlantStage.HARVESTED -
      1 +
      (Object.keys(TilePlantStage).length / 2 - 1) * this.plantType;

    this.sprite = this.scene.add
      .sprite(0, 0, "plants", plantFrame)
      .setOrigin(0, 0);

    this.sprite.scale = 2;

    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {}
}
