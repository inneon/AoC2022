const bagToSet = (bag: string) => {
  return Object.keys(
    bag.split("").reduce<{ [item: string]: true }>((accum, item) => {
      return { ...accum, [item]: true }
    }, {}),
  )
}

const findMispackedItems = (frontHalf: string, backHalf: string): string => {
  const frontUnique = bagToSet(frontHalf)

  const candidates = frontUnique.filter((item) => {
    return backHalf.indexOf(item) !== -1
  })
  if (candidates.length !== 1) {
    throw Error(`Didn't find a match for ${frontHalf} & ${backHalf}`)
  }
  return candidates[0]
}

const getPriority = (item: string): number => {
  if (item === item.toLowerCase()) {
    return item.charCodeAt(0) - "a".charCodeAt(0) + 1
  }
  return item.charCodeAt(0) - "A".charCodeAt(0) + 27
}

export const findMispackPriorities = (input: string): number => {
  const backpacks = input.split("\n").map((backpack) => {
    const halfSize = backpack.length / 2
    const frontHalf = backpack.slice(0, halfSize)
    const backHalf = backpack.slice(halfSize)
    return { frontHalf, backHalf }
  })

  return backpacks
    .map(({ frontHalf, backHalf }) => findMispackedItems(frontHalf, backHalf))
    .map(getPriority)
    .reduce((prev, curr) => prev + curr)
}

const getCommonItem = (bags: string[]): string => {
  const [firstBag, secondBag, thridBag] = bags.map(bagToSet)
  const [result] = firstBag
    .filter((item) => secondBag.indexOf(item) !== -1)
    .filter((item) => thridBag.indexOf(item) !== -1)
  return result
}

export const findGroupPriorities = (input: string) => {
  const lines = input.split("\n")
  const groups = lines.reduce<string[][]>((prev, curr, i) => {
    const index = Math.floor(i / 3)
    prev[index] = [...prev[index], curr]
    return prev
  }, Array(lines.length / 3).fill([]))

  const commonItems = groups.map(getCommonItem)

  return commonItems.map(getPriority).reduce((prev, curr) => prev + curr)
}
