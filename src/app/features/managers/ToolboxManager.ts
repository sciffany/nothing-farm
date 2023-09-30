import { Constants } from "../constants";
import Hoe from "../tools/Hoe";
import Tool from "../tools/Tool";

const TOOLBOX_FRAME = 15;

export default class ToolboxManager {
  private scene: Phaser.Scene;
  private selector: Phaser.GameObjects.Rectangle | null;

  private selectedTool: Tool | null;
  private tools: Tool[] = [];
  private hoe: Hoe | null;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.hoe = new Hoe(this.scene);
    this.selectedTool = this.hoe;
    this.selector = null;
  }

  public initialize() {
    this.drawToolbox();
    this.hoe?.initialize();
    this.drawToolSelector();
    this.initializeToolSelector();
  }

  private drawToolbox() {
    Array.from({ length: 16 }, (_, i) => i).map((i) => {
      const box = this.scene.add
        .sprite(0, 0, "tools", TOOLBOX_FRAME)
        .setOrigin(0, 0);
      box.y = 16 * i;
      box.setScrollFactor(0);
      return box;
    });
  }

  private drawToolSelector() {
    this.selector = this.scene.add
      .rectangle(0, 0, 16, 16, 0x00ff00)
      .setOrigin(0, 0);
    this.selector.alpha = 0.2;
    this.selector.setScrollFactor(0);
  }

  private initializeToolSelector() {
    this.scene.input.on("pointerdown", (pointer: any) => {
      if (!this.selector) return;

      const y = Math.floor(pointer.y / Constants.TILESIZE);
      this.selector.y = y * Constants.TILESIZE;
      this.selectedTool = this.tools?.[y];
    });
  }
}
