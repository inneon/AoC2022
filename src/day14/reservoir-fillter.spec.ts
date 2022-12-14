import {
  getMaximumSandUnits,
  getMaximumSandUnitsWithFloor,
} from "./reservoir-fillter"

describe("filling the reservoir", () => {
  const input = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`

  it("counts the maximum units of sand", () => {
    expect(getMaximumSandUnits(input)).toBe(24)
  })

  it("counts the maximum units of sand with a floor", () => {
    expect(getMaximumSandUnitsWithFloor(input)).toBe(93)
  })
})
