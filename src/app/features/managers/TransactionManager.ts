import { Constants, Layer } from "../constants";
import { DIALOGUES, DialogueType, OutcomeType } from "../dialogues";
import { HouseType, LOCATIONS } from "../houses";
import { ITEMS, ItemType } from "../items";
import Seed, { PlantType } from "../items/Seed";
import MainGame from "../scenes/mainGame";
import { TRANSACTIONS, TransactionGroup } from "../transactionGroups";

export default class TransactionManager {
  private scene: MainGame;

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize(houseType: HouseType) {
    const transactionType = LOCATIONS[houseType]
      .transaction as TransactionGroup;
    this.playTransactionGroup(transactionType);
  }

  public playTransactionGroup(transactionGroup: TransactionGroup) {
    console.log("transactionGroup", transactionGroup);
    if (transactionGroup == TransactionGroup.NONE) {
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

    const choiceTexts = [] as Phaser.GameObjects.Text[];

    TRANSACTIONS[transactionGroup].forEach((transaction, index) => {
      const item = ITEMS[transaction.item];
      const choiceText = this.scene.add.text(
        Constants.TILE_DISPLAY_SIZE * 6,
        Constants.HEIGHT - Constants.TILE_DISPLAY_SIZE * 3 + 20 * index,
        "> " + item.name + " $" + transaction.price,
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
        if (transaction.item == ItemType.CarrotSeeds) {
          this.scene.itemManager.addItem(
            new Seed(this.scene, PlantType.CARROT, 1)
          );
          this.scene.moneyManager.addMoney(-transaction.price);
        } else if (transaction.item == ItemType.CornSeeds) {
          this.scene.itemManager.addItem(
            new Seed(this.scene, PlantType.CORN, 1)
          );
          this.scene.moneyManager.addMoney(-transaction.price);
        } else if (transaction.item == ItemType.TomatoSeeds) {
          this.scene.itemManager.addItem(
            new Seed(this.scene, PlantType.TOMATO, 1)
          );
          this.scene.moneyManager.addMoney(-transaction.price);
        } else if (transaction.item == ItemType.TurnipSeeds) {
          this.scene.itemManager.addItem(
            new Seed(this.scene, PlantType.TURNIP, 1)
          );
          this.scene.moneyManager.addMoney(-transaction.price);
        }
      });
    });
  }
}
