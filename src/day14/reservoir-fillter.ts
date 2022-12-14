import { makeGrid } from "../helpers/grid-makes"
import { zip } from "../helpers/zip"

export const getMaximumSandUnits = (input: string): number => {
  const parsed = parseInput(input)

  let sandUnits = 0
  const path = [{ x: 500, y: 0 }]
  while (settleSandUnit(parsed, path) === SettleSandUnitStatus.settled) {
    sandUnits++
  }
  return sandUnits
}

export const getMaximumSandUnitsWithFloor = (input: string): number => {
  const parsed = parseInput(input)
  const grid = [...parsed, Array(parsed[0].length).fill(".")]

  let sandUnits = 0
  const path = [{ x: 500, y: 0 }]
  while (settleSandUnit(grid, path) !== SettleSandUnitStatus.filled) {
    sandUnits++
  }
  return sandUnits
}

enum SettleSandUnitStatus {
  settled, // the unit came to rest
  fell, // the unit fell off the end of the grid
  filled, // the unit filled up the grid and blocked the source
}

const settleSandUnit = (
  grid: string[][],
  path: { x: number; y: number }[],
): SettleSandUnitStatus => {
  const previous = path.pop()
  if (!previous) {
    return SettleSandUnitStatus.filled
  }
  let { x, y } = previous
  let moved = true

  while (moved) {
    moved = false

    if ((grid[y + 1][x] ?? ".") === ".") {
      grid[y][x] = "."
      path.push({ x, y })
      y++
      moved = true
    } else if ((grid[y + 1][x - 1] ?? ".") === ".") {
      grid[y][x] = "."
      path.push({ x, y })
      y++
      x--
      moved = true
    } else if ((grid[y + 1][x + 1] ?? ".") === ".") {
      grid[y][x] = "."
      path.push({ x, y })
      y++
      x++
      moved = true
    }
    grid[y][x] = "o"
    if (y === grid.length - 1) {
      return SettleSandUnitStatus.fell
    }
  }
  return SettleSandUnitStatus.settled
}

const prettyPrint = (grid: string[][], minX: number) => {
  console.log(grid.map((line) => line.join("").slice(minX - 1)).join("\n"))
}

const parseInput = (input: string) => {
  const lines = input.split("\n")

  const paths = lines.map((line) =>
    line.split(" -> ").map((coord) => {
      const [x, y] = coord.split(",")
      return { x: Number(x), y: Number(y) }
    }),
  )

  const { maxX, maxY } = paths
    .flat()
    .reduce<{ maxX: number; maxY: number; minX: number; minY: number }>(
      ({ maxX, maxY, minX, minY }, { x, y }) => ({
        maxX: x > maxX ? x : maxX,
        maxY: y > maxY ? y : maxY,
        minX: x < minX ? x : minX,
        minY: y < minY ? y : minY,
      }),
      {
        maxX: 0,
        maxY: 0,
        minY: Number.MAX_SAFE_INTEGER,
        minX: Number.MAX_SAFE_INTEGER,
      },
    )

  const grid = makeGrid(maxX + 2, maxY + 1, ".")

  lines.reduce<string[][]>((grid, line) => {
    const coords = line.split(" -> ").map((coord) => {
      const [x, y] = coord.split(",")
      return { x: Number(x), y: Number(y) }
    })
    const [_, ...tail] = coords
    const coordPairs = zip(coords, tail, (from, to) => ({
      from,
      to,
    }))

    return coordPairs.reduce((grid, { from, to }) => {
      for (let x = Math.min(from.x, to.x); x <= Math.max(from.x, to.x); x++) {
        for (let y = Math.min(from.y, to.y); y <= Math.max(from.y, to.y); y++) {
          grid[y][x] = "#"
        }
      }
      return grid
    }, grid)
  }, grid)

  return grid
}
