import { Constants } from "../constants";

export default class MainGame extends Phaser.Scene {
  private container: Phaser.GameObjects.Container | null;

  constructor() {
    super({ key: "MainGame" });
    this.container = null;
  }

  preload() {
    // Load tilemap and tileset
    this.load.tilemapTiledJSON("tilemap", "assets/nothing_farm.json");
    this.load.image("all_tiles", "assets/all_tiles2.png");
  }

  create() {
    // Draw game elements
    this.addCamera();
    this.drawBackground();
    
    
  }

  update() {
   

  }

  private drawBackground() {
    const map = this.make.tilemap({
      key: "tilemap",
    });
    // https://github.com/sporadic-labs/tile-extruder
    const tileset = map.addTilesetImage("all_tiles", "all_tiles", Constants.TILESIZE, Constants.TILESIZE, 1, 2);
    if (!tileset) return;
    
    const grassLayer = map.createLayer("Grass", tileset);
    const houseLayer = map.createLayer("House", tileset);
    if (!grassLayer || !houseLayer) return;
  }

  private addCamera() {
    // Set camera bounds
    this.cameras.main.setBounds(
      0,
      0,
      Constants.WIDTH * Constants.TILESIZE,
      Constants.HEIGHT * Constants.TILESIZE
    );
    
    // Make camera draggable
    this.input.on("pointerdown", (pointer: any) => {
      if (pointer.leftButtonDown) {
        this.input.on("pointermove", (pointer: any) => {
          this.cameras.main.scrollX -= pointer.velocity.x / 10;
          this.cameras.main.scrollY -= pointer.velocity.y / 10;
        });
      }

      this.input.on("pointerup", () => {
        this.input.off("pointermove");
      });
    });
  }
}
