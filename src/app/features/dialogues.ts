import { TransactionGroup } from "./transactionGroups";

export enum DialogueType {
  WELCOME,
  MARKET_WELCOME,
  MARKET_CHAT,
  NONE,
}

export enum OutcomeType {
  Dialogue,
  Transaction,
  Exit,
  Survey,
}

export const DIALOGUES = {
  [DialogueType.NONE]: {
    dialogue: [],
    choices: [],
  },
  [DialogueType.WELCOME]: {
    dialogue: ["Hello, welcome to the farm!"],
    choices: [
      {
        text: "Exit",
        outcomeType: OutcomeType.Exit,
        outcome: null,
      },
    ],
  },
  [DialogueType.MARKET_WELCOME]: {
    dialogue: ["Yo, Tyler here! What can I help you with today?"],
    choices: [
      {
        text: "Chat",
        outcomeType: OutcomeType.Dialogue,
        outcome: DialogueType.MARKET_CHAT,
      },
      {
        text: "Buy",
        outcomeType: OutcomeType.Transaction,
        outcome: TransactionGroup.Seeds,
      },
      {
        text: "Exit",
        outcomeType: OutcomeType.Exit,
        outcome: null,
      },
    ],
  },
  [DialogueType.MARKET_CHAT]: {
    dialogue: [
      "'Sup man!",
      "How's the farm going?",
      "Heard people are coming in from all over the place to check it out!",
      "Any time you need seeds, I'm your guy!",
    ],
    choices: [
      {
        text: "Exit",
        outcomeType: OutcomeType.Exit,
        outcome: null,
      },
    ],
  },
};
