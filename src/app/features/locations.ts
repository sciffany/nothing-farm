import { DialogueType } from "./dialogues";
import { ClickableObjectType } from "./objects";
import { TransactionGroup } from "./transactionGroups";

export enum HouseType {
  FARM,
  HOME,
  BARN,
  MARKET,
  NEIGHBOR,
  WEST,
}

export const LOCATIONS = {
  [HouseType.FARM]: {
    dialogue: DialogueType.NONE,
    transaction: TransactionGroup.NONE,
    objects: {
      [ClickableObjectType.SHIP_BOX]: {
        location: { x: 6, y: 6 },
        spriteFrame: 0,
      },
    },
    houses: {
      [HouseType.HOME]: {
        location: { x: 1, y: 3 },
        spriteFrame: 0,
      },
      [HouseType.BARN]: {
        location: { x: 6, y: 0 },
        spriteFrame: 1,
      },
      [HouseType.MARKET]: {
        location: { x: 22, y: 8 },
        spriteFrame: 2,
      },
      [HouseType.WEST]: {
        location: { x: 2, y: 13 },
        spriteFrame: -1,
      },
    },
  },
  [HouseType.HOME]: {
    dialogue: DialogueType.NONE,
    transaction: TransactionGroup.NONE,
    objects: {},
    houses: {
      [HouseType.FARM]: {
        location: { x: 8 + 2, y: 4 + 5 },
        spriteFrame: -1,
      },
    },
  },
  [HouseType.BARN]: {
    dialogue: DialogueType.NONE,
    transaction: TransactionGroup.NONE,
    objects: {},
    houses: {
      [HouseType.FARM]: {
        location: { x: 8 + 2, y: 4 + 5 },
        spriteFrame: -1,
      },
    },
  },
  [HouseType.MARKET]: {
    dialogue: DialogueType.MARKET_WELCOME,
    transaction: TransactionGroup.NONE,
    objects: {},
    houses: {
      [HouseType.FARM]: {
        location: { x: 10, y: 8 },
        spriteFrame: -1,
      },
    },
  },
  [HouseType.NEIGHBOR]: {
    objects: {},
    dialogue: DialogueType.NONE,
    transaction: TransactionGroup.NONE,
    houses: {},
  },
  [HouseType.WEST]: {
    objects: {},
    dialogue: DialogueType.NONE,
    transaction: TransactionGroup.NONE,
    houses: {
      [HouseType.FARM]: {
        location: { x: 30 - 2, y: 13 },
        spriteFrame: -1,
      },
    },
  },
};
