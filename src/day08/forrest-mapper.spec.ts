import { findMostScenicTree, findNumberOfVisibleTrees } from "./forrest-mapper"

describe("forrest mapper", () => {
  it("can find the number of visible trees", () => {
    const input = `30373
25512
65332
33549
35390`

    expect(findNumberOfVisibleTrees(input)).toBe(21)
  })

  it("can find the most scenic tree", () => {
    const input = `30373
25512
65332
33549
35390`

    expect(findMostScenicTree(input)).toBe(8)
  })
})
