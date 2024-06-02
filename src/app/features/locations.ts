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
  HOSPITAL,
  PLAYGROUND,
  RESTAURANT,
  MALL,
  BOOKSTORE,
  MUSEUM,
}

export enum PropertySubType {
  RESIDENTIAL,
  COMMERCIAL,
  SCHOOL,
  HOSPITAL,
  PLAYGROUND,
  RESTAURANT,
  MALL,
  BOOKSTORE,
  MUSEUM,
}

export const FIRST_NAMES = [
  "Ariel",
  "Benjamin",
  "Charles",
  "Dyane",
  "Emily",
  "Ferb",
  "Gwyneth",
  "Hannah",
  "Ivy",
  "Jasmine",
  "Kevin",
  "Liam",
  "Maxine",
  "Nathaniel",
  "Olivia",
  "Pamela",
  "Quinn",
  "Rachel",
  "Sara",
  "Tom",
  "Ursula",
  "Violet",
  "Wayne",
  "Xander",
  "Yentin",
  "Zendaya",
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
    serviceText?: string;
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
    color: 0xc45161,
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
      log: 0,
      rock: 0,
      days: 0,
    },
    people: 0,
  },
  [PropertyType.BARN]: {
    color: 0xe094a0,
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
    color: 0xf2b6c0,
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
      money: 0,
      log: 0,
      rock: 0,
      days: 1,
    },
    people: 4,
  },
  [PropertyType.SEED_MARKET]: {
    color: 0xf2dde1,
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
      days: 1,
    },
    people: 2,
    serviceText: "Buy Seeds",
  },
  [PropertyType.RANCH]: {
    color: 0xf2dde1,
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
      money: 300,
      log: 5,
      rock: 5,
      days: 3,
    },
    people: 2,
    serviceText: "Buy Animals",
  },
  [PropertyType.HOSPITAL]: {
    color: 0xcbc7d8,
    name: "Hospital",
    subType: PropertySubType.HOSPITAL,
    sprite: "hospital",
    frame: 0,
    interiorChoices: [
      {
        sprite: "hospitalInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 200,
      log: 6,
      rock: 4,
      days: 2,
    },
    people: 2,
    serviceText: "Heal",
  },
  [PropertyType.PLAYGROUND]: {
    color: 0xe4aeb4,
    name: "Playground",
    subType: PropertySubType.PLAYGROUND,
    sprite: "playground",
    frame: 0,
    interiorChoices: [
      {
        sprite: "playgroundInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 200,
      log: 8,
      rock: 4,
      days: 1,
    },
    people: 2,
    serviceText: "Play",
  },
  [PropertyType.RESTAURANT]: {
    color: 0x8db7d2,
    name: "Restaurant",
    subType: PropertySubType.RESTAURANT,
    sprite: "restaurant",
    frame: 0,
    interiorChoices: [
      {
        sprite: "restaurantInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 200,
      log: 6,
      rock: 6,
      days: 1,
    },
    people: 2,
    serviceText: "Cook",
  },
  [PropertyType.MALL]: {
    color: 0x5e62a9,
    name: "Mall",
    subType: PropertySubType.MALL,
    sprite: "mall",
    frame: 0,
    interiorChoices: [
      {
        sprite: "mallInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 400,
      log: 10,
      rock: 4,
      days: 3,
    },
    people: 2,
    serviceText: "Shop",
  },
  [PropertyType.BOOKSTORE]: {
    color: 0x434279,
    name: "Bookstore",
    subType: PropertySubType.BOOKSTORE,
    sprite: "bookstore",
    frame: 0,
    interiorChoices: [
      {
        sprite: "bookstoreInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 100,
      log: 4,
      rock: 8,
      days: 2,
    },
    people: 2,
    serviceText: "Buy Books",
  },
  [PropertyType.MUSEUM]: {
    color: 0xf1cdd2,
    name: "Museum",
    subType: PropertySubType.MUSEUM,
    sprite: "museum",
    frame: 0,
    interiorChoices: [
      {
        sprite: "museumInterior",
        frame: 0,
      },
    ],
    cost: {
      money: 300,
      log: 8,
      rock: 6,
      days: 3,
    },
    people: 2,
    serviceText: "Donate",
  },
};
