import { TransactionGroup } from "./transactionGroups";

export enum DialogueType {
  WELCOME,
  MARKET_WELCOME,
  MARKET_CHAT,
  NONE,
}

export enum OutcomeType {
  DIALOGUE,
  TRANSACTION,
  EXIT,
  SURVEY,
}

export const DIALOGUES = {
  [DialogueType.NONE]: {
    dialogue: [],
    choices: [],
  },
  [DialogueType.WELCOME]: {
    dialogue: [
      "Good morning, new mayor!",
      "You're in charge of this town.",
      "People are going to start moving in.",
      "Good luck!",
    ],
    choices: [
      {
        text: "Click this option to start!",
        outcomeType: OutcomeType.EXIT,
        outcome: null,
      },
    ],
  },
  [DialogueType.MARKET_WELCOME]: {
    dialogue: ["Yo, Tyler here! What can I help you with today?"],
    choices: [
      {
        text: "Chat",
        outcomeType: OutcomeType.DIALOGUE,
        outcome: DialogueType.MARKET_CHAT,
      },
      {
        text: "Buy",
        outcomeType: OutcomeType.TRANSACTION,
        outcome: TransactionGroup.SEEDS,
      },
      {
        text: "Exit",
        outcomeType: OutcomeType.EXIT,
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
        text: "Gotcha, dude!",
        outcomeType: OutcomeType.DIALOGUE,
        outcome: DialogueType.MARKET_WELCOME,
      },
    ],
  },
};
