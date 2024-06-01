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
      money: 300,
      log: 20,
      rock: 20,
      days: 4,
    },
    people: 2,
  },
  [PropertyType.HOSPITAL]: {
    color: 0x00ffff,
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
      log: 20,
      rock: 20,
      days: 0,
    },
    people: 2,
  },
  [PropertyType.PLAYGROUND]: {
    color: 0xff00ff,
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
      log: 20,
      rock: 20,
      days: 0,
    },
    people: 2,
  },
  [PropertyType.RESTAURANT]: {
    color: 0x00ffff,
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
      log: 20,
      rock: 20,
      days: 0,
    },
    people: 2,
  },
  [PropertyType.MALL]: {
    color: 0xff00ff,
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
      log: 20,
      rock: 20,
      days: 0,
    },
    people: 2,
  },
  [PropertyType.BOOKSTORE]: {
    color: 0xffffff,
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
      log: 20,
      rock: 20,
      days: 0,
    },
    people: 2,
  },
};
