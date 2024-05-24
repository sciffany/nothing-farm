import { Constants, Layer } from "../constants";
import MainGame from "../scenes/mainGame";

export default class DialogueManager {
  private scene: MainGame;

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize() {
    this.drawDialogue();
  }

  private drawDialogue() {
    const black = this.scene.add.rectangle(
      Constants.WIDTH / 2,
      Constants.HEIGHT / 2,
      Constants.WIDTH,
      Constants.HEIGHT,
      0x000000
    );

    black.alpha = 0.5;
    black.depth = Layer.Dialogue;

    const marker = this.scene.add
      .image(
        5 * Constants.TILE_DISPLAY_SIZE,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 4,
        "marker",
        0
      )
      .setOrigin(0, 0);
    marker.setScrollFactor(0);
    marker.depth = Layer.Dialogue;
    marker.scaleX = 3;
    marker.scaleY = 4;

    const dialogue1Text = this.scene.add.text(
      Constants.TILE_DISPLAY_SIZE * 6,
      Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 3,
      "Hello, welcome to the farm!",
      {
        fontSize: "12px",
        fontFamily: "DePixelSchmal",
        color: "#000000",
      }
    );

    dialogue1Text.depth = Layer.Dialogue;

    black.setInteractive();
    black.on("pointerdown", () => {
      black.destroy();
      marker.destroy();
      dialogue1Text.destroy();
    });
  }
}
