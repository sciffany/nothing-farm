import { render } from "react-dom";
import { Constants, Layer } from "../constants";

type Choice = {
  text: string;
  action: () => void;
};

export const renderChoice = (
  scene: Phaser.Scene,
  choice: Choice,
  index: number
) => {
  const choiceText = scene.add.text(
    Constants.TILE_DISPLAY_SIZE * 6,
    Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 3 + 20 * index,
    "> " + choice.text,
    {
      fontSize: "12px",
      fontFamily: "DePixelSchmal",
      color: "#000000",
      wordWrap: {
        width: Constants.TILE_DISPLAY_SIZE * 10,
        useAdvancedWrap: true,
      },
    }
  );

  choiceText.depth = Layer.DIALOGUE;
  choiceText.setInteractive();
  choiceText.setScrollFactor(0);

  choiceText.on("pointerdown", () => {
    choice.action();
  });

  return choiceText;
};

export function createScroll(
  scene: Phaser.Scene,
  choices: Choice[],
  marker: Phaser.GameObjects.Image
) {
  const NUM_CHOICES = 3;
  let startIndex = 0;
  let choiceTexts: Phaser.GameObjects.Text[] = [];

  const destroy = () => {
    choiceTexts.forEach((choiceText) => choiceText.destroy());
  };

  choiceTexts = choices
    .slice(startIndex, Math.min(startIndex + NUM_CHOICES, choices.length))
    .map((choice, index) => renderChoice(scene, choice, index));

  marker.setInteractive();
  marker.on("pointerdown", () => {
    startIndex += 3;
    if (startIndex >= choices.length) {
      return;
    }
    destroy();
    choiceTexts = choices
      .slice(startIndex, Math.min(startIndex + NUM_CHOICES, choices.length))
      .map((choice, index) => renderChoice(scene, choice, index));
  });

  return destroy;
}

export function addBlackAndMarker(scene: Phaser.Scene) {
  const black = scene.add.rectangle(
    Constants.WIDTH / 2,
    Constants.HEIGHT / 2,
    Constants.WIDTH,
    Constants.HEIGHT,
    0x000000
  );
  black.setScrollFactor(0);
  black.alpha = 0.5;
  black.depth = Layer.DIALOGUE;

  const marker = scene.add
    .image(
      5 * Constants.TILE_DISPLAY_SIZE,
      Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 4,
      "marker",
      0
    )
    .setOrigin(0, 0);
  marker.setScrollFactor(0);
  marker.depth = Layer.DIALOGUE;
  marker.scaleX = 3;
  marker.scaleY = 4;

  return {
    black,
    marker,
  };
}
