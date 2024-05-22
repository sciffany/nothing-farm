import { Constants } from "../constants";
import DayManager from "../managers/DayManager";
import MoneyManager from "../managers/MoneyManager";
import TileManager from "../managers/TileManager";
import ItemManager from "../managers/ItemManager";
import HouseManager from "../managers/HouseManager";

export default class MainGame extends Phaser.Scene {
  public itemManager?: ItemManager;
  public dayManager?: DayManager;
  public moneyManager?: MoneyManager;
  public tileManager?: TileManager;
  public houseManager?: HouseManager;

  constructor() {
    super({ key: "MainGame" });
  }

  preload() {
    // Load tilemap and tileset
    this.load.tilemapTiledJSON("tilemap", "assets/nothing_farm.json");
    this.load.spritesheet("houses", "assets/houses2.png", {
      frameWidth: Constants.TILESIZE * 4,
      frameHeight: Constants.TILESIZE * 4,
      margin: 1,
      spacing: 2,
    });
    this.load.image("all_tiles", "assets/all_tiles2.png");
    this.load.spritesheet("tools", "assets/tools.png", {
      frameWidth: Constants.TILESIZE,
      frameHeight: Constants.TILESIZE,
    });
    this.load.spritesheet("plants", "assets/plants.png", {
      frameWidth: Constants.TILESIZE,
      frameHeight: Constants.TILESIZE * 2,
    });
    this.load.spritesheet("all_tiles_sprite", "assets/all_tiles.png", {
      frameWidth: Constants.TILESIZE,
      frameHeight: Constants.TILESIZE,
    });
    this.load.image("marker", "assets/marker.png");
  }

  create() {
    this.itemManager = new ItemManager(this);
    this.dayManager = new DayManager(this);
    this.moneyManager = new MoneyManager(this);
    this.tileManager = new TileManager(this);
    this.houseManager = new HouseManager(this);

    // Draw game elements
    this.addCamera();
    this.drawBackground();
    this.itemManager.initialize();
    this.dayManager.initialize();
    this.houseManager.initialize();
    this.moneyManager.initialize();
    this.addInteraction();
  }

  private drawBackground() {
    const map = this.make.tilemap({
      key: "tilemap",
    });
    this.input.setDefaultCursor("url(assets/hand.cur), pointer");
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

    const houseLayer = map.createLayer("House", tileset);
    if (!houseLayer) return;
    houseLayer.scale = 2;
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
      if (
        pointer.middleButtonDown() ||
        (pointer.leftButtonDown() &&
          this.itemManager?.selectedItem?.name === "Travel")
      ) {
        this.input.on("pointermove", (pointer: any) => {
          this.cameras.main.scrollX -= pointer.x - pointer.prevPosition.x;
          this.cameras.main.scrollY -= pointer.y - pointer.prevPosition.y;
        });
      }

      this.input.on("pointerup", () => {
        this.input.off("pointermove");
      });
    });
  }

  private addInteraction() {
    // Add interaction
    this.input.on("pointerdown", (pointer: Phaser.Input.Pointer) => {
      const [tileX, tileY] = this.getTileCoordinates();
      if (tileX === 0) return;

      this.itemManager?.selectedItem?.use(tileX, tileY);
    });
  }

  private getTileCoordinates() {
    // Get mouse position and camera position
    const mouse = this.input.activePointer.position;
    const camera = this.cameras.main;
    const cameraX = camera.scrollX;
    const cameraY = camera.scrollY;

    // Get tile position
    const tileX = Math.floor((mouse.x + cameraX) / Constants.TILE_DISPLAY_SIZE);
    const tileY = Math.floor((mouse.y + cameraY) / Constants.TILE_DISPLAY_SIZE);

    return [tileX, tileY];
  }
}
