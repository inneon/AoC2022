import { countCalories, countTopThreeCalories } from "./day01"

describe("day 1", () => {
  it("counts the calories", () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

    expect(countCalories(input)).toBe(24000)
  })

  it("counts the top three calories", () => {
    const input = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`

    expect(countTopThreeCalories(input)).toBe(45000)
  })
})
