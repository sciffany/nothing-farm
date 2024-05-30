import { Constants } from "../constants";
import { PROPERTIES, PropertyType } from "../locations";
import MainGame from "../scenes/mainGame";

export default class PropertyManager {
  public properties: {
    [propertyId: string]: {
      propertyType: PropertyType;
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
      occupantIds: [],
    };
  }

  public open(propertyId: string) {
    const propertyType = this.properties[propertyId].propertyType;
    const property = PROPERTIES[propertyType];
    const interior = this.scene.add.sprite(
      Constants.TILE_DISPLAY_SIZE * 6,
      Constants.TILE_DISPLAY_SIZE * 2,
      property.interiorChoices[0].sprite,
      property.interiorChoices[0].frame
    );

    interior.setScale(2);
    interior.setOrigin(0, 0);
    interior.setInteractive();
  }
}
