import { DialogueType } from "./dialogues";
import { TransactionGroup } from "./transactionGroups";

export enum HouseType {
  FARM,
  HOME,
  BARN,
  MARKET,
  NEIGHBOR,
}

export const LOCATIONS = {
  [HouseType.FARM]: {
    dialogue: DialogueType.WELCOME,
    transaction: TransactionGroup.NONE,
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
    },
  },
  [HouseType.HOME]: {
    dialogue: DialogueType.NONE,
    transaction: TransactionGroup.NONE,
    houses: {
      [HouseType.FARM]: {
        location: { x: 8 + 2, y: 4 + 4 },
        spriteFrame: -1,
      },
    },
  },
  [HouseType.BARN]: {
    dialogue: DialogueType.NONE,
    transaction: TransactionGroup.NONE,
    houses: {},
  },
  [HouseType.MARKET]: {
    dialogue: DialogueType.MARKET_WELCOME,
    transaction: TransactionGroup.NONE,
    houses: {
      [HouseType.FARM]: {
        location: { x: 10, y: 8 },
        spriteFrame: -1,
      },
    },
  },
  [HouseType.NEIGHBOR]: {
    dialogue: DialogueType.NONE,
    transaction: TransactionGroup.NONE,
    houses: {},
  },
};
