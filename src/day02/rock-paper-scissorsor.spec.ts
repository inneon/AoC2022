import { scoreAmendedStrategy, scoreStrategy } from "./rock-paper-scissorsor"

describe("playing rock paper scissors", () => {
  it("scores the stragegy", () => {
    const input = `A Y
B X
C Z`

    expect(scoreStrategy(input)).toBe(15)
  })

  it("scores the amended stragegy", () => {
    const input = `A Y
B X
C Z`

    expect(scoreAmendedStrategy(input)).toBe(12)
  })
})
