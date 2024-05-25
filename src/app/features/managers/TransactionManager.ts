import { HouseType, LOCATIONS } from "../locations";
import { ITEMS } from "../items";
import MainGame from "../scenes/mainGame";
import { TRANSACTIONS, TransactionGroup } from "../transactionGroups";
import { addBlackAndMarker, createScroll } from "../utils/scroll";

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
    if (transactionGroup == TransactionGroup.NONE) {
      return;
    }

    const { black, marker } = addBlackAndMarker(this.scene);

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
