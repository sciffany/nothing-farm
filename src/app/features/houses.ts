import { DialogueType } from "./dialogues";

export enum HouseType {
  Farm,
  Home,
  Barn,
  Market,
  Neighbor,
}

export const LOCATIONS = {
  [HouseType.Farm]: {
    dialogue: DialogueType.WELCOME,
    houses: {
      [HouseType.Home]: {
        location: { x: 1, y: 3 },
        spriteFrame: 0,
      },
      [HouseType.Barn]: {
        location: { x: 6, y: 0 },
        spriteFrame: 1,
      },
      [HouseType.Market]: {
        location: { x: 22, y: 8 },
        spriteFrame: 2,
      },
    },
  },
  [HouseType.Home]: {
    dialogue: DialogueType.NONE,
    houses: {
      [HouseType.Farm]: {
        location: { x: 8 + 2, y: 4 + 4 },
        spriteFrame: -1,
      },
    },
  },
  [HouseType.Barn]: {
    dialogue: DialogueType.NONE,
    houses: {},
  },
  [HouseType.Market]: {
    dialogue: DialogueType.MARKET_WELCOME,
    houses: {
      [HouseType.Farm]: {
        location: { x: 10, y: 8 },
        spriteFrame: -1,
      },
    },
  },
  [HouseType.Neighbor]: {
    dialogue: DialogueType.NONE,
    houses: {},
  },
};
