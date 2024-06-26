import { Constants, Layer } from "../constants";
import Hoe from "../items/Hoe";
import Seed, { PlantType } from "../items/Seed";
import Item from "../items/Item";
import Travel from "../items/Travel";
import WateringCan from "../items/WateringCan";
import Hand from "../items/Hand";
import MainGame from "../scenes/mainGame";
import Axe from "../items/Axe";
import Hammer from "../items/Hammer";
import { ItemType } from "../objects";

const TOOLBOX_FRAME = 15;

export default class ItemManager {
  private scene: MainGame;
  private selector: Phaser.GameObjects.Rectangle | null;
  private itemName: Phaser.GameObjects.Text | null;
  public items: Item[];

  public selectedItem: Item | null;

  constructor(scene: MainGame) {
    this.scene = scene;
    this.items = [
      new Hoe(this.scene),
      new Seed(this.scene, PlantType.TURNIP, 10),
      new Travel(this.scene),
      new WateringCan(this.scene, 45),
      new Seed(this.scene, PlantType.TOMATO, 5),
      new Hand(this.scene),
      new Axe(this.scene),
      new Hammer(this.scene),
      new Seed(this.scene, PlantType.CARROT, 5),
      new Seed(this.scene, PlantType.CORN, 5),
    ];
    this.selectedItem = this.items[0];
    this.selector = null;
    this.itemName = null;
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

  public removeItem(item: Item) {
    item.useUp();
  }

  public deleteItem(item: Item) {
    const index = this.items.indexOf(item);
    this.items.splice(index, 1);
    this.items.map((item, index) => item.moveToPosition(0, index));
  }

  private drawToolbox() {
    Array.from({ length: 16 }, (_, i) => i).map((i) => {
      const y = i % Constants.NUM_TILES_Y;
      const x = Math.floor(i / Constants.NUM_TILES_Y);
      const box = this.scene.add
        .sprite(0, 0, "tools", TOOLBOX_FRAME)
        .setOrigin(0, 0);
      box.depth = Layer.UI;
      box.x = Constants.TILE_DISPLAY_SIZE * x;
      box.y = Constants.TILE_DISPLAY_SIZE * y;
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
    const rectangle = this.scene.add.rectangle(
      0,
      0,
      Constants.TILE_DISPLAY_SIZE * 2,
      Constants.HEIGHT,
      0x000000
    );
    rectangle.setOrigin(0, 0);
    rectangle.setScrollFactor(0);
    rectangle.depth = Layer.UI;
    rectangle.setInteractive();
    rectangle.setAlpha(0.01);

    rectangle.on("pointerdown", (pointer: any) => {
      if (!this.selector) return;

      const x = Math.floor(pointer.x / Constants.TILE_DISPLAY_SIZE);
      const y = Math.floor(pointer.y / Constants.TILE_DISPLAY_SIZE);

      const index = y + x * Constants.NUM_TILES_Y;
      if (index >= Constants.MAX_ITEMS) return;

      this.selector.x = x * Constants.TILE_DISPLAY_SIZE;
      this.selector.y = y * Constants.TILE_DISPLAY_SIZE;

      this.selectedItem = this.items?.[index];

      if (!this.itemName || !this.selectedItem) return;
      this.itemName.text =
        `${this.selectedItem.name} (${this.selectedItem.quantity})` ?? "";
    });
  }

  private drawItemName() {
    const marker = this.scene.add
      .image(
        Constants.TILE_DISPLAY_SIZE * 2,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE,
        "marker",
        0
      )
      .setOrigin(0, 0);
    marker.depth = Layer.UI;
    marker.setScrollFactor(0);

    this.itemName = this.scene.add.text(
      Constants.TILE_DISPLAY_SIZE * 4,
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
    if (item.quantity === 0 && item.deleteOnEmpty) {
      this.itemName.text = "";
      return;
    }
    if (item.quantity === 1) {
      this.itemName.text = item.name;
      return;
    }
    this.itemName.text = `${item.name} (${item.quantity})`;
  }

  public findItemWithType(type: ItemType) {
    return this.items.find((item) => item.getType() == type);
  }
}
