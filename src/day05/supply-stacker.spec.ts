import {
  stackSuppliesCrateMover9000,
  stackSuppliesCrateMover9001,
} from "./supply-stacker"

describe("supply stacking", () => {
  it("stacks the supplies in the right order", () => {
    const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

    expect(stackSuppliesCrateMover9000(input)).toBe("CMZ")
  })

  it("stacks the supplies in the right order for crate mover 9001", () => {
    const input = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

    expect(stackSuppliesCrateMover9001(input)).toBe("MCD")
  })
})
