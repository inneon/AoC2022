import { Coord } from "../helpers/coord"

export const findNonBeaconSpaces =
  (row: number) =>
  (input: string): number => {
    const sensors = parseInput(input)
    const beaconAt = (x: number) =>
      getBeaconsSpaces(sensors, row).indexOf(x) !== -1
    const nonBeaconSpaces = sensors.reduce<{ [key: number]: true }>(
      (accumulator, { sensorX, sensorY, beaconX, beaconY }) => {
        const mhDist = manhattanDistance(sensorX, sensorY, beaconX, beaconY)
        const yDist = Math.abs(sensorY - row)
        for (let i = 0; i <= mhDist - yDist; i++) {
          if (!beaconAt(sensorX + i)) accumulator[sensorX + i] = true
          if (!beaconAt(sensorX - i)) accumulator[sensorX - i] = true
        }
        return accumulator
      },
      {},
    )
    return Object.keys(nonBeaconSpaces).length
  }

export const getTuningFrequency = (bounds: number) => (input: string) => {
  const sensors = parseInput(input).map(
    ({ sensorX, sensorY, beaconX, beaconY }) => ({
      sensorX,
      sensorY,
      beaconX,
      beaconY,
      beaconDistance: manhattanDistance(sensorX, sensorY, beaconX, beaconY),
    }),
  )

  const candidateSpaces = getAllPerimeters(sensors)

  let candidateGenerator = candidateSpaces.next()
  while (!candidateGenerator.done) {
    const candidate = candidateGenerator.value
    if (inBounds(candidate, bounds)) {
      if (isOutsideSensorRange(candidate, sensors)) {
        return candidate.x * 4000000 + candidate.y
      }
    }
    candidateGenerator = candidateSpaces.next()
  }

  return -1
}

function* getAllPerimeters(
  sensors: { sensorX: number; sensorY: number; beaconDistance: number }[],
) {
  for (let { sensorX: x, sensorY: y, beaconDistance } of sensors) {
    const distance = beaconDistance + 1
    for (let i = 0; i < distance; i++) {
      yield { x: x + i, y: y + distance - i }
      yield { x: x + distance - i, y: y - i }
      yield { x: x - i, y: y - distance + i }
      yield { x: x - distance + i, y: y + i }
    }
  }
}

const inBounds = ({ x, y }: Coord, bounds: number) =>
  0 <= x && x <= bounds && 0 <= y && y <= bounds

const isOutsideSensorRange = (
  { x, y }: Coord,
  sensors: { sensorX: number; sensorY: number; beaconDistance: number }[],
) => {
  for (let { sensorX, sensorY, beaconDistance } of sensors) {
    if (manhattanDistance(sensorX, sensorY, x, y) <= beaconDistance) {
      return false
    }
  }

  return true
}

const getBeaconsSpaces = (
  beacons: { beaconX: number; beaconY: number }[],
  row: number,
) =>
  Array.from(
    new Set(
      beacons
        .filter(({ beaconY }) => beaconY === row)
        .map(({ beaconX }) => beaconX),
    ),
  )

export const manhattanDistance = (
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
) => {
  return Math.abs(fromX - toX) + Math.abs(fromY - toY)
}

export const parseInput = (input: string) =>
  input.split("\n").map((line) => {
    const parser =
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
    const match = parser.exec(line)
    if (!match) throw Error(`Couldn't parse ${line}`)

    const [_, sensorX, sensorY, beaconX, beaconY] = match

    return {
      sensorX: Number(sensorX),
      sensorY: Number(sensorY),
      beaconX: Number(beaconX),
      beaconY: Number(beaconY),
    }
  })
