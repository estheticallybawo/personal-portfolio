// Based on personal stories Esther shared, with alternative versions for the
// game. Choices stay unscored: the answers belong in a conversation, not an
// answer key in the browser.
export const intuitionRounds = [
  {
    id: "cycling",
    category: "On two wheels",
    options: [
      "A friend taught me how to ride a bicycle.",
      "I taught myself how to ride a bicycle.",
      "I learned to ride a bicycle with an instructor.",
    ],
  },
  {
    id: "childhood",
    category: "A childhood plot twist",
    options: [
      "My childhood fall landed me in a swimming pool.",
      "My childhood fall landed me in a sandpit.",
      "My childhood fall landed me in a gutter.",
    ],
  },
  {
    id: "fears",
    category: "Little fears",
    options: [
      "I have trypophobia and I’m scared of heights.",
      "I’m scared of heights, but I don’t have trypophobia.",
      "I have trypophobia, but heights don’t scare me.",
    ],
  },
  {
    id: "blue",
    category: "My blue dilemma",
    options: [
      "I’ve already settled on one favorite shade of blue.",
      "I can’t decide which shade of blue is my favorite.",
      "I don’t like any shade of blue.",
    ],
  },
  {
    id: "school",
    category: "The first classroom",
    options: [
      "I started school in Primary 1.",
      "I started school in Primary 2.",
      "I started school in Primary 3.",
    ],
  },
] as const;
