import { ItemType } from "./objects";

export enum TransactionGroup {
  NONE,
  SEEDS,
  ANIMALS,
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
  [TransactionGroup.ANIMALS]: [
    {
      item: ItemType.COW,
      price: 500,
    },
    {
      item: ItemType.PIG,
      price: 300,
    },
    {
      item: ItemType.CHICKEN,
      price: 100,
    },
    {
      item: ItemType.SHEEP,
      price: 400,
    },
  ],
};
