import { PropertyType } from "../locations";
import MainGame from "../scenes/mainGame";

export default class PropertyManager {
  public properties: {
    [propertyId: string]: {
      propertyType: PropertyType;
      propertyStage: number;
      occupantIds: string[];
    };
  } = {};
  private scene: MainGame;
  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public addProperty({
    propertyId,
    propertyType,
  }: {
    propertyId: string;
    propertyType: PropertyType;
  }) {
    this.properties[propertyId] = {
      propertyType,
      propertyStage: 0,
      occupantIds: [],
    };
  }
}
