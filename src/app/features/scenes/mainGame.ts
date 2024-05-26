import { Constants } from "../constants";
import DayManager from "../managers/DayManager";
import MoneyManager from "../managers/MoneyManager";
import TileManager from "../managers/TileManager";
import ItemManager from "../managers/ItemManager";
import HouseManager from "../managers/HouseManager";
import { BackgroundManager } from "../managers/BackgroundManager";
import DialogueManager from "../managers/DialogueManager";
import { HouseType } from "../locations";
import TransactionManager from "../managers/TransactionManager";
import ObjectManager from "../managers/ObjectManager";
import EnergyManager from "../managers/EnergyManager";
import CameraManager from "../managers/CameraManager";
import { DialogueType } from "../dialogues";

export default class MainGame extends Phaser.Scene {
  public itemManager: ItemManager;
  public dayManager: DayManager;
  public moneyManager: MoneyManager;
  public tileManager: TileManager;
  public houseManager: HouseManager;
  public backgroundManager: BackgroundManager;
  public dialogueManager: DialogueManager;
  public transactionManager: TransactionManager;
  public cameraManager: CameraManager;
  public objectManager: ObjectManager;
  public energyManager: EnergyManager;
  public currLoc: HouseType = HouseType.FARM;

  constructor() {
    super({ key: "MainGame" });
    this.backgroundManager = new BackgroundManager(this);
    this.houseManager = new HouseManager(this);
    this.itemManager = new ItemManager(this);
    this.dayManager = new DayManager(this);
    this.moneyManager = new MoneyManager(this);
    this.tileManager = new TileManager(this);
    this.cameraManager = new CameraManager(this);
    this.dialogueManager = new DialogueManager(this);
    this.transactionManager = new TransactionManager(this);
    this.objectManager = new ObjectManager(this);
    this.energyManager = new EnergyManager(this);
  }

  preload() {
    // Load tilemap and tileset
    this.load.tilemapTiledJSON("tilemap", "assets/nothing_farm.json");
    this.load.tilemapTiledJSON("west_side", "assets/west_side.json");
    this.load.spritesheet("houses", "assets/houses2.png", {
      frameWidth: Constants.TILESIZE * 4,
      frameHeight: Constants.TILESIZE * 4,
      margin: 1,
      spacing: 2,
    });
    this.load.image("market", "assets/market4.png");
    this.load.image("home", "assets/home.png");
    this.load.image("all_tiles", "assets/all_tilesx2_2.png");
    this.load.image("all_tiles2", "assets/all_tiles.png");
    this.load.spritesheet("tools", "assets/tools2.png", {
      frameWidth: Constants.TILESIZE * 2,
      frameHeight: Constants.TILESIZE * 2,
    });
    this.load.spritesheet("plants", "assets/plants.png", {
      frameWidth: Constants.TILESIZE * 1,
      frameHeight: Constants.TILESIZE * 2,
    });
    this.load.spritesheet("all_tiles_sprite", "assets/all_tilesx2_2.png", {
      frameWidth: Constants.TILESIZE * 2,
      frameHeight: Constants.TILESIZE * 2,
      margin: 1,
      spacing: 2,
    });
    this.load.image("marker", "assets/marker.png");
    this.load.spritesheet("objects", "assets/objects/sellbox.png", {
      frameWidth: Constants.TILE_DISPLAY_SIZE,
      frameHeight: Constants.TILE_DISPLAY_SIZE,
    });
    this.load.image("barn", "assets/barnInterior.png");
    this.load.image("log", "assets/objects/log.png");
    this.load.image("rock", "assets/objects/rock.png");
    this.load.image("tree", "assets/objects/tree.png");
    this.load.image("flower", "assets/objects/flower.png");
  }

  create() {
    // Draw game elements
    this.input.setDefaultCursor("url(assets/hand.cur), pointer");
    this.cameraManager.initialize(HouseType.HOME);
    this.backgroundManager.initialize(HouseType.HOME);
    this.tileManager.initialize(HouseType.HOME);
    this.addInteraction();
    this.houseManager.initialize(HouseType.HOME);
    this.dialogueManager.initialize(HouseType.HOME);
    this.cameraManager.initialize(HouseType.HOME);
    this.dialogueManager.playDialogue(DialogueType.WELCOME);
    this.transactionManager.initialize(HouseType.HOME);
    this.objectManager.initialize(HouseType.HOME);
    this.itemManager.initialize();
    this.energyManager.initialize();
    this.moneyManager.initialize();
    this.dayManager.initialize(HouseType.HOME);
  }

  public changeLocation(houseType: HouseType) {
    this.currLoc = houseType;
    this.backgroundManager.destroy();
    this.backgroundManager.initialize(houseType);
    this.tileManager.destroy();
    this.tileManager.initialize(houseType);
    this.houseManager.destroy();
    this.houseManager.initialize(houseType);
    this.dialogueManager.initialize(houseType);
    this.transactionManager.initialize(houseType);
    this.cameraManager.destroy();
    this.cameraManager.initialize(houseType);
    this.objectManager.destroy();
    this.objectManager.initialize(houseType);
    this.dayManager.destroy();
    this.dayManager.changeLocation(houseType);
  }

  private addInteraction() {
    // Add invisible rectangle for tile interaction
    const rectangle = this.add.rectangle(
      0,
      0,
      Constants.WIDTH,
      Constants.HEIGHT,
      0x0ff00
    );
    rectangle.setOrigin(0, 0);
    rectangle.setInteractive();
    rectangle.setAlpha(0.01);
    rectangle.setScrollFactor(0);
    rectangle.on("pointerdown", () => {
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
