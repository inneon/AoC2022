export const countTailVisitedSpaces = (input: string): number => {
  const instructions = input.split("\n")

  const uniqueSpaces = new Set<string>()

  instructions.reduce(
    ({ head, tail }, instruction) =>
      doInstruction(instruction, head, tail, ({ x, y }) => {
        uniqueSpaces.add(`${x}, ${y}`)
      }),
    {
      head: { x: 0, y: 0 },
      tail: [{ x: 0, y: 0 }],
    },
  )

  return uniqueSpaces.size
}

export const countLongTailVisitedSpaces = (input: string): number => {
  const instructions = input.split("\n")

  const uniqueSpaces = new Set<string>()

  instructions.reduce(
    ({ head, tail }, instruction) =>
      doInstruction(instruction, head, tail, ({ x, y }) => {
        uniqueSpaces.add(`${x}, ${y}`)
      }),
    {
      head: { x: 0, y: 0 },
      tail: Array(9).fill({ x: 0, y: 0 }),
    },
  )

  return uniqueSpaces.size
}

interface Coord {
  x: number
  y: number
}

const doInstruction = (
  instruction: string,
  head: Coord,
  tail: Coord[],
  onTailVisit: (coord: Coord) => void,
) => {
  const [dir, dist] = instruction.split(" ")
  const distance = Number(dist)
  const direction = dir as "U" | "D" | "L" | "R"

  let tailNext: Coord[] = tail

  for (let i = 0; i < distance; i++) {
    head = moveHead(head, direction)

    tailNext = tailNext.reduce<{ leader: Coord; all: Coord[] }>(
      ({ leader, all }, segment) => {
        const segmentNext = follow(leader, segment)
        return { leader: segmentNext, all: [...all, segmentNext] }
      },
      { leader: head, all: [] },
    ).all
    onTailVisit(tailNext[tailNext.length - 1])
  }

  return { head, tail: tailNext }
}

const moveHead = ({ x, y }: Coord, direction: "U" | "D" | "L" | "R"): Coord => {
  switch (direction) {
    case "L":
      x--
      break
    case "R":
      x++
      break
    case "U":
      y--
      break
    case "D":
      y++
      break
  }
  return { x, y }
}

const follow = (
  { x: headX, y: headY }: Coord,
  { x: tailX, y: tailY }: Coord,
): Coord => {
  const xDist = headX - tailX
  const yDist = headY - tailY

  if (Math.abs(xDist) === 2) {
    tailX += xDist / 2
    tailY += yDist
  } else if (Math.abs(yDist) === 2) {
    tailX += xDist
    tailY += yDist / 2
  }

  return { x: tailX, y: tailY }
}
