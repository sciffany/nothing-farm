import { ItemType } from "./items";

export enum TransactionGroup {
  NONE,
  SEEDS,
}

export const TRANSACTIONS = {
  [TransactionGroup.SEEDS]: [
    {
      item: ItemType.TURNIP_SEEDS,
      price: 40,
    },
    {
      item: ItemType.TOMATO_SEEDS,
      price: 80,
    },
    {
      item: ItemType.CORN_SEEDS,
      price: 200,
    },
    {
      item: ItemType.CARROT_SEEDS,
      price: 120,
    },
  ],
  [TransactionGroup.NONE]: [],
};
