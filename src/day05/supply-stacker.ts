type CrateStack = string[][]

const parseInput = (input: string) => {
  const [topHalf, bottomHalf] = input.split("\n\n")
  const [stackPositions, ...crates] = topHalf.split("\n").reverse()
  const emptyStacks = Array<string[]>(
    stackPositions.split(/\s+/).filter((position) => position).length,
  ).fill([])

  const indexToCrate = (index: number) => index * 4 + 1
  const crateStacks = crates.reduce((accumulator, crateRow) => {
    for (let i = 0; i < accumulator.length; i++) {
      const crate = crateRow.charAt(indexToCrate(i))
      if (crate !== " ") {
        accumulator[i] = [...accumulator[i], crate]
      }
    }
    return accumulator
  }, emptyStacks)

  return { crateStacks, instructions: bottomHalf.trim().split("\n") }
}

const parseInstruction = (instruction: string) => {
  const match = /move (\d+) from (\d+) to (\d+)/.exec(instruction)

  if (!match) throw Error("instruction line is not well formed")

  const [_all, quantity, from, to] = match

  return {
    quantity: Number(quantity),
    from: Number(from) - 1,
    to: Number(to) - 1,
  }
}

const executeInstructionCrateMover9000 = (
  instruction: string,
  cratestack: CrateStack,
) => {
  const { quantity, from, to } = parseInstruction(instruction)

  for (let i = 0; i < quantity; i++) {
    const crate = cratestack[from].pop()
    if (!crate) throw Error("crate stack is empty")
    cratestack[to].push(crate)
  }

  return cratestack
}

const executeInstructionCrateMover9001 = (
  instruction: string,
  cratestack: CrateStack,
) => {
  const { quantity, from, to } = parseInstruction(instruction)

  const fromStack = cratestack[from]
  const moved = fromStack.slice(-quantity)
  cratestack[from] = cratestack[from].slice(0, -quantity)

  cratestack[to] = [...cratestack[to], ...moved]

  return cratestack
}

const toOutput = (crates: CrateStack): string =>
  crates.reduce((accum, stack) => accum + stack.pop(), "")

export const stackSuppliesCrateMover9000 = (input: string): string => {
  const { crateStacks, instructions } = parseInput(input)

  const finalState = instructions.reduce(
    (stacks, instruction) =>
      executeInstructionCrateMover9000(instruction, stacks),
    crateStacks,
  )

  return toOutput(finalState)
}

export const stackSuppliesCrateMover9001 = (input: string): string => {
  const { crateStacks, instructions } = parseInput(input)

  const finalState = instructions.reduce(
    (stacks, instruction) =>
      executeInstructionCrateMover9001(instruction, stacks),
    crateStacks,
  )

  return toOutput(finalState)
}
