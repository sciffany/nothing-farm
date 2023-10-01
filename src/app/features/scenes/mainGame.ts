import { Constants } from "../constants";
import ToolboxManager from "../managers/ToolboxManager";

export default class MainGame extends Phaser.Scene {
  private toolboxManager?: ToolboxManager;

  constructor() {
    super({ key: "MainGame" });
  }

  preload() {
    // Load tilemap and tileset
    this.load.tilemapTiledJSON("tilemap", "assets/nothing_farm.json");
    this.load.image("all_tiles", "assets/all_tiles2.png");
    this.load.spritesheet("tools", "assets/tools.png", {
      frameWidth: Constants.TILESIZE,
      frameHeight: Constants.TILESIZE,
    });
    this.load.spritesheet("all_tiles_sprite", "assets/all_tiles.png", {
      frameWidth: Constants.TILESIZE,
      frameHeight: Constants.TILESIZE,
    });
  }

  create() {
    this.toolboxManager = new ToolboxManager(this);
    // Draw game elements
    this.addCamera();
    this.drawBackground();
    this.toolboxManager.initialize();
    this.addInteraction();
  }

  private drawBackground() {
    const map = this.make.tilemap({
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

  private addInteraction() {
    // Add interaction
    this.input.on("pointerdown", (pointer: any) => {
      if (pointer.leftButtonDown()) {
        const [tileX, tileY] = this.getTileCoordinates();

        this.toolboxManager?.selectedTool?.use(tileX, tileY);
      }
    });
  }

  private getTileCoordinates() {
    // Get mouse position and camera position
    const mouse = this.input.mousePointer;
    const camera = this.cameras.main;
    const cameraX = camera.scrollX;
    const cameraY = camera.scrollY;

    // Get tile position
    const tileX = Math.floor((mouse.x + cameraX) / Constants.TILESIZE);
    const tileY = Math.floor((mouse.y + cameraY) / Constants.TILESIZE);

    return [tileX, tileY];
  }
}
