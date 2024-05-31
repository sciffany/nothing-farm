import { TransactionGroup } from "./transactionGroups";

export enum DialogueType {
  WELCOME,
  MARKET_WELCOME,
  MARKET_CHAT,
  NONE,
  CHIT_CHAT,
  CHIT_CHAT_2,
  CHIT_CHAT_3,
}

export enum OutcomeType {
  DIALOGUE,
  TRANSACTION,
  EXIT,
  SURVEY,
}

const OKAY = [
  {
    text: "Okay!",
    outcomeType: OutcomeType.EXIT,
    outcome: DialogueType.CHIT_CHAT,
  },
];

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
  [DialogueType.CHIT_CHAT]: {
    dialogue: [
      "Hey there! Just finished organizing the toolshed.",
      "Everything's in its place now.",
      "Do you normally clean your workspace?",
    ],
    choices: [
      {
        text: "Yes",
        outcomeType: OutcomeType.DIALOGUE,
        outcome: DialogueType.CHIT_CHAT_2,
      },
      {
        text: "No",
        outcomeType: OutcomeType.DIALOGUE,
        outcome: DialogueType.CHIT_CHAT_3,
      },
    ],
  },
  [DialogueType.CHIT_CHAT_2]: {
    dialogue: [
      "Really? That's great to hear! It's so much easier to find things when they're organized.",
    ],
    choices: OKAY,
  },
  [DialogueType.CHIT_CHAT_3]: {
    dialogue: [
      "I see. Well too bad, I think it's important to keep things tidy.",
    ],
    choices: OKAY,
  },
};
