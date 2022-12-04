const isCompleteOverlap = (
  firstLower: number,
  firstUpper: number,
  secondLower: number,
  secondUpper: number,
) =>
  (firstLower <= secondLower && firstUpper >= secondUpper) ||
  (firstLower >= secondLower && firstUpper <= secondUpper)

const isPartialOverlap = (
  firstLower: number,
  firstUpper: number,
  secondLower: number,
  secondUpper: number,
) =>
  (firstLower <= secondLower && secondLower <= firstUpper) ||
  (firstLower <= secondUpper && secondUpper <= firstUpper) ||
  isCompleteOverlap(firstLower, firstUpper, secondLower, secondUpper)

type OverlapType = (
  firstLower: number,
  firstUpper: number,
  secondLower: number,
  secondUpper: number,
) => boolean

const findOverlaps = (overlapType: OverlapType) => (input: string) => {
  const linePattern = /(\d+)-(\d+),(\d+)-(\d+)/
  const assignments = input.split("\n").map((elfPair) => {
    const [_all, firstLower, firstUpper, secondLower, secondUpper] =
      linePattern.exec(elfPair) as RegExpExecArray
    return {
      firstLower: Number(firstLower),
      firstUpper: Number(firstUpper),
      secondLower: Number(secondLower),
      secondUpper: Number(secondUpper),
    }
  })

  const overlaps = assignments.filter(
    ({ firstLower, firstUpper, secondLower, secondUpper }) =>
      overlapType(firstLower, firstUpper, secondLower, secondUpper),
  )

  return overlaps.length
}

export const findCompleteOverlaps = findOverlaps(isCompleteOverlap)

export const findParialOverlaps = findOverlaps(isPartialOverlap)
