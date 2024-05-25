import { ITEMS } from "./items";
import MainGame from "./scenes/mainGame";

export enum ObjectType {
  NONE,
  SHIP_BOX,
}

export const OBJECTS: {
  [objectType: number]: { action: (scene: MainGame) => void };
} = {
  [ObjectType.NONE]: {
    action: (scene: MainGame) => {},
  },
  [ObjectType.SHIP_BOX]: {
    action: (scene: MainGame) => {
      const itemType = scene.itemManager.selectedItem?.getType();
      if (!itemType) return;
      const item = ITEMS[itemType];
      if (item.sellable) {
        scene.itemManager.removeItem(scene.itemManager.selectedItem!);
        scene.itemManager.selectedItem = null;
        scene.moneyManager.addMoney(item.price);
      }
    },
  },
};
