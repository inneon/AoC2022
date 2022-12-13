import { canClimb, climbHill, steepestElevationSteps } from "./hill-climber"

describe("climbing the hill", () => {
  it("finds the fewest steps to climb the hill", () => {
    const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`
    expect(climbHill(input)).toBe(31)
  })

  it("finds the fewest steps to climb a different hill", () => {
    const input = `Sabqponm
abcryyxl
accszExk
acctuvwj
abdefghi`
    expect(climbHill(input)).toBe(29)
  })

  it("finds the shortest steps from lowest to highest elevation", () => {
    const input = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`
    expect(steepestElevationSteps(input)).toBe(29)
  })

  describe("single steps", () => {
    it("can climb to the same height", () => {
      expect(canClimb("a", "a")).toBe(true)
    })
    it("can climb to up one", () => {
      expect(canClimb("a", "b")).toBe(true)
    })
    it("cannot climb to up two", () => {
      expect(canClimb("a", "c")).toBe(false)
    })
    it("can climb to down two", () => {
      expect(canClimb("c", "a")).toBe(true)
    })
    it("can climb from y to end", () => {
      expect(canClimb("y", "E")).toBe(true)
    })
  })
})
