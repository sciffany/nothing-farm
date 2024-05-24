import { Constants, Layer } from "../constants";
import Hoe from "../items/Hoe";
import Seed, { PlantType } from "../items/Seed";
import Item from "../items/Item";
import Travel from "../items/Travel";
import WateringCan from "../items/WateringCan";
import Hand from "../items/Hand";
import MainGame from "../scenes/mainGame";

const TOOLBOX_FRAME = 15;

export default class ItemManager {
  private scene: MainGame;
  private selector: Phaser.GameObjects.Rectangle | null;
  private itemName: Phaser.GameObjects.Text | null;

  public selectedItem: Item | null;
  private items: Item[] = [];
  private hoe: Hoe | null;
  private travel: Travel | null;
  private wateringCan: WateringCan | null;
  private hand: Hand | null;

  constructor(scene: MainGame) {
    this.scene = scene;
    this.hoe = new Hoe(this.scene);
    const turnipSeeds = new Seed(this.scene, PlantType.TURNIP, 10);
    this.travel = new Travel(this.scene);
    this.wateringCan = new WateringCan(this.scene, 45);
    const tomatoSeeds = new Seed(this.scene, PlantType.TOMATO, 5);
    this.hand = new Hand(this.scene);
    this.selectedItem = this.hoe;
    this.selector = null;
    this.itemName = null;
    this.items = [
      this.hoe,
      turnipSeeds,
      this.travel,
      this.wateringCan,
      tomatoSeeds,
      this.hand,
    ];
  }

  public initialize() {
    this.drawItemName();
    this.drawToolbox();
    this.items.map((item, index) => item.initialize(index));
    this.drawItemSelector();
    this.initializeItemSelector();
  }

  public addItem(item: Item) {
    const existingItem = this.items.find((i) => i.name === item.name);
    if (existingItem) {
      existingItem.addQuantity(item.quantity);
      return;
    }

    this.items.push(item);
    item.initialize(this.items.length - 1);
  }

  private drawToolbox() {
    Array.from({ length: 16 }, (_, i) => i).map((i) => {
      const box = this.scene.add
        .sprite(0, 0, "tools", TOOLBOX_FRAME)
        .setOrigin(0, 0);
      box.depth = Layer.UI;
      box.y = Constants.TILE_DISPLAY_SIZE * i;
      // box.scale = 2;
      box.setScrollFactor(0);
      return box;
    });
  }

  private drawItemSelector() {
    this.selector = this.scene.add
      .rectangle(
        0,
        0,
        Constants.TILE_DISPLAY_SIZE,
        Constants.TILE_DISPLAY_SIZE,
        0x00ff00
      )
      .setOrigin(0, 0);
    this.selector.alpha = 0.2;
    this.selector.depth = Layer.UI;
    this.selector.setScrollFactor(0);
  }

  private initializeItemSelector() {
    this.scene.input.on("pointerdown", (pointer: any) => {
      if (!this.selector) return;

      const x = Math.floor(pointer.x / Constants.TILE_DISPLAY_SIZE);
      const y = Math.floor(pointer.y / Constants.TILE_DISPLAY_SIZE);

      if (x !== 0) return;
      this.selector.y = y * Constants.TILE_DISPLAY_SIZE;
      this.selectedItem = this.items?.[y];

      if (!this.itemName || !this.selectedItem) return;
      this.itemName.text =
        `${this.selectedItem.name} (${this.selectedItem.quantity})` ?? "";
    });
  }

  private drawItemName() {
    const marker = this.scene.add
      .image(
        Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE,
        "marker",
        0
      )
      .setOrigin(0, 0);
    marker.depth = Layer.UI;
    marker.setScrollFactor(0);

    this.itemName = this.scene.add.text(
      Constants.TILE_DISPLAY_SIZE * 3,
      Constants.HEIGHT -
        Constants.TILE_DISPLAY_SIZE +
        Constants.TILE_DISPLAY_SIZE / 2,
      `${this.selectedItem?.name} (${this.selectedItem?.quantity})` ?? "",
      {
        fontSize: "12px",
        fontFamily: "DePixelSchmal",
        color: "#000000",
      }
    );
    this.itemName.depth = Layer.UI;
    this.itemName.setOrigin(0.5, 0.5);
    this.itemName.setScrollFactor(0);
  }

  public updateItemQuantity(item: Item) {
    if (!this.itemName) return;
    this.itemName.text = `${item.name} (${item.quantity})`;
  }
}
