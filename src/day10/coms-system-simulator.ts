type CommsWatcher = (x: number, cycle: number) => void

class CommsSystem {
  private readonly _program: string[]

  private _programCounter: number = 0
  private _cycleCounter: number = 0

  private _x: number = 1

  private readonly _subscribers: { [key: string]: CommsWatcher } = {}

  constructor(program: string[]) {
    this._program = program
  }

  simulate() {
    this._x = 1
    this._cycleCounter = 0
    this._programCounter = 0

    while (this._programCounter < this._program.length) {
      this._step()
    }
  }

  subscribe(subscription: CommsWatcher) {
    const uId = Math.random().toString()
    this._subscribers[uId] = subscription

    return () => {
      delete this._subscribers[uId]
    }
  }

  private _incrementCycle() {
    this._cycleCounter += 1

    Object.values(this._subscribers).forEach((subscriber) =>
      subscriber(this._x, this._cycleCounter),
    )
  }

  private _step() {
    const instruction = this._program[this._programCounter]
    this._programCounter++
    if (instruction === "noop") {
      this._incrementCycle()
      return
    }

    const addxMatcher = /addx (-?\d+)/
    const addxMatches = addxMatcher.exec(instruction)
    if (addxMatches) {
      this._incrementCycle()
      this._incrementCycle()
      const [_, amount] = addxMatches
      this._x += Number(amount)
      return
    }
  }
}

export const simulateSystem = (input: string): number => {
  const comms = new CommsSystem(input.split("\n"))
  let signalStrength = 0
  const unsubscribe = comms.subscribe((x, cycle) => {
    if ([20, 60, 100, 140, 180, 220].indexOf(cycle) !== -1) {
      signalStrength += x * cycle
    }
  })
  comms.simulate()

  unsubscribe()
  return signalStrength
}

export const drawScreen = (input: string): string => {
  const comms = new CommsSystem(input.split("\n"))
  const screen = Array(6).fill("")
  let row = 0
  const unsubscribe = comms.subscribe((x, cycle) => {
    cycle = cycle % 40
    const offByOne = cycle === 0 ? 40 : cycle
    const isPixelOn = offByOne === x || offByOne === x + 1 || offByOne === x + 2
    const char = isPixelOn ? "#" : "."
    screen[row] = screen[row] + char

    if (cycle === 0) {
      row++
    }
  })
  comms.simulate()

  unsubscribe()
  return screen.join("\n")
}
