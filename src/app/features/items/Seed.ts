import Item from "./Item";
import MainGame from "../scenes/mainGame";
import { TileType } from "../managers/TileManager";
import { Layer } from "../constants";
import { ItemType } from "../objects";

const SEED_FRAME = 5;

export enum PlantType {
  NONE,
  TURNIP,
  CORN,
  TOMATO,
  CARROT,
}

export enum TilePlantStage {
  NONE,
  SEEDED,
  GROWN_STAGE_1,
  GROWN_STAGE_2,
  GROWN_STAGE_3,
  GROWN_STAGE_4,
  HARVESTED,
  WITHERED,
}

export const PLANTS = {
  [PlantType.NONE]: {
    name: "None",
    growth: [],
  },
  [PlantType.TURNIP]: {
    name: "Turnip",
    growth: [
      TilePlantStage.SEEDED,
      TilePlantStage.GROWN_STAGE_1,
      TilePlantStage.GROWN_STAGE_4,
    ],
  },
  [PlantType.CORN]: {
    name: "Corn",
    growth: [
      TilePlantStage.SEEDED,
      TilePlantStage.GROWN_STAGE_1,
      TilePlantStage.GROWN_STAGE_2,
      TilePlantStage.GROWN_STAGE_2,
      TilePlantStage.GROWN_STAGE_3,
      TilePlantStage.GROWN_STAGE_3,
      TilePlantStage.GROWN_STAGE_4,
    ],
  },
  [PlantType.TOMATO]: {
    name: "Tomato",
    growth: [
      TilePlantStage.SEEDED,
      TilePlantStage.GROWN_STAGE_1,
      TilePlantStage.GROWN_STAGE_3,
      TilePlantStage.GROWN_STAGE_4,
    ],
  },
  [PlantType.CARROT]: {
    name: "Carrot",
    growth: [
      TilePlantStage.SEEDED,
      TilePlantStage.GROWN_STAGE_1,
      TilePlantStage.GROWN_STAGE_2,
      TilePlantStage.GROWN_STAGE_3,
      TilePlantStage.GROWN_STAGE_4,
    ],
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
      default:
        return ItemType.NONE;
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
      (Object.keys(TilePlantStage).length / 2 - 1) * (this.plantType - 1);

    const pic = this.scene.add
      .sprite(0, 0, "plants", plantFrame)
      .setOrigin(0, 0);
    pic.setScale(2);
    seed.depth = Layer.UI;

    this.sprite = this.scene.add.container(0, 0, [seed, pic]);
    this.moveToPosition(0, position);
  }

  public use(x: number, y: number) {
    const tile = this.scene.tileManager.getTile(x, y);
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
