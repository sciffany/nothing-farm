import { Constants, Layer } from "../constants";
import { DIALOGUES, DialogueType, OutcomeType } from "../dialogues";
import { HouseType, LOCATIONS } from "../locations";
import { ITEMS, ItemType } from "../items";
import Seed, { PlantType } from "../items/Seed";
import MainGame from "../scenes/mainGame";
import { TRANSACTIONS, TransactionGroup } from "../transactionGroups";
import { createScroll } from "../utils/scroll";

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

    const transactions = TRANSACTIONS[transactionGroup];

    const destroy = createScroll(
      this.scene,
      [
        ...transactions.map((transaction) => ({
          text: ITEMS[transaction.item].name + " $" + transaction.price,
          action: () => {
            if (this.scene.moneyManager.getMoney() < transaction.price) {
              return;
            }
            this.scene.itemManager.addItem(
              ITEMS[transaction.item].constructor(this.scene)
            );
            this.scene.moneyManager.addMoney(-transaction.price);
          },
        })),
        {
          text: "Back",
          action: () => {
            black.destroy();
            marker.destroy();
            destroy();
          },
        },
      ],
      marker
    );
  }
}
