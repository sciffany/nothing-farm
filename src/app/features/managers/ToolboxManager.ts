import { Constants } from "../constants";
import Hoe from "../tools/Hoe";
import Seed from "../tools/Seed";
import Tool from "../tools/Tool";

const TOOLBOX_FRAME = 15;

export default class ToolboxManager {
  private scene: Phaser.Scene;
  private selector: Phaser.GameObjects.Rectangle | null;
  private toolName: Phaser.GameObjects.Text | null;

  public selectedTool: Tool | null;
  private tools: Tool[] = [];
  private hoe: Hoe | null;
  private seed: Seed | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.hoe = new Hoe(this.scene);
    this.seed = new Seed(this.scene);
    this.selectedTool = this.hoe;
    this.selector = null;
    this.toolName = null;
    this.tools = [this.hoe, this.seed];
  }

  public initialize() {
    this.drawToolName();
    this.drawToolbox();
    this.hoe?.initialize();
    this.seed?.initialize();
    this.drawToolSelector();
    this.initializeToolSelector();
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

  private drawToolSelector() {
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

  private initializeToolSelector() {
    this.scene.input.on("pointerdown", (pointer: any) => {
      if (!this.selector) return;

      const x = Math.floor(pointer.x / Constants.TILE_DISPLAY_SIZE);
      const y = Math.floor(pointer.y / Constants.TILE_DISPLAY_SIZE);

      if (x !== 0) return;
      this.selector.y = y * Constants.TILE_DISPLAY_SIZE;
      this.selectedTool = this.tools?.[y];

      if (!this.toolName) return;
      this.toolName.text = this.selectedTool.name;
    });
  }

  private drawToolName() {
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

    this.toolName = this.scene.add.text(
      Constants.TILE_DISPLAY_SIZE * 3,
      Constants.HEIGHT -
        Constants.TILE_DISPLAY_SIZE +
        Constants.TILE_DISPLAY_SIZE / 2,
      this.selectedTool?.name ?? "",
      {
        fontSize: "12px",
        fontFamily: "Arial",
        color: "#000000",
      }
    );
    this.toolName.setOrigin(0.5, 0.5);
    this.toolName.setScrollFactor(0);
  }
}
