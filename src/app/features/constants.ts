import { isMobile } from "react-device-detect";

export const Constants = {
  WIDTH: isMobile ? 32 * 18 : 32 * 24, // 768
  HEIGHT: isMobile ? 32 * 8 : 32 * 12, // 512
  TILESIZE: 16,
  TILE_DISPLAY_SIZE: 32,
  MAP_WIDTH: 30,
  MAP_HEIGHT: 20,
  NUM_TILES_Y: isMobile ? 8 : 12,
  NUM_TILES_X: isMobile ? 18 : 24,
  MAX_ITEMS: 16,
};

export enum Layer {
  BACKGROUND,
  TILES,
  UI,
  DIALOGUE,
}
