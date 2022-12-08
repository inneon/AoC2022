export const findNumberOfVisibleTrees = (input: string): number => {
  const map = toNumberGrid(input)
  const coords = cartesianProduct(
    Array(map[0].length)
      .fill(null)
      .map((_, i) => i),
    Array(map.length)
      .fill(null)
      .map((_, i) => i),
  )

  return coords.filter(([x, y]) => isVisible(x, y, map)).length
}

export const findMostScenicTree = (input: string): number => {
  const map = toNumberGrid(input)
  const coords = cartesianProduct(
    Array(map[0].length)
      .fill(null)
      .map((_, i) => i),
    Array(map.length)
      .fill(null)
      .map((_, i) => i),
  )

  const scores = coords.map(([x, y]) => scoreCoord(x, y, map))
  return Math.max(...scores)
}

const toNumberGrid = (input: string): number[][] =>
  input.split("\n").map((line) => line.split("").map((char) => Number(char)))

const cartesianProduct = <T>(a: T[], b: T[]) =>
  a.reduce<[T, T][]>((p, x) => [...p, ...b.map<[T, T]>((y) => [x, y])], [])

const isVisible = (x: number, y: number, map: number[][]): boolean =>
  isVisibleSingleDirection(x, y, map, -1, 0) ||
  isVisibleSingleDirection(x, y, map, 1, 0) ||
  isVisibleSingleDirection(x, y, map, 0, -1) ||
  isVisibleSingleDirection(x, y, map, 0, 1)

const isVisibleSingleDirection = (
  x: number,
  y: number,
  map: number[][],
  directionX: 1 | 0 | -1,
  directionY: 1 | 0 | -1,
): boolean => {
  for (
    let dx = x + directionX, dy = y + directionY;
    0 <= dx && dx < map[0].length && 0 <= dy && dy < map.length;
    dx += directionX, dy += directionY
  ) {
    if (map[dy][dx] >= map[y][x]) {
      return false
    }
  }
  return true
}

const scoreCoord = (x: number, y: number, map: number[][]) =>
  scoreSingleDirection(x, y, map, -1, 0) *
  scoreSingleDirection(x, y, map, 1, 0) *
  scoreSingleDirection(x, y, map, 0, -1) *
  scoreSingleDirection(x, y, map, 0, 1)

const scoreSingleDirection = (
  x: number,
  y: number,
  map: number[][],
  directionX: 1 | 0 | -1,
  directionY: 1 | 0 | -1,
): number => {
  let score = 0
  for (
    let dx = x + directionX, dy = y + directionY;
    0 <= dx && dx < map[0].length && 0 <= dy && dy < map.length;
    dx += directionX, dy += directionY
  ) {
    score++
    if (map[dy][dx] >= map[y][x]) {
      return score
    }
  }
  return score
}
