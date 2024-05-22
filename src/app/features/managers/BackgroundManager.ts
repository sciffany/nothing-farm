import { Constants } from "../constants";
import MainGame from "../scenes/mainGame";
import { HouseType } from "./HouseManager";

export class BackgroundManager {
  private scene: MainGame;
  private houseType: HouseType = HouseType.Farm;
  private sprites: Phaser.GameObjects.GameObject[] = [];
  private tileMaps: Phaser.Tilemaps.Tilemap[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(houseType: HouseType) {
    this.houseType = houseType;
    console.log(
      this.houseType,
      HouseType.Home,
      this.houseType == HouseType.Home
    );
    if (this.houseType == HouseType.Farm) {
      const map = this.scene.make.tilemap({
        key: "tilemap",
      });
      // https://github.com/sporadic-labs/tile-extruder
      const tileset = map.addTilesetImage(
        "all_tiles",
        "all_tiles",
        Constants.TILESIZE,
        Constants.TILESIZE,
        1,
        2
      );
      if (!tileset) return;

      const grassLayer = map.createLayer("Grass", tileset);
      if (!grassLayer) return;
      grassLayer.scale = 2;

      this.tileMaps.push(map);
    } else if (this.houseType == HouseType.Home) {
      const house = this.scene.add.image(
        Constants.TILE_DISPLAY_SIZE * 8,
        Constants.TILE_DISPLAY_SIZE * 4,
        "home"
      );
      house.setOrigin(0, 0);
      house.scale = 2;
      this.sprites.push(house);
    }
  }

  public destroy() {
    this.sprites.forEach((sprite) => sprite.destroy());
    this.tileMaps.forEach((tileMap) => tileMap.destroyLayer("Grass"));
  }
}
