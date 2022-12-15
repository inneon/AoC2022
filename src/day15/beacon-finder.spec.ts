import {
  findNonBeaconSpaces,
  getTuningFrequency,
  manhattanDistance,
  parseInput,
} from "./beacon-finder"

describe("beacon finder", () => {
  const input = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`
  it("finds the spaces where a beacon cannot be", () => {
    expect(findNonBeaconSpaces(10)(input)).toBe(26)
  })

  it("finds the manhattan distance", () => {
    const [{ sensorX, sensorY, beaconX, beaconY }] = parseInput(
      "Sensor at x=8, y=7: closest beacon is at x=2, y=10",
    )
    expect(manhattanDistance(sensorX, sensorY, beaconX, beaconY)).toBe(9)
  })

  it("finds the only other beacon spot", () => {
    expect(getTuningFrequency(20)(input)).toBe(56000011)
  })
})
