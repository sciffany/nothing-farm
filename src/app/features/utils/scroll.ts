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
    destroy();
    choiceTexts = choices
      .slice(startIndex, Math.min(startIndex + NUM_CHOICES, choices.length))
      .map((choice, index) => renderChoice(scene, choice, index));
  });

  return destroy;
}
