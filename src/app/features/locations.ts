import nothingFarmJson from "../../../public/assets/nothing_farm.json";
import westSideJson from "../../../public/assets/west_side.json";

export enum LocationType {
  FARM,
  WEST,
}

export const LOCATIONS = {
  [LocationType.FARM]: {
    key: "tilemap",
    json: nothingFarmJson,
  },
  [LocationType.WEST]: {
    key: "west_side",
    json: westSideJson,
  },
};

export enum PropertyType {
  OUTSIDE,
  HOME,
  BARN,
  SEED_MARKET,
  RANCH,
  SMALL_HOUSE,
}

export enum PropertySubType {
  RESIDENTIAL,
  COMMERCIAL,
  SCHOOL,
}

export const MAILBOX: { [day: string]: PropertyType[] } = {
  1: [PropertyType.HOME, PropertyType.SEED_MARKET, PropertyType.SMALL_HOUSE],
  2: [PropertyType.BARN, PropertyType.SMALL_HOUSE, PropertyType.SMALL_HOUSE],
  3: [
    PropertyType.SMALL_HOUSE,
    PropertyType.SMALL_HOUSE,
    PropertyType.SMALL_HOUSE,
  ],
  4: [PropertyType.RANCH, PropertyType.SMALL_HOUSE],
  5: [PropertyType.SMALL_HOUSE, PropertyType.SMALL_HOUSE],
  6: [PropertyType.SMALL_HOUSE, PropertyType.SMALL_HOUSE],
  10: [PropertyType.SMALL_HOUSE],
};

export const FIRST_NAMES = [
  "Ariel",
  "Benjamin",
  "Charles",
  "Dyane",
  "Evangeline",
  "Finn",
  "Grace",
  "Hank",
  "Ivy",
  "Jack",
  "Kathryn",
  "Liam",
  "Mia",
  "Nate",
  "Olivia",
  "Penny",
  "Quinn",
  "Rachel",
  "Sara",
  "Tom",
  "Uma",
  "Violet",
  "Will",
  "Xander",
  "Yara",
  "Zoe",
];

export const MBTI = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
];

export const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Brown",
  "Taylor",
  "Anderson",
  "Harris",
  "Clark",
  "Lewis",
  "Lee",
  "Walker",
  "Hall",
  "Allen",
  "Young",
  "Hernandez",
  "King",
  "Wright",
  "Lopez",
  "Hill",
  "Scott",
  "Green",
  "Adams",
  "Baker",
  "Gonzalez",
  "Nelson",
];

export const PROPERTIES: {
  [key in PropertyType]: {
    color: number;
    name: string;
    subType: PropertySubType;
    sprite: string;
    frame: number;
    interiorChoices: {
      sprite: string;
      frame: number;
    }[];
    cost: {
      money: number;
      log: number;
      rock: number;
      days: number;
    };
    people: number;
  };
} = {
  [PropertyType.OUTSIDE]: {
    color: 0x000000,
    name: "Outside",
    subType: PropertySubType.RESIDENTIAL,
    sprite: "houses",
    frame: 0,
    interiorChoices: [],
    cost: {
      money: 0,
      log: 0,
      rock: 0,
      days: 0,
    },
    people: 0,
  },
  [PropertyType.HOME]: {
    color: 0x00ff00,
    name: "Home",
    subType: PropertySubType.RESIDENTIAL,
    sprite: "houses",
    frame: 0,
    interiorChoices: [
      {
        sprite: "home",
        frame: 0,
      },
    ],
    cost: {
      money: 0,
      log: 1,
      rock: 1,
      days: 0,
    },
    people: 0,
  },
  [PropertyType.BARN]: {
    color: 0xff0000,
    name: "Barn",
    subType: PropertySubType.RESIDENTIAL,
    sprite: "houses",
    frame: 1,
    interiorChoices: [
      {
        sprite: "barnInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 300,
      log: 10,
      rock: 5,
      days: 2,
    },
    people: 0,
  },
  [PropertyType.SMALL_HOUSE]: {
    color: 0x0000ff,
    name: "Small House",
    subType: PropertySubType.RESIDENTIAL,
    sprite: "houses",
    frame: 2,
    interiorChoices: [
      {
        sprite: "houseInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 100,
      log: 5,
      rock: 5,
      days: 0,
    },
    people: 4,
  },
  [PropertyType.SEED_MARKET]: {
    color: 0xffff00,
    name: "Seed Market",
    subType: PropertySubType.COMMERCIAL,
    sprite: "houses",
    frame: 3,
    interiorChoices: [
      {
        sprite: "marketInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 200,
      log: 5,
      rock: 5,
      days: 0,
    },
    people: 4,
  },
  [PropertyType.RANCH]: {
    color: 0xff00ff,
    name: "Ranch",
    subType: PropertySubType.COMMERCIAL,
    sprite: "houses",
    frame: 1,
    interiorChoices: [
      {
        sprite: "marketInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 500,
      log: 20,
      rock: 20,
      days: 4,
    },
    people: 2,
  },
};

// export const LOCATIONS: {
//   [key in HouseType]: {
//     dialogue: DialogueType;
//     transaction: TransactionGroup;
//     objects: {
//       [key in ClickableObjectType]?: {
//         location: { x: number; y: number };
//         spriteFrame: number;
//       };
//     };
//     houses: {
//       [key in HouseType]?: {
//         location: { x: number; y: number };
//         spriteFrame: number;
//         label?: string;
//       };
//     };
//   };
// } = {
//   [HouseType.FARM]: {
//     dialogue: DialogueType.NONE,
//     transaction: TransactionGroup.NONE,
//     objects: {
//       [ClickableObjectType.SHIP_BOX]: {
//         location: { x: 6, y: 6 },
//         spriteFrame: 0,
//       },
//     },
//     houses: {
//       [HouseType.HOME]: {
//         location: { x: 1, y: 3 },
//         spriteFrame: 0,
//       },
//       [HouseType.BARN]: {
//         location: { x: 6, y: 0 },
//         spriteFrame: 1,
//       },
//       [HouseType.MARKET]: {
//         location: { x: 22, y: 8 },
//         spriteFrame: 2,
//         label: "",
//       },
//       [HouseType.WEST]: {
//         location: { x: 2, y: 13 },
//         spriteFrame: -1,
//         label: "To West",
//       },
//     },
//   },
//   [HouseType.HOME]: {
//     dialogue: DialogueType.NONE,
//     transaction: TransactionGroup.NONE,
//     objects: {},
//     houses: {
//       [HouseType.FARM]: {
//         location: { x: 8 + 2, y: 4 + 5 },
//         spriteFrame: -1,
//         label: "To Farm",
//       },
//     },
//   },
//   [HouseType.BARN]: {
//     dialogue: DialogueType.NONE,
//     transaction: TransactionGroup.NONE,
//     objects: {},
//     houses: {
//       [HouseType.FARM]: {
//         location: { x: 8 + 2, y: 4 + 5 },
//         spriteFrame: -1,
//         label: "To Farm",
//       },
//     },
//   },
//   [HouseType.MARKET]: {
//     dialogue: DialogueType.MARKET_WELCOME,
//     transaction: TransactionGroup.NONE,
//     objects: {},
//     houses: {
//       [HouseType.FARM]: {
//         location: { x: 10, y: 8 },
//         spriteFrame: -1,
//         label: "To Farm",
//       },
//     },
//   },
//   [HouseType.NEIGHBOR]: {
//     objects: {},
//     dialogue: DialogueType.NONE,
//     transaction: TransactionGroup.NONE,
//     houses: {},
//   },
//   [HouseType.WEST]: {
//     objects: {},
//     dialogue: DialogueType.NONE,
//     transaction: TransactionGroup.NONE,
//     houses: {
//       [HouseType.FARM]: {
//         location: { x: 30 - 2, y: 13 },
//         spriteFrame: -1,
//         label: "To Farm",
//       },
//     },
//   },
// };
