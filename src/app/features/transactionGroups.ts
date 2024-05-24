import { ItemType } from "./items";

export enum TransactionGroup {
  NONE,
  SEEDS,
}

export const TRANSACTIONS = {
  [TransactionGroup.SEEDS]: [
    {
      item: ItemType.TurnipSeeds,
      price: 40,
    },
    {
      item: ItemType.TomatoSeeds,
      price: 80,
    },
    {
      item: ItemType.CornSeeds,
      price: 200,
    },
    {
      item: ItemType.CarrotSeeds,
      price: 120,
    },
  ],
  [TransactionGroup.NONE]: [],
};
