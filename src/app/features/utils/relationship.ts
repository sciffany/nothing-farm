import { Constants, Layer } from "../constants";
import { RELATIONSHIP_TOTAL } from "../managers/PropertyManager";

export function drawRelationshipBar(
  baseBar: Phaser.GameObjects.Image,
  newBar: Phaser.GameObjects.Image,
  relationship: number
) {
  const level = Math.floor(relationship / RELATIONSHIP_TOTAL);
  const remainder = relationship % RELATIONSHIP_TOTAL;

  baseBar.displayWidth = Constants.TILE_DISPLAY_SIZE * 4;
  baseBar.tint = RELATIONSHIP_COLORS[level];

  newBar.displayWidth =
    Constants.TILE_DISPLAY_SIZE * 4 * (remainder / RELATIONSHIP_TOTAL);
  newBar.tint = RELATIONSHIP_COLORS[level + 1];
}

const RELATIONSHIP_COLORS: {
  [key: number]: number;
} = {
  0: 0x000000,
  1: 0xfbf2c4,
  2: 0xe5c185,
  3: 0xe0a278,
  4: 0xdb836b,
  5: 0xc7522a,
  6: 0x642915,
};
