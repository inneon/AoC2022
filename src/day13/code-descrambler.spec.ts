import {
  findDecoderKey,
  getCorrectlyOrderedMessages,
  isCorrectlySorted,
  sort,
} from "./code-descrambler"

describe("descrambling code", () => {
  const input = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

  it("finds the number of inputs in the wrong order", () => {
    expect(getCorrectlyOrderedMessages(input)).toBe(13)
  })

  it("compares arrays at the same level", () => {
    const left = [1, 1, 3, 1, 1]
    const right = [1, 1, 5, 1, 1]

    expect(isCorrectlySorted(left, right)).toBe("correct")
  })

  it("compares nested arrays", () => {
    const left = [[1], [2, 3, 4]]
    const right = [[1], 4]

    expect(isCorrectlySorted(left, right)).toBe("correct")
  })

  it("compares different length arrays", () => {
    const left = [[4, 4], 4, 4]
    const right = [[4, 4], 4, 4, 4]

    expect(isCorrectlySorted(left, right)).toBe("correct")
  })

  it("sorts the packets correctly", () => {
    const input = [
      [1, 1, 3, 1, 1],
      [1, 1, 5, 1, 1],
      [[1], [2, 3, 4]],
      [[1], 4],
      [9],
      [[8, 7, 6]],
      [[4, 4], 4, 4],
      [[4, 4], 4, 4, 4],
      [7, 7, 7, 7],
      [7, 7, 7],
      [],
      [3],
      [[[]]],
      [[]],
      [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
    ]

    expect(sort(input)).toEqual([
      [],
      [[]],
      [[[]]],
      [1, 1, 3, 1, 1],
      [1, 1, 5, 1, 1],
      [[1], [2, 3, 4]],
      [1, [2, [3, [4, [5, 6, 0]]]], 8, 9],
      [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
      [[1], 4],
      [3],
      [[4, 4], 4, 4],
      [[4, 4], 4, 4, 4],
      [7, 7, 7],
      [7, 7, 7, 7],
      [[8, 7, 6]],
      [9],
    ])
  })

  it("finds the right decoder key", () => {
    expect(findDecoderKey(input)).toBe(140)
  })
})
