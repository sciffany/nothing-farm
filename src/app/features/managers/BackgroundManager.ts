import { Constants } from "../constants";
import { HouseType } from "../locations";
import MainGame from "../scenes/mainGame";

export class BackgroundManager {
  private scene: MainGame;
  private houseType: HouseType = HouseType.FARM;
  private sprites: Phaser.GameObjects.GameObject[] = [];
  private tileMaps: Phaser.Tilemaps.Tilemap[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(houseType: HouseType) {
    this.houseType = houseType;
    if (this.houseType == HouseType.FARM) {
      const map = this.scene.make.tilemap({
        key: "tilemap",
      });
      // https://github.com/sporadic-labs/tile-extruder
      const tileset = map.addTilesetImage(
        "all_tiles2",
        "all_tiles2",
        Constants.TILESIZE,
        Constants.TILESIZE
      );
      if (!tileset) return;

      const grassLayer = map.createLayer("Grass", tileset);
      if (!grassLayer) return;
      grassLayer.scale = 2;

      this.tileMaps.push(map);
    } else if (this.houseType == HouseType.HOME) {
      const house = this.scene.add.image(
        Constants.TILE_DISPLAY_SIZE * 8,
        Constants.TILE_DISPLAY_SIZE * 4,
        "home"
      );
      house.setOrigin(0, 0);
      house.scale = 2;
      this.sprites.push(house);
    } else if (this.houseType == HouseType.MARKET) {
      const market = this.scene.add.image(0, 0, "market");
      market.setOrigin(0, 0);
      this.sprites.push(market);
    } else if (this.houseType == HouseType.BARN) {
      const barn = this.scene.add.image(
        Constants.TILE_DISPLAY_SIZE * 8,
        Constants.TILE_DISPLAY_SIZE * 4,
        "barn"
      );
      barn.setOrigin(0, 0);
      barn.scale = 2;
      this.sprites.push(barn);
    } else if (this.houseType == HouseType.WEST) {
      const map = this.scene.make.tilemap({
        key: "west_side",
      });
      const tileset = map.addTilesetImage(
        "all_tiles2",
        "all_tiles2",
        Constants.TILESIZE,
        Constants.TILESIZE
      );
      if (!tileset) return;
      const grassLayer = map.createLayer("Grass", tileset);
      if (!grassLayer) return;
      grassLayer.scale = 2;

      this.tileMaps.push(map);
    }
  }

  public destroy() {
    this.sprites.forEach((sprite) => sprite.destroy());
    this.tileMaps.forEach((tileMap) => tileMap.destroyLayer("Grass"));
    this.sprites = [];
    this.tileMaps = [];
  }
}
