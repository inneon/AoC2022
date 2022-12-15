import { Coord } from "../helpers/coord"
import { makeGrid } from "../helpers/grid-maker"
import { Queue } from "../helpers/queue"

const findStartAndEnd = (grid: string[][]) => {
  let start: Coord | null = null
  let end: Coord | null = null

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "S") {
        start = { x, y }
      }
      if (grid[y][x] === "E") {
        end = { x, y }
      }
    }
  }

  if (start === null || end === null) {
    throw Error("could not find start and end")
  }

  return { start, end }
}

const cardinalDirections = [
  { dx: 1, dy: 0 },
  { dx: -1, dy: 0 },
  { dx: 0, dy: 1 },
  { dx: 0, dy: -1 },
]

export const canClimb = (from: string, to: string) => {
  return from.charCodeAt(0) + 1 >= to.charCodeAt(0)
}

export const climbHill = (input: string): number => {
  const grid = input.split("\n").map((line) => line.split(""))
  const { start, end } = findStartAndEnd(grid)

  grid[start.y][start.x] = "a"
  grid[end.y][end.x] = "z"

  return distanceBetween(grid, start, end)
}

export const steepestElevationSteps = (input: string): number => {
  const grid = input.split("\n").map((line) => line.split(""))
  const { start, end } = findStartAndEnd(grid)

  grid[start.y][start.x] = "a"
  grid[end.y][end.x] = "z"

  const distances = Array(grid.length)
    .fill(null)
    .map((_, y) => {
      const start = { x: 0, y }
      return distanceBetween(grid, start, end)
    })

  return Math.min(...distances)
}

const distanceBetween = (grid: string[][], start: Coord, end: Coord) => {
  const toExplore = new Queue<Coord & { dist: number; path: Coord[] }>([
    { ...start, dist: 0, path: [start] },
  ])

  const explored: boolean[][] = makeGrid(grid[0].length, grid.length, false)

  const distMap: number[][] = makeGrid(grid[0].length, grid.length, 0)

  const inBounds = (x: number, y: number) => {
    return 0 <= x && x < grid[0].length && 0 <= y && y < grid.length
  }

  while (toExplore.length) {
    const { x, y, dist, path } = toExplore.dequeue()

    if (explored[y][x]) {
      continue
    }

    if (x === end.x && y === end.y) {
      return dist
    }

    explored[y][x] = true
    distMap[y][x] = dist

    cardinalDirections.forEach(({ dx, dy }) => {
      const nextX = x + dx
      const nextY = y + dy
      if (inBounds(nextX, nextY) && canClimb(grid[y][x], grid[nextY][nextX])) {
        toExplore.enqueue({
          x: nextX,
          y: nextY,
          dist: dist + 1,
          path: [...path, { x: nextX, y: nextY }],
        })
      }
    })
  }

  return -1
}
