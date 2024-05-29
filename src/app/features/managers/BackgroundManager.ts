import { Constants } from "../constants";
import { LocationType } from "../locations";
import MainGame from "../scenes/mainGame";

export class BackgroundManager {
  private scene: MainGame;
  private locationType: LocationType = LocationType.FARM;
  private sprites: Phaser.GameObjects.GameObject[] = [];
  private tileMaps: Phaser.Tilemaps.Tilemap[] = [];

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(locationType: LocationType) {
    const map = this.scene.make.tilemap({
      key: "tilemap",
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

  public destroy() {
    this.sprites.forEach((sprite) => sprite.destroy());
    this.tileMaps.forEach((tileMap) => tileMap.destroyLayer("Grass"));
    this.sprites = [];
    this.tileMaps = [];
  }
}
