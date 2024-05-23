import { Constants } from "../constants";
import DayManager from "../managers/DayManager";
import MoneyManager from "../managers/MoneyManager";
import TileManager from "../managers/TileManager";
import ItemManager from "../managers/ItemManager";
import HouseManager, { HouseType } from "../managers/HouseManager";
import { BackgroundManager } from "../managers/BackgroundManager";

export default class MainGame extends Phaser.Scene {
  public itemManager: ItemManager;
  public dayManager: DayManager;
  public moneyManager: MoneyManager;
  public tileManager: TileManager;
  public houseManager: HouseManager;
  public backgroundManager: BackgroundManager;
  public currLoc: HouseType = HouseType.Farm;

  constructor() {
    super({ key: "MainGame" });
    this.backgroundManager = new BackgroundManager(this);
    this.houseManager = new HouseManager(this);
    this.itemManager = new ItemManager(this);
    this.dayManager = new DayManager(this);
    this.moneyManager = new MoneyManager(this);
    this.tileManager = new TileManager(this);
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
    this.load.image("market", "assets/market4.png");
    this.load.image("home", "assets/home.png");
    this.load.image("all_tiles", "assets/all_tilesx2_2.png");
    this.load.spritesheet("tools", "assets/tools2.png", {
      frameWidth: Constants.TILESIZE * 2,
      frameHeight: Constants.TILESIZE * 2,
    });
    this.load.spritesheet("plants", "assets/plants.png", {
      frameWidth: Constants.TILESIZE * 2,
      frameHeight: Constants.TILESIZE * 4,
    });
    this.load.spritesheet("all_tiles_sprite", "assets/all_tilesx2_2.png", {
      frameWidth: Constants.TILESIZE * 2,
      frameHeight: Constants.TILESIZE * 2,
      margin: 1,
      spacing: 2,
    });
    this.load.image("marker", "assets/marker.png");
  }

  create() {
    // Draw game elements
    this.input.setDefaultCursor("url(assets/hand.cur), pointer");
    this.addCamera();
    this.backgroundManager.initialize(HouseType.Farm);
    this.houseManager.initialize(HouseType.Farm);
    this.tileManager.initialize(HouseType.Farm);
    this.itemManager.initialize();
    this.moneyManager.initialize();
    this.dayManager.initialize();
    this.addInteraction();
  }

  public changeLocation(houseType: HouseType) {
    this.currLoc = houseType;
    this.backgroundManager.destroy();
    this.backgroundManager.initialize(houseType);
    this.houseManager.destroy();
    this.houseManager.initialize(houseType);
    this.tileManager.destroy();
    this.tileManager.initialize(houseType);
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
