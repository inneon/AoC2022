interface ValveState {
  current: string
  openValves: string[]
  flowRate: number
  totalFlow: number
  shortCutting: boolean
  history: string[]
}
const startState = (valves: string[]): ValveState => {
  return {
    current: "AA",
    openValves: [],
    flowRate: 0,
    totalFlow: 0,
    shortCutting: false,
    history: [],
  }
}
export const calculateMaxFlow = (input: string): number => {
  const tunnels = parseInput(input)

  const targetNumberOfOpenValves = Object.values(tunnels).filter(
    ({ rate }) => rate >= 0,
  ).length

  let states = [startState(Object.keys(tunnels))]

  const simluationLength = 30

  for (let minutes = 0; minutes < simluationLength; minutes++) {
    const allPossibleNextStates = states.reduce<ValveState[]>(
      (
        accumulator,
        { current, openValves, flowRate, totalFlow, shortCutting, history },
      ) => {
        if (shortCutting) {
          return [
            ...accumulator,
            { current, openValves, flowRate, totalFlow, shortCutting, history },
          ]
        }

        const currentActions: ValveState[] = []
        const currentFlowRate = tunnels[current].rate
        if (openValves.indexOf(current) === -1 && currentFlowRate !== 0) {
          const nextOpenValves = [...openValves, current].sort()
          if (nextOpenValves.length === targetNumberOfOpenValves) {
            const remainingSteps = simluationLength - minutes - 1
            const nextTotalFlow =
              totalFlow +
              remainingSteps * flowRate +
              (remainingSteps - 1) * currentFlowRate
            return [
              ...accumulator,
              {
                current,
                openValves: nextOpenValves,
                totalFlow: nextTotalFlow,
                flowRate: flowRate + currentFlowRate,
                shortCutting: true,
                history,
              },
            ]
          }
          currentActions.push({
            current,
            openValves: nextOpenValves,
            flowRate: flowRate + currentFlowRate,
            totalFlow: totalFlow + flowRate,
            shortCutting,
            history: [
              ...history,
              `Minute ${minutes}, ${openValves.join(
                ", ",
              )} are open releasing ${flowRate}, Open valve ${current}`,
            ],
          })
        }

        tunnels[current].to.forEach((to) => {
          currentActions.push({
            current: to,
            openValves,
            flowRate,
            totalFlow: totalFlow + flowRate,
            shortCutting,
            history: [
              ...history,
              `Minute ${minutes}, ${openValves.join(
                ", ",
              )} are open releasing ${flowRate}, Move to ${to}`,
            ],
          })
        })

        return [...accumulator, ...currentActions]
      },
      [],
    )

    states = prune(allPossibleNextStates)
  }

  const best = Math.max(...states.map(({ totalFlow }) => totalFlow))
  return Math.max(...states.map(({ totalFlow }) => totalFlow))
}

export const prune = (states: ValveState[]): ValveState[] => {
  const groupedByLocation = Object.values(
    states.reduce<{ [at: string]: ValveState[] }>((accumulator, current) => {
      const next = accumulator[current.current] ?? []
      return {
        ...accumulator,
        [current.current]: [...next, current],
      }
    }, {}),
  )

  const result = groupedByLocation
    .map((locationGroup) =>
      locationGroup.filter(
        (state, i) => !isStrictlyWorse(state, locationGroup, i),
      ),
    )
    .reduce<ValveState[]>((accum, location) => [...accum, ...location], [])

  return result
}

const isStrictlyWorse = (
  me: ValveState,
  others: ValveState[],
  myIndex: number,
): boolean => {
  return others.some((other, otherIndex) => {
    if (other === me) return false

    if (
      me.openValves.length < other.openValves.length &&
      me.totalFlow <= other.totalFlow
    ) {
      return me.openValves.every(
        (valve) => other.openValves.indexOf(valve) !== -1,
      )
    }

    if (
      me.openValves.length === other.openValves.length &&
      me.openValves.every((valve) => other.openValves.indexOf(valve) !== -1)
    ) {
      if (me.totalFlow < other.totalFlow) {
        return true
      }

      if (me.totalFlow === other.totalFlow) {
        return myIndex < otherIndex
      }
    }
  })
}

const parseInput = (input: string) => {
  const pattern =
    /Valve ([A-Z]+) has flow rate=(\d+); tunnels? leads? to valves? ([A-Z, ]+)/
  return input
    .split("\n")
    .map((line) => {
      const match = pattern.exec(line)
      if (!match) {
        throw Error(`Could not parse ${line}`)
      }

      const [_, from, rate, to] = match

      return {
        from,
        rate: Number(rate),
        to: to.split(", "),
      }
    })
    .reduce<{ [at: string]: { from: string; to: string[]; rate: number } }>(
      (accumulator, { from, ...rest }) => ({
        ...accumulator,
        [from]: { from, ...rest },
      }),
      {},
    )
}
