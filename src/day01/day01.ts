const splitToLines = (input: string) =>
  input.split("\n").reduce<string[][]>(
    (prev, curr) => {
      if (curr === "") {
        return [[], ...prev]
      }
      const [bag, ...rest] = prev
      return [[...bag, curr], ...rest]
    },
    [[]],
  )

export const countCalories = (input: string): number => {
  const elfBags = splitToLines(input)

  const bagTotals = elfBags.map((bag) =>
    bag.map((calories) => Number(calories)).reduce((prev, curr) => prev + curr),
  )

  return Math.max(...bagTotals)
}

export const countTopThreeCalories = (input: string): number => {
  const elfBags = splitToLines(input)

  const bagTotals = elfBags.map((bag) =>
    bag.map((calories) => Number(calories)).reduce((prev, curr) => prev + curr),
  )

  const [topOne, topTwo, topThree] = bagTotals.sort((a, b) => b - a)
  return topOne + topTwo + topThree
}
