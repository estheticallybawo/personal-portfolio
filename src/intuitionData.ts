// Each round mixes one shared personal fact with two unrelated fictional
// statements. Choices stay unscored: the answers belong in a conversation,
// not an answer key in the browser.
export const intuitionRounds = [
  {
    id: "round-one",
    category: "First impressions",
    options: [
      "I can juggle three oranges without dropping one.",
      "I taught myself how to ride a bicycle.",
      "I’ve never tasted coffee.",
    ],
  },
  {
    id: "round-two",
    category: "A little backstory",
    options: [
      "I once won a karaoke competition.",
      "I collect postcards from every city I visit.",
      "I fell inside a gutter as a child.",
    ],
  },
  {
    id: "round-three",
    category: "More than meets the eye",
    options: [
      "I have trypophobia and I’m scared of heights.",
      "I can write neatly with both hands.",
      "I once slept through an entire concert.",
    ],
  },
  {
    id: "round-four",
    category: "Follow your instinct",
    options: [
      "I’ve been an extra in a movie.",
      "I can’t decide which shade of blue is my favorite.",
      "I can name every country in Africa from memory.",
    ],
  },
  {
    id: "round-five",
    category: "One last guess",
    options: [
      "I once cooked a full meal for thirty people.",
      "I can finish a 1,000-piece puzzle in one afternoon.",
      "I started school in Primary 3.",
    ],
  },
] as const;
