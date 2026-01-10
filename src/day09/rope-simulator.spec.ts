import {
  countLongTailVisitedSpaces,
  countTailVisitedSpaces,
} from "./rope-simulator"

describe("rope simulator", () => {
  it("finds the spaces the tail has visited", () => {
    const input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

    expect(countTailVisitedSpaces(input)).toBe(13)
  })

  it("finds the spaces the long tail has visited", () => {
    const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`

    expect(countLongTailVisitedSpaces(input)).toBe(36)
  })
})
