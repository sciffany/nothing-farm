import Item from "./Item";
import MainGame from "../scenes/mainGame";
import { TilePlantStage, TileType } from "../managers/TileManager";
import { Constants, Layer } from "../constants";
import { ItemType } from "../items";

const SEED_FRAME = 5;

export enum PlantType {
  TURNIP,
  CORN,
  TOMATO,
  CARROT,
}

export const PLANTS = {
  [PlantType.TURNIP]: {
    name: "Turnip",
  },
  [PlantType.CORN]: {
    name: "Corn",
  },
  [PlantType.TOMATO]: {
    name: "Tomato",
  },
  [PlantType.CARROT]: {
    name: "Carrot",
  },
};

export default class Seed extends Item {
  public plantType: PlantType;

  constructor(scene: MainGame, plantType: PlantType, quantity: number) {
    const plantName = PLANTS[plantType].name;
    super(scene, plantName + " Seed", quantity);

    this.plantType = plantType;
  }

  public getType() {
    switch (this.plantType) {
      case PlantType.TURNIP:
        return ItemType.TURNIP_SEEDS;
      case PlantType.CORN:
        return ItemType.CORN_SEEDS;
      case PlantType.TOMATO:
        return ItemType.TOMATO_SEEDS;
      case PlantType.CARROT:
        return ItemType.CARROT_SEEDS;
    }
  }

  public initialize(position: number) {
    const seed = this.scene.add
      .sprite(0, 0, "tools", SEED_FRAME)
      .setOrigin(0, 0);
    seed.depth = Layer.UI;

    const plantFrame =
      TilePlantStage.HARVESTED -
      1 +
      (Object.keys(TilePlantStage).length / 2 - 1) * this.plantType;

    const pic = this.scene.add
      .sprite(0, 0, "plants", plantFrame)
      .setOrigin(0, 0);
    pic.setScale(2);
    seed.depth = Layer.UI;

    this.sprite = this.scene.add.container(0, 0, [seed, pic]);
    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {
    const tile = (this.scene as MainGame).tileManager?.getTile(x, y);
    if (
      tile?.getType() === TileType.TILLED ||
      tile?.getType() === TileType.WATERED
    ) {
      if (tile.plantStage !== TilePlantStage.NONE) {
        return;
      }
      if (this.quantity === 0) {
        return;
      }
      this.useUp();
      tile.changePlantStage(TilePlantStage.SEEDED, this.plantType);
    }
  }
}
