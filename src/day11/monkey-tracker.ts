type MonkeyState = {
  items: number[]
  inspections: number
  operation: string
  testDivisor: number
  onTrue: number
  onFalse: number
}[]

export const findMostActiveMonkies = (input: string): number => {
  const endState = Array(20)
    .fill(null)
    .reduce<MonkeyState>((state) => doRound(state, 3), parseInput(input))

  const [mostActive, secondMostActive] = endState
    .map(({ inspections }) => inspections)
    .sort((a, b) => b - a)

  return mostActive * secondMostActive
}

export const findMostActiveMonkiesII = (input: string): number => {
  const endState = Array(10000)
    .fill(null)
    .reduce<MonkeyState>((state, _, i) => doRound(state, 1), parseInput(input))

  const [mostActive, secondMostActive] = endState
    .map(({ inspections }) => inspections)
    .sort((a, b) => b - a)

  return mostActive * secondMostActive
}

export const parseInput = (input: string): MonkeyState => {
  const blocks = input.split("\n\n")
  const parsed = blocks.map((block) => {
    const regex =
      /Starting items: ([\d, ]+)[^O]+Operation: new = ([a-z1-9 +\-\*/]+)[^T]+Test: divisible by ([0-9]+)[^I]+If true: throw to monkey (\d+)[^I]+If false: throw to monkey (\d+)/ms
    const matches = regex.exec(block)
    if (matches === null) {
      throw Error("block could not be parsed " + block)
    }

    const [_, startingItems, operation, test, onTrue, onFalse] = matches

    return {
      items: startingItems.split(", ").map((x) => Number(x)),
      operation,
      testDivisor: Number(test),
      onTrue: Number(onTrue),
      onFalse: Number(onFalse),
      inspections: 0,
    }
  }, {})
  return parsed
}

export const doRound = (
  state: MonkeyState,
  worryReducer: number,
): MonkeyState => {
  const invariantNumber = state.reduce<number>(
    (prev, { testDivisor }) => prev * testDivisor,
    1,
  )
  for (let i = 0; i < state.length; i++) {
    const monkey = state[i]
    monkey.items.forEach((item) => {
      let nextValue = Math.floor(
        eval(`((old) => ${monkey.operation})(${item})`) / worryReducer,
      )

      while (nextValue > invariantNumber) {
        nextValue -= invariantNumber
      }

      if (nextValue > Number.MAX_SAFE_INTEGER) {
        console.warn(nextValue, invariantNumber, Number.MAX_SAFE_INTEGER)
      }

      const divisorCheck = nextValue / monkey.testDivisor

      const passedTo =
        Math.round(divisorCheck) === divisorCheck
          ? monkey.onTrue
          : monkey.onFalse

      state[passedTo].items.push(nextValue)
      monkey.inspections += monkey.items.length
      monkey.items = []
    })
  }

  return state
}
