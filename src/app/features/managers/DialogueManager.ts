import { Constants, Layer } from "../constants";
import { DIALOGUES, DialogueType, OutcomeType, QUIPS } from "../dialogues";
import { LocationType, PROPERTIES, PropertyType } from "../locations";
import { ITEMS, ItemType } from "../objects";
import MainGame from "../scenes/mainGame";
import { TransactionGroup } from "../transactionGroups";
import { addBlackAndMarker, createScroll } from "../utils/scroll";

export default class DialogueManager {
  private scene: MainGame;

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(propertyType: LocationType) {
    // const dialogueType = LOCATIONS[houseType].dialogue as DialogueType;
    // this.playDialogue(dialogueType);
  }

  public showText(text: string, callback?: () => void) {
    const { black, marker } = addBlackAndMarker(this.scene);

    const dialogueText = this.scene.add.text(
      Constants.TILE_DISPLAY_SIZE * 6,
      Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 3,
      text,
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
      if (callback) {
        callback();
      }
      black.destroy();
      marker.destroy();
      dialogueText.destroy();
    });
  }

  public playCharacterDialogue(
    propertyType: PropertyType,
    mbti: string,
    relationship: number,
    increaseRelationship: () => void,
    loveItem: (item: ItemType) => boolean,
    request?: PropertyType
  ) {
    const { black, marker } = addBlackAndMarker(this.scene);
    const randomMbtiLetter = mbti[
      Math.floor(Math.random() * mbti.length)
    ] as keyof typeof QUIPS;
    const possibleQuips = QUIPS[randomMbtiLetter];
    const quip =
      possibleQuips[Math.floor(Math.random() * possibleQuips.length)];

    const destroy = createScroll(
      this.scene,
      [
        {
          text: "Chit Chat",
          action: () => {
            this.showText(quip);
            if (increaseRelationship) {
              increaseRelationship();
            }
            destroy();
            black.destroy();
            marker.destroy();
          },
        },
        {
          text: "Be mayor",
          action: () => {
            if (request) {
              this.showText(
                `I'm looking to visit a(n) ${PROPERTIES[
                  request
                ].name.toLowerCase()}. Would appreciate if you could help build one near my house.`
              );
            } else {
              this.showText(
                "I don't have any requests right now. Thanks for asking though!"
              );
            }
            destroy();
            black.destroy();
            marker.destroy();
          },
        },
        ...(PROPERTIES[propertyType].serviceText
          ? [
              {
                text: PROPERTIES[propertyType].serviceText ?? "Service",
                action: () => {
                  destroy();
                  black.destroy();
                  marker.destroy();
                },
              },
            ]
          : []),
        {
          text: "Gift",
          action: () => {
            const destroy2 = createScroll(
              this.scene,
              [
                ...this.scene.itemManager.items
                  .filter((item) => ITEMS[item.getType() as ItemType].sellable)
                  .map((item) => ({
                    text: item.name,
                    action: () => {
                      const result = loveItem(item.getType() as ItemType);
                      this.showText(
                        `Thanks for the ${item.name}! ${
                          result ? "I love it!" : "It's okay."
                        }`
                      );
                      destroy2();
                      black.destroy();
                      marker.destroy();
                    },
                  })),
                {
                  text: "Exit",
                  action: () => {
                    destroy2();
                    black.destroy();
                    marker.destroy();
                  },
                },
              ],
              marker
            );
            destroy();
            black.destroy();
          },
        },
        {
          text: "Ask for recommendation",
          action: () => {
            const destroy2 = createScroll(
              this.scene,
              [
                ...Object.entries(PROPERTIES)
                  .filter(([, property]) => {
                    return property.requestable != false;
                  })
                  .map(([type, property]) => ({
                    text: property.name,
                    action: () => {
                      if (relationship < 10) {
                        this.showText(
                          "I don't know you well enough to recommend anything."
                        );
                        return;
                      } else {
                        let recommendByChance = Math.random() < 0.5;
                        if (relationship > 20) {
                          recommendByChance = Math.random() < 0.8;
                        } else if (relationship > 30) {
                          recommendByChance = Math.random() < 0.9;
                        }

                        this.showText(
                          `I know a great ${property.name.toLowerCase()} near here! Check your move-in request.`
                        );
                        this.scene.mailManager.addMailContents([
                          type as unknown as PropertyType,
                        ]);
                      }
                      destroy2();
                      black.destroy();
                      marker.destroy();
                    },
                  })),
                {
                  text: "Exit",
                  action: () => {
                    destroy2();
                    black.destroy();
                    marker.destroy();
                  },
                },
              ],
              marker
            );
            destroy();
            black.destroy();
          },
        },
        {
          text: "Exit",
          action: () => {
            destroy();
            black.destroy();
            marker.destroy();
          },
        },
      ],
      marker
    );
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
