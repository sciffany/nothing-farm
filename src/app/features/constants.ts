import { isMobile } from "react-device-detect";

export const Constants = {
  WIDTH: isMobile ? 32 * 20 : 32 * 24, // 768
  HEIGHT: isMobile ? 32 * 8 : 32 * 12, // 512
  TILESIZE: 16,
  TILE_DISPLAY_SIZE: 32,
  MAP_WIDTH: 30,
  MAP_HEIGHT: 60,
  NUM_TILES_Y: isMobile ? 8 : 12,
  NUM_TILES_X: isMobile ? 20 : 24,
  MAX_ITEMS: 16,
  INITIAL_MONEY: 1000,
  TEXT_PROPS: {
    fontSize: "12px",
    fontFamily: "DePixelSchmal",
    color: "#000000",
  },
};

export enum Layer {
  BACKGROUND,
  TILES_PRESS,
  PROPERTIES,
  BUILD_PRESS,
  UI,
  DIALOGUE,
  APPRECIATION,
}
