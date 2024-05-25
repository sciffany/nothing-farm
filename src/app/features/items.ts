import Hand from "./items/Hand";
import Hoe from "./items/Hoe";
import Seed, { PlantType } from "./items/Seed";
import Travel from "./items/Travel";
import Vegetable from "./items/Vegetable";
import WateringCan from "./items/WateringCan";

export enum ItemType {
  Hoe,
  Travel,
  WateringCan,
  Hand,
  TurnipSeeds,
  TomatoSeeds,
  CornSeeds,
  CarrotSeeds,
  Turnip,
  Tomato,
  Corn,
  Carrot,
}

export const ITEMS = {
  [ItemType.Hoe]: {
    name: "Hoe",
    constructor: (scene: Phaser.Scene) => new Hoe(scene),
  },
  [ItemType.Travel]: {
    name: "Travel",
    constructor: (scene: Phaser.Scene) => new Travel(scene),
  },
  [ItemType.WateringCan]: {
    name: "Watering Can",
    constructor: (scene: Phaser.Scene) => new WateringCan(scene, 45),
  },
  [ItemType.Hand]: {
    name: "Hand",
    constructor: (scene: Phaser.Scene) => new Hand(scene),
  },
  [ItemType.TurnipSeeds]: {
    name: "Turnip Seeds",
    consturctor: (scene: Phaser.Scene) => new Seed(scene, PlantType.TURNIP, 1),
  },
  [ItemType.TomatoSeeds]: {
    name: "Tomato Seeds",
    constructor: (scene: Phaser.Scene) => new Seed(scene, PlantType.TOMATO, 1),
  },
  [ItemType.CornSeeds]: {
    name: "Corn Seeds",
    constructor: (scene: Phaser.Scene) => new Seed(scene, PlantType.CORN, 1),
  },
  [ItemType.CarrotSeeds]: {
    name: "Carrot Seeds",
    constructor: (scene: Phaser.Scene) => new Seed(scene, PlantType.CARROT, 1),
  },
  [ItemType.Turnip]: {
    name: "Turnip",
    constructor: (scene: Phaser.Scene) =>
      new Vegetable(scene, PlantType.TURNIP, 1),
  },
  [ItemType.Tomato]: {
    name: "Tomato",
    constructor: (scene: Phaser.Scene) =>
      new Vegetable(scene, PlantType.TOMATO, 1),
  },
  [ItemType.Corn]: {
    name: "Corn",
    constructor: (scene: Phaser.Scene) =>
      new Vegetable(scene, PlantType.CORN, 1),
  },
  [ItemType.Carrot]: {
    name: "Carrot",
    constructor: (scene: Phaser.Scene) =>
      new Vegetable(scene, PlantType.CARROT, 1),
  },
};
