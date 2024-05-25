import { ITEMS } from "./items";
import MainGame from "./scenes/mainGame";

export enum ClickableObjectType {
  NONE,
  SHIP_BOX,
}

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
  [objectType: number]: { frame: number; sprite: string };
} = {
  [PickupableObjectType.NONE]: {
    frame: 0,
    sprite: "none",
  },
  [PickupableObjectType.LOG]: {
    frame: 0,
    sprite: "log",
  },
  [PickupableObjectType.ROCK]: {
    frame: 0,
    sprite: "rock",
  },
  [PickupableObjectType.YELLOW_FLOWER]: {
    frame: 0,
    sprite: "flower",
  },
  [PickupableObjectType.TREE]: {
    frame: 0,
    sprite: "tree",
  },
};
