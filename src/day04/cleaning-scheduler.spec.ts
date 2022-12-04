import { findCompleteOverlaps, findParialOverlaps } from "./cleaning-scheduler"

describe("elf cleaning schedule", () => {
  it("finds the number of full overlaps", () => {
    const input = `2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8`

    expect(findCompleteOverlaps(input)).toBe(2)
  })
  it("finds the number of partial overlaps", () => {
    const input = `2-4,6-8
    2-3,4-5
    5-7,7-9
    2-8,3-7
    6-6,4-6
    2-6,4-8`

    expect(findParialOverlaps(input)).toBe(4)
  })
})
