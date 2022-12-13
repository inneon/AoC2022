const parse = (input: string) => {
  return input.split("\n\n").map((pair) => {
    const [left, right] = pair.split("\n")
    return {
      left: JSON.parse(left),
      right: JSON.parse(right),
    }
  })
}

export const getCorrectlyOrderedMessages = (input: string): number => {
  const pairs = parse(input).map(({ left, right }, i) => ({
    correct: isCorrectlySorted(left, right) === "correct",
    index: i + 1,
  }))

  return pairs
    .filter(({ correct }) => correct)
    .map(({ index }) => index)
    .reduce((prev, curr) => prev + curr, 0)
}

type NestedArray = number | NestedArray[]

export const isCorrectlySorted = (
  left: NestedArray,
  right: NestedArray,
): "correct" | "incorrect" | "indeterminte" => {
  if (!Array.isArray(left) && !Array.isArray(right)) {
    if (left === right) return "indeterminte"
    if (left < right) return "correct"
    return "incorrect"
  }

  if (!Array.isArray(left)) {
    return isCorrectlySorted([left], right)
  }
  if (!Array.isArray(right)) {
    return isCorrectlySorted(left, [right])
  }

  for (let i = 0; i < left.length; i++) {
    if (i >= right.length) return "incorrect"

    const res = isCorrectlySorted(left[i], right[i])
    if (res !== "indeterminte") return res
  }

  return left.length === right.length ? "indeterminte" : "correct"
}

export const findDecoderKey = (input: string) => {
  const packets = parse(input).reduce<NestedArray[]>(
    (accum, { left, right }) => [...accum, left, right],
    [],
  )
  const divider1 = [[2]]
  const divider2 = [[6]]
  const sorted = sort([...packets, divider1, divider2])

  const { div1Location, div2Location } = sorted.reduce<{
    div1Location: number
    div2Location: number
  }>(
    (accum, packet, i) => {
      if (packet === divider1) {
        return { ...accum, div1Location: i + 1 }
      }
      if (packet === divider2) {
        return { ...accum, div2Location: i + 1 }
      }
      return accum
    },
    { div1Location: 0, div2Location: 0 },
  )

  return div1Location * div2Location
}

export const sort = (inputs: NestedArray[]) => {
  return inputs.sort((a, b) =>
    isCorrectlySorted(a, b) === "incorrect" ? 1 : -1,
  )
}
