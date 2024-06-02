import Item from "./Item";
import { PLANTS, PlantType, TilePlantStage } from "./Seed";
import { Layer } from "../constants";
import MainGame from "../scenes/mainGame";
import { ItemType } from "../objects";

export default class Vegetable extends Item {
  public plantType: PlantType;

  constructor(scene: MainGame, plantType: PlantType, quantity: number) {
    const plantName = PLANTS[plantType].name;
    super(scene, plantName, quantity);
    this.plantType = plantType;
  }

  public getType() {
    switch (this.plantType) {
      case PlantType.TURNIP:
        return ItemType.TURNIP;
      case PlantType.CORN:
        return ItemType.CORN;
      case PlantType.TOMATO:
        return ItemType.TOMATO;
      case PlantType.CARROT:
        return ItemType.CARROT;
      default:
        return ItemType.NONE;
    }
  }

  public initialize(position: number) {
    const plantFrame =
      TilePlantStage.HARVESTED -
      1 +
      (Object.keys(TilePlantStage).length / 2 - 1) * (this.plantType - 1);

    this.sprite = this.scene.add
      .sprite(0, 0, "plants", plantFrame)
      .setOrigin(0, 0);

    this.sprite.scale = 2;
    this.sprite.depth = Layer.UI;

    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {}
}
