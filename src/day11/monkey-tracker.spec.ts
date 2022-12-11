import {
  doRound,
  findMostActiveMonkies,
  findMostActiveMonkiesII,
  parseInput,
} from "./monkey-tracker"

describe("monkey tracking", () => {
  const input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1`
  it("tracks which items the monkies start with", () => {
    const parsed = parseInput(input)

    expect(parsed).toEqual([
      {
        items: [79, 98],
        operation: "old * 19",
        testDivisor: 23,
        onTrue: 2,
        onFalse: 3,
        inspections: 0,
      },
      {
        items: [54, 65, 75, 74],
        operation: "old + 6",
        testDivisor: 19,
        onTrue: 2,
        onFalse: 0,
        inspections: 0,
      },
      {
        items: [79, 60, 97],
        operation: "old * old",
        testDivisor: 13,
        onTrue: 1,
        onFalse: 3,
        inspections: 0,
      },
      {
        items: [74],
        operation: "old + 3",
        testDivisor: 17,
        onTrue: 0,
        onFalse: 1,
        inspections: 0,
      },
    ])
  })

  it("does one round", () => {
    expect(doRound(parseInput(input), 3)).toEqual([
      {
        items: [20, 23, 27, 26],
        operation: "old * 19",
        testDivisor: 23,
        onTrue: 2,
        onFalse: 3,
        inspections: 2,
      },
      {
        items: [2080, 25, 167, 207, 401, 1046],
        operation: "old + 6",
        testDivisor: 19,
        onTrue: 2,
        onFalse: 0,
        inspections: 4,
      },
      {
        items: [],
        operation: "old * old",
        testDivisor: 13,
        onTrue: 1,
        onFalse: 3,
        inspections: 3,
      },
      {
        items: [],
        operation: "old + 3",
        testDivisor: 17,
        onTrue: 0,
        onFalse: 1,
        inspections: 5,
      },
    ])
  })

  it("finds the most active monkies", () => {
    expect(findMostActiveMonkies(input)).toEqual(10605)
  })

  it("finds the most active monkies part ii", () => {
    expect(findMostActiveMonkiesII(input)).toEqual(2713310158)
  })
})
