export const makeGrid = <T>(x: number, y: number, fill: T): T[][] =>
  Array(y)
    .fill(null)
    .map((_) => Array(x).fill(fill))
