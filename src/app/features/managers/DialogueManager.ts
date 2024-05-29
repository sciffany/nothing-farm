import { Constants, Layer } from "../constants";
import { DIALOGUES, DialogueType, OutcomeType } from "../dialogues";
import { HouseType, LOCATIONS } from "../locations";
import MainGame from "../scenes/mainGame";
import { TransactionGroup } from "../transactionGroups";
import { addBlackAndMarker, createScroll } from "../utils/scroll";

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

    const { black, marker } = addBlackAndMarker(this.scene);

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
    dialogueText.setScrollFactor(0);

    black.setInteractive();
    black.on("pointerdown", () => {
      if (dialoguePointer < dialogue.dialogue.length - 1) {
        dialoguePointer++;
        dialogueText.setText(dialogue.dialogue[dialoguePointer]);
      } else {
        black.off("pointerdown");
        dialogueText.destroy();

        const destroy = createScroll(
          this.scene,
          dialogue.choices.map((choice) => ({
            text: choice.text,
            action: () => {
              black.destroy();
              marker.destroy();
              destroy();
              if (choice.outcomeType == OutcomeType.EXIT) {
              } else if (choice.outcomeType == OutcomeType.DIALOGUE) {
                this.playDialogue(choice.outcome as DialogueType);
              } else if (choice.outcomeType == OutcomeType.TRANSACTION) {
                this.scene.transactionManager.playTransactionGroup(
                  choice.outcome as TransactionGroup
                );
              }
            },
          })),
          marker
        );
      }
    });
  }
}
