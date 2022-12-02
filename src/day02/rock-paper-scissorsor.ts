const ROCK = 1
const PAPER = 2
const SCISSORS = 3
const LOSS = 0
const DRAW = 3
const WIN = 6

const SOMETHING_WENT_WRONG = -99999999

const scoreRound = (round: string): number =>
  ({
    "A X": DRAW + ROCK,
    "A Y": WIN + PAPER,
    "A Z": LOSS + SCISSORS,
    "B X": LOSS + ROCK,
    "B Y": DRAW + PAPER,
    "B Z": WIN + SCISSORS,
    "C X": WIN + ROCK,
    "C Y": LOSS + PAPER,
    "C Z": DRAW + SCISSORS,
  }[round] ?? SOMETHING_WENT_WRONG)

export const scoreStrategy = (lines: string): number => {
  const stragegy = lines.split("\n")
  return stragegy.map(scoreRound).reduce((prev, curr) => prev + curr)
}

const scoreAmendedRound = (round: string): number =>
  ({
    "A X": LOSS + SCISSORS,
    "A Y": DRAW + ROCK,
    "A Z": WIN + PAPER,
    "B X": LOSS + ROCK,
    "B Y": DRAW + PAPER,
    "B Z": WIN + SCISSORS,
    "C X": LOSS + PAPER,
    "C Y": DRAW + SCISSORS,
    "C Z": WIN + ROCK,
  }[round] ?? SOMETHING_WENT_WRONG)

export const scoreAmendedStrategy = (lines: string): number => {
  const stragegy = lines.split("\n")
  return stragegy.map(scoreAmendedRound).reduce((prev, curr) => prev + curr)
}
