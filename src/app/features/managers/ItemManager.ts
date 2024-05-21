import { Constants } from "../constants";
import Hoe from "../items/Hoe";
import Seed from "../items/Seed";
import Item from "../items/Item";
import Travel from "../items/Travel";
import WateringCan from "../items/WateringCan";

const TOOLBOX_FRAME = 15;

export default class ItemManager {
  private scene: Phaser.Scene;
  private selector: Phaser.GameObjects.Rectangle | null;
  private itemName: Phaser.GameObjects.Text | null;

  public selectedItem: Item | null;
  private items: Item[] = [];
  private hoe: Hoe | null;
  private seed: Seed | null;
  private travel: Travel | null;
  private wateringCan: WateringCan | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.hoe = new Hoe(this.scene);
    this.seed = new Seed(this.scene, 10);
    this.travel = new Travel(this.scene);
    this.wateringCan = new WateringCan(this.scene, 45);
    this.selectedItem = this.hoe;
    this.selector = null;
    this.itemName = null;
    this.items = [this.hoe, this.seed, this.travel, this.wateringCan];
  }

  public initialize() {
    this.drawItemName();
    this.drawToolbox();
    this.hoe?.initialize();
    this.seed?.initialize();
    this.travel?.initialize();
    this.wateringCan?.initialize();
    this.drawItemSelector();
    this.initializeItemSelector();
  }

  private drawToolbox() {
    Array.from({ length: 16 }, (_, i) => i).map((i) => {
      const box = this.scene.add
        .sprite(0, 0, "tools", TOOLBOX_FRAME)
        .setOrigin(0, 0);
      box.y = Constants.TILE_DISPLAY_SIZE * i;
      box.scale = 2;
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
    marker.setScrollFactor(0);
    marker.scale = 2;

    this.itemName = this.scene.add.text(
      Constants.TILE_DISPLAY_SIZE * 3,
      Constants.HEIGHT -
        Constants.TILE_DISPLAY_SIZE +
        Constants.TILE_DISPLAY_SIZE / 2,
      `${this.selectedItem?.name} (${this.selectedItem?.quantity})` ?? "",
      {
        fontSize: "12px",
        fontFamily: "Arial",
        color: "#000000",
      }
    );
    this.itemName.setOrigin(0.5, 0.5);
    this.itemName.setScrollFactor(0);
  }

  public updateItemQuantity(item: Item) {
    if (!this.itemName) return;
    this.itemName.text = `${item.name} (${item.quantity})`;
  }
}
