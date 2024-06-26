import { PlantType } from "../items/Seed";
import { PropertyType } from "../locations";
import { ItemType, PickupableObjectType } from "../objects";
import { TilePlantStage, TileType } from "./TileManager";

export type SaveType = {
  currentLocation: string;
  currentPropertyId: string;
  money: number;
  day: number;
  items: {
    itemType: ItemType;
    quantity: number;
  }[];
  mailContents: PropertyType[];
  tiles: {
    [locationType: string]: {
      [x: number]: {
        [y: number]: {
          type: TileType;
          plantType: PlantType;
          plantStage: TilePlantStage;
          objectType: PickupableObjectType;
          propertyId: string;
          propertyType: PropertyType;
          propertyStage: number;
          tileStart?: {
            x: number;
            y: number;
          };
        };
      };
      scrollX: number;
      scrollY: number;
    };
  };
  properties: {
    [propertyId: string]: {
      occupants: {
        propertyId: string;
        firstName: string;
        lastName: string;
        mbti: string;
        favoriteItems: ItemType[];
      }[];
    };
  };
};
