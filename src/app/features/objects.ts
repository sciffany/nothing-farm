import Axe from "./items/Axe";
import PickupableObject from "./items/PickupableObject";
import { PlantType } from "./items/Seed";
import Vegetable from "./items/Vegetable";
import MainGame from "./scenes/mainGame";
import Hand from "./items/Hand";
import Hoe from "./items/Hoe";
import Seed from "./items/Seed";
import Travel from "./items/Travel";
import WateringCan from "./items/WateringCan";
import Item from "./items/Item";
import Hammer from "./items/Hammer";
import Animal from "./items/Animal";

export enum ClickableObjectType {
  NONE,
  SHIP_BOX,
}

export enum AnimalType {
  COW,
  PIG,
  CHICKEN,
  SHEEP,
  NONE,
}

export enum ItemType {
  NONE,
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
  AXE,
  HAMMER,
  LOG,
  ROCK,
  YELLOW_FLOWER,
  COW,
  PIG,
  CHICKEN,
  SHEEP,
}

export const ITEMS: {
  [key in ItemType]: {
    name: string;
    constructor: (scene: MainGame) => Item;
    sellable: boolean;
    price: number;
  };
} = {
  [ItemType.HOE]: {
    name: "Hoe",
    constructor: (scene: MainGame) => new Hoe(scene),
    sellable: false,
    price: 0,
  },
  [ItemType.TRAVEL]: {
    name: "Travel",
    constructor: (scene: MainGame) => new Travel(scene),
    sellable: false,
    price: 0,
  },
  [ItemType.WATERING_CAN]: {
    name: "Watering Can",
    constructor: (scene: MainGame) => new WateringCan(scene, 45),
    sellable: false,
    price: 0,
  },
  [ItemType.HAND]: {
    name: "Hand",
    constructor: (scene: MainGame) => new Hand(scene),
    sellable: false,
    price: 0,
  },
  [ItemType.TURNIP_SEEDS]: {
    name: "Turnip Seeds",
    constructor: (scene: MainGame) => new Seed(scene, PlantType.TURNIP, 1),
    sellable: true,
    price: 20,
  },
  [ItemType.TOMATO_SEEDS]: {
    name: "Tomato Seeds",
    constructor: (scene: MainGame) => new Seed(scene, PlantType.TOMATO, 1),
    sellable: true,
    price: 40,
  },
  [ItemType.CORN_SEEDS]: {
    name: "Corn Seeds",
    constructor: (scene: MainGame) => new Seed(scene, PlantType.CORN, 1),
    sellable: true,
    price: 100,
  },
  [ItemType.CARROT_SEEDS]: {
    name: "Carrot Seeds",
    constructor: (scene: MainGame) => new Seed(scene, PlantType.CARROT, 1),
    sellable: true,
    price: 60,
  },
  [ItemType.TURNIP]: {
    name: "Turnip",
    constructor: (scene: MainGame) => new Vegetable(scene, PlantType.TURNIP, 1),
    sellable: true,
    price: 100,
  },
  [ItemType.TOMATO]: {
    name: "Tomato",
    constructor: (scene: MainGame) => new Vegetable(scene, PlantType.TOMATO, 1),
    sellable: true,
    price: 200,
  },
  [ItemType.CORN]: {
    name: "Corn",
    constructor: (scene: MainGame) => new Vegetable(scene, PlantType.CORN, 1),
    sellable: true,
    price: 800,
  },
  [ItemType.CARROT]: {
    name: "Carrot",
    constructor: (scene: MainGame) => new Vegetable(scene, PlantType.CARROT, 1),
    sellable: true,
    price: 400,
  },
  [ItemType.AXE]: {
    name: "Axe",
    constructor: (scene: MainGame) => new Axe(scene),
    sellable: false,
    price: 0,
  },
  [ItemType.LOG]: {
    name: "Log",
    constructor: (scene: MainGame) =>
      new PickupableObject(scene, PickupableObjectType.LOG, 1),
    sellable: true,
    price: 10,
  },
  [ItemType.ROCK]: {
    name: "Rock",
    constructor: (scene: MainGame) =>
      new PickupableObject(scene, PickupableObjectType.ROCK, 1),
    sellable: true,
    price: 20,
  },
  [ItemType.NONE]: {
    name: "None",
    constructor: (scene: MainGame) =>
      new PickupableObject(scene, PickupableObjectType.NONE, 1),
    sellable: false,
    price: 0,
  },
  [ItemType.YELLOW_FLOWER]: {
    name: "Yellow Flower",
    constructor: (scene: MainGame) =>
      new PickupableObject(scene, PickupableObjectType.YELLOW_FLOWER, 1),
    sellable: true,
    price: 5,
  },
  [ItemType.HAMMER]: {
    name: "Hammer",
    constructor: (scene: MainGame) => new Hammer(scene),
    sellable: false,
    price: 0,
  },
  [ItemType.COW]: {
    name: "Cow",
    constructor: (scene: MainGame) => new Animal(scene, AnimalType.COW, 1),
    sellable: true,
    price: 500,
  },
  [ItemType.PIG]: {
    name: "Pig",
    constructor: (scene: MainGame) => new Animal(scene, AnimalType.PIG, 1),
    sellable: true,
    price: 300,
  },
  [ItemType.CHICKEN]: {
    name: "Chicken",
    constructor: (scene: MainGame) => new Animal(scene, AnimalType.CHICKEN, 1),
    sellable: true,
    price: 100,
  },
  [ItemType.SHEEP]: {
    name: "Sheep",
    constructor: (scene: MainGame) => new Animal(scene, AnimalType.SHEEP, 1),
    sellable: true,
    price: 400,
  },
};

export const CLICKABLE_OBJECTS: {
  [objectType: number]: { action: (scene: MainGame) => void };
} = {
  [ClickableObjectType.NONE]: {
    action: (scene: MainGame) => {},
  },
  [ClickableObjectType.SHIP_BOX]: {
    action: (scene: MainGame) => {
      const itemType = scene.itemManager.selectedItem?.getType();
      if (!itemType) return;
      const item = ITEMS[itemType];
      if (
        item.sellable &&
        scene.itemManager.selectedItem?.quantity &&
        scene.itemManager.selectedItem?.quantity >= 0
      ) {
        scene.itemManager.removeItem(scene.itemManager.selectedItem!);
        scene.moneyManager.addMoney(item.price);
      }
    },
  },
};

export enum PickupableObjectType {
  LOG,
  ROCK,
  YELLOW_FLOWER,
  TREE,
  NONE,
}

export const PICKUPABLE_OBJECTS: {
  [objectType: number]: {
    frame: number;
    sprite: string;
    name: string;
    itemType: ItemType;
  };
} = {
  [PickupableObjectType.NONE]: {
    frame: 0,
    sprite: "none",
    name: "None",
    itemType: ItemType.NONE,
  },
  [PickupableObjectType.LOG]: {
    frame: 0,
    sprite: "log",
    name: "Log",
    itemType: ItemType.LOG,
  },
  [PickupableObjectType.ROCK]: {
    frame: 0,
    sprite: "rock",
    name: "Rock",
    itemType: ItemType.ROCK,
  },
  [PickupableObjectType.YELLOW_FLOWER]: {
    frame: 0,
    sprite: "flower",
    name: "Yellow Flower",
    itemType: ItemType.YELLOW_FLOWER,
  },
  [PickupableObjectType.TREE]: {
    frame: 0,
    sprite: "tree",
    name: "Tree",
    itemType: ItemType.NONE,
  },
};

export const ANIMALS = {
  [AnimalType.NONE]: {
    name: "None",
    sprite: "none",
    frame: 0,
    itemType: ItemType.NONE,
  },
  [AnimalType.COW]: {
    name: "Cow",
    sprite: "cow",
    frame: 0,
    itemType: ItemType.COW,
  },
  [AnimalType.PIG]: {
    name: "Pig",
    sprite: "pig",
    frame: 0,
    itemType: ItemType.PIG,
  },
  [AnimalType.CHICKEN]: {
    name: "Chicken",
    sprite: "chicken",
    frame: 0,
    itemType: ItemType.CHICKEN,
  },
  [AnimalType.SHEEP]: {
    name: "Sheep",
    sprite: "sheep",
    frame: 0,
    itemType: ItemType.SHEEP,
  },
};
