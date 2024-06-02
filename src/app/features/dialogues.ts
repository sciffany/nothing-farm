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

const I_QUIPS = [
  "I find peace in the quiet moments, tending to my crops. It's where I belong.",
  "The fields don't judge me. They just need care and patience, like I do.",
  "I prefer the company of plants. They grow silently, just like my thoughts.",
  "The sound of the wind through the wheat is all the conversation I need.",
  "I often lose myself in the rhythm of planting. It's my way of escaping the chaos.",
  "Sometimes, I wonder if people understand me as well as these seeds do.",
  "The solitude of the farm allows me to think and dream without interruption.",
  "Animals are easier to understand. They don't need words, just kindness.",
  "I find comfort in routines. They keep my mind at ease and my heart steady.",
  "My favorite time of day is dusk, when the world is quiet, and I can reflect in peace.",
];

const E_QUIPS = [
  "I love how the market comes alive with people. It's the best part of the day!",
  "Nothing beats a good chat while harvesting. Who's up for some company?",
  "The festival is coming up! I can't wait to see everyone and celebrate!",
  "Working together in the fields makes the time fly. Let's make it fun!",
  "I thrive on the energy of the town. The more people, the better!",
  "Hey neighbor! Got any stories to share while we plant these seeds?",
  "I enjoy throwing barn parties. It's the perfect way to unwind after a day's work.",
  "Being around others gives me so much energy. Let's make this farm the talk of the town!",
  "I love hearing everyone's ideas. Let's brainstorm how to make this place even better!",
  "Seeing all the smiling faces at the market makes all the hard work worthwhile!",
];

const N_QUIPS = [
  "I feel there's something magical about this land. Can you sense it too?",
  "Every seed holds a story waiting to unfold. I love imagining the possibilities.",
  "The patterns of the seasons fascinate me. There's so much to learn from them.",
  "I often dream about the future of our farm. I see it thriving in ways we can't yet imagine.",
  "There's a deeper connection between us and nature. We just need to tune in.",
  "Have you ever wondered what secrets lie beneath this soil?",
  "I get lost in thought while working. This farm is more than just crops; it's a canvas for our dreams.",
  "Let's experiment with new farming techniques. The world is full of endless potential!",
  "Every plant seems to whisper its own story. If we listen, we might learn something profound.",
  "I believe the stars guide our harvests. There's a cosmic dance at play here.",
];

const S_QUIPS = [
  "I love the feel of the soil between my fingers. It means we're working hard.",
  "The crisp morning air is the best part of farming. You can really feel the day's potential.",
  "Nothing beats the satisfaction of a well-plowed field. It's tangible progress.",
  "I focus on each task at hand. Step by step, that's how we build a great farm.",
  "The sound of the river nearby is soothing. It's nature's way of keeping us grounded.",
  "I enjoy measuring our yields. It's proof of our hard work paying off.",
  "Have you noticed how the weather affects our crops? Every detail counts.",
  "I love seeing the fruits of our labor, literally. Fresh produce means we've done well.",
  "Keeping track of our inventory is essential. It's the foundation of a successful farm.",
  "Smelling the fresh hay in the barn is the best reward after a long day of work.",
];

const T_QUIPS = [
  "I love the unpredictability of farming. Each day brings new surprises!",
  "Let's keep our options open. You never know what opportunities might come up.",
  "I enjoy trying new things. Let's plant something different this season!",
  "Spontaneity keeps life interesting. Who knows what we'll discover today?",
  "I prefer going with the flow. Rigid plans aren't for me.",
  "Flexibility is key in farming. Let's adapt to whatever comes our way.",
  "I find joy in exploring different ways to improve the farm. Experimentation is fun!",
  "Let's not rush. We'll figure things out as we go.",
  "I like to take things one day at a time. No need to plan too far ahead.",
  "Variety is the spice of life! Let's mix things up and see what happens.",
];

const F_QUIPS = [
  "I believe in fostering a sense of community. Let's help our neighbors whenever we can.",
  "It's important to me that everyone feels valued and appreciated on the farm.",
  "Let's choose crops that will bring the most joy to the townsfolk.",
  "I want to create a farm that's not just successful, but also brings happiness to others.",
  "I trust my instincts and emotions when making decisions. They guide me well.",
  "How do you feel about this new plan? Your opinion matters to me.",
  "Building strong relationships is just as important as growing healthy crops.",
  "I find meaning in the work we do and the connections we make with others.",
  "Let's take a moment to appreciate our hard work and the beauty of what we've created.",
  "It's important to me that our farm is a welcoming and warm place for everyone.",
];

const P_QUIPS = [
  "I love the unpredictability of farming. Each day brings new surprises!",
  "Let's keep our options open. You never know what opportunities might come up.",
  "I enjoy trying new things. Let's plant something different this season!",
  "Spontaneity keeps life interesting. Who knows what we'll discover today?",
  "I prefer going with the flow. Rigid plans aren't for me.",
  "Flexibility is key in farming. Let's adapt to whatever comes our way.",
  "I find joy in exploring different ways to improve the farm. Experimentation is fun!",
  "Let's not rush. We'll figure things out as we go.",
  "I like to take things one day at a time. No need to plan too far ahead.",
  "Variety is the spice of life! Let's mix things up and see what happens.",
];

const J_QUIPS = [
  "I believe in having a clear plan. It keeps us focused and efficient.",
  "Let's set some goals for the season. It helps us stay on track.",
  "I like having a schedule. It ensures everything gets done on time.",
  "Order and organization are crucial for a successful farm.",
  "I prefer sticking to a routine. It brings a sense of stability and progress.",
  "Planning ahead helps us avoid unnecessary surprises and setbacks.",
  "I always make a to-do list. It feels great to check off completed tasks.",
  "Let's establish some guidelines. It makes working together smoother.",
  "Consistency is key. Regular maintenance keeps the farm running smoothly.",
  "I believe in doing things by the book. It's the best way to ensure quality and success.",
];

export const QUIPS = {
  I: I_QUIPS,
  E: E_QUIPS,
  N: N_QUIPS,
  S: S_QUIPS,
  T: T_QUIPS,
  F: F_QUIPS,
  P: P_QUIPS,
  J: J_QUIPS,
};
