import Hand from "./items/Hand";
import Hoe from "./items/Hoe";
import Seed, { PlantType } from "./items/Seed";
import Travel from "./items/Travel";
import Vegetable from "./items/Vegetable";
import WateringCan from "./items/WateringCan";

export enum ItemType {
  HOE,
  TRAVEL,
  WATERING_CAN,
  HAND,
  TURNIP_SEEDS,
  TOMATO_SEEDS,
  CORN_SEEDS,
  CARROT_SEEDS,
  TURNIP,
  TOMATO,
  CORN,
  CARROT,
}

export const ITEMS = {
  [ItemType.HOE]: {
    name: "Hoe",
    constructor: (scene: Phaser.Scene) => new Hoe(scene),
    sellable: false,
    price: 0,
  },
  [ItemType.TRAVEL]: {
    name: "Travel",
    constructor: (scene: Phaser.Scene) => new Travel(scene),
    sellable: false,
    price: 0,
  },
  [ItemType.WATERING_CAN]: {
    name: "Watering Can",
    constructor: (scene: Phaser.Scene) => new WateringCan(scene, 45),
    sellable: false,
    price: 0,
  },
  [ItemType.HAND]: {
    name: "Hand",
    constructor: (scene: Phaser.Scene) => new Hand(scene),
    sellable: false,
    price: 0,
  },
  [ItemType.TURNIP_SEEDS]: {
    name: "Turnip Seeds",
    constructor: (scene: Phaser.Scene) => new Seed(scene, PlantType.TURNIP, 1),
    sellable: true,
    price: 20,
  },
  [ItemType.TOMATO_SEEDS]: {
    name: "Tomato Seeds",
    constructor: (scene: Phaser.Scene) => new Seed(scene, PlantType.TOMATO, 1),
    sellable: true,
    price: 40,
  },
  [ItemType.CORN_SEEDS]: {
    name: "Corn Seeds",
    constructor: (scene: Phaser.Scene) => new Seed(scene, PlantType.CORN, 1),
    sellable: true,
    price: 100,
  },
  [ItemType.CARROT_SEEDS]: {
    name: "Carrot Seeds",
    constructor: (scene: Phaser.Scene) => new Seed(scene, PlantType.CARROT, 1),
    sellable: true,
    price: 60,
  },
  [ItemType.TURNIP]: {
    name: "Turnip",
    constructor: (scene: Phaser.Scene) =>
      new Vegetable(scene, PlantType.TURNIP, 1),
    sellable: true,
    price: 100,
  },
  [ItemType.TOMATO]: {
    name: "Tomato",
    constructor: (scene: Phaser.Scene) =>
      new Vegetable(scene, PlantType.TOMATO, 1),
    sellable: true,
    price: 200,
  },
  [ItemType.CORN]: {
    name: "Corn",
    constructor: (scene: Phaser.Scene) =>
      new Vegetable(scene, PlantType.CORN, 1),
    sellable: true,
    price: 800,
  },
  [ItemType.CARROT]: {
    name: "Carrot",
    constructor: (scene: Phaser.Scene) =>
      new Vegetable(scene, PlantType.CARROT, 1),
    sellable: true,
    price: 400,
  },
};
