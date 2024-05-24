import { Constants, Layer } from "../constants";
import { DIALOGUES, DialogueType, OutcomeType } from "../dialogues";
import { HouseType, LOCATIONS } from "../houses";
import MainGame from "../scenes/mainGame";

export default class DialogueManager {
  private scene: MainGame;

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(houseType: HouseType) {
    const dialogueType = LOCATIONS[houseType].dialogue as DialogueType;
    this.playDialogue(dialogueType);
  }

  public playDialogue(dialogueType: DialogueType) {
    let dialoguePointer = 0;

    const dialogue = DIALOGUES[dialogueType];

    if (dialogue.dialogue.length === 0) {
      return;
    }

    const black = this.scene.add.rectangle(
      Constants.WIDTH / 2,
      Constants.HEIGHT / 2,
      Constants.WIDTH,
      Constants.HEIGHT,
      0x000000
    );

    black.alpha = 0.5;
    black.depth = Layer.DIALOGUE;

    const marker = this.scene.add
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

    const dialogueText = this.scene.add.text(
      Constants.TILE_DISPLAY_SIZE * 6,
      Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 3,
      dialogue.dialogue[dialoguePointer],
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

    dialogueText.depth = Layer.DIALOGUE;

    black.setInteractive();
    black.on("pointerdown", () => {
      if (dialoguePointer < dialogue.dialogue.length - 1) {
        dialoguePointer++;
        dialogueText.setText(dialogue.dialogue[dialoguePointer]);
      } else {
        black.off("pointerdown");
        dialogueText.destroy();

        const choiceTexts = [] as Phaser.GameObjects.Text[];

        dialogue.choices.forEach((choice, index) => {
          const choiceText = this.scene.add.text(
            Constants.TILE_DISPLAY_SIZE * 6,
            Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 3 + 20 * index,
            choice.text,
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
          choiceTexts.push(choiceText);

          choiceText.depth = Layer.DIALOGUE;
          choiceText.setInteractive();
          choiceText.on("pointerdown", () => {
            if (choice.outcomeType == OutcomeType.Exit) {
              black.destroy();
              marker.destroy();
              choiceTexts.forEach((text) => text.destroy());
            } else if (choice.outcomeType == OutcomeType.Dialogue) {
              black.destroy();
              marker.destroy();
              choiceTexts.forEach((text) => text.destroy());
              this.playDialogue(choice.outcome as DialogueType);
            }
          });
        });
      }
    });
  }
}
