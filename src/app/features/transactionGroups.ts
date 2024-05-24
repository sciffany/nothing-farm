import { ItemType } from "./managers/ItemManager";

export enum TransactionGroup {
  Seeds,
}

export const transactions = {
  [TransactionGroup.Seeds]: [
    {
      item: ItemType.TurnipSeeds,
      amount: 40,
    },
    {
      item: ItemType.TomatoSeeds,
      amount: 80,
    },
    {
      item: ItemType.CornSeeds,
      amount: 200,
    },
    {
      item: ItemType.CarrotSeeds,
      amount: 120,
    },
  ],
};
