import Express from "express"

import { runRequestWithInput } from "./input-fetcher"
import { countCalories, countTopThreeCalories } from "./day01/day01"
import {
  scoreAmendedStrategy,
  scoreStrategy,
} from "./day02/rock-paper-scissorsor"
import {
  findGroupPriorities,
  findMispackPriorities,
} from "./day03/back-pack-packer"
import {
  findCompleteOverlaps,
  findParialOverlaps,
} from "./day04/cleaning-scheduler"
import {
  stackSuppliesCrateMover9000,
  stackSuppliesCrateMover9001,
} from "./day05/supply-stacker"

const PORT = 3000

const app = Express()
app.get("/internal/healthcheck", (_req, res) => {
  res.status(200).send("success")
})

const handlerWrapper =
  (day: string, handler: (input: string) => string | number) =>
  async (req: Express.Request, res: Express.Response) => {
    try {
      const result = await runRequestWithInput(day, handler, req.headers.cookie)
      res.status(200).send(result)
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong"
      res.status(500).send(message)
    }
  }

app.get("/day01/a", handlerWrapper("1", countCalories))
app.get("/day01/b", handlerWrapper("1", countTopThreeCalories))
app.get("/day02/a", handlerWrapper("2", scoreStrategy))
app.get("/day02/b", handlerWrapper("2", scoreAmendedStrategy))
app.get("/day03/a", handlerWrapper("3", findMispackPriorities))
app.get("/day03/b", handlerWrapper("3", findGroupPriorities))
app.get("/day04/a", handlerWrapper("4", findCompleteOverlaps))
app.get("/day04/b", handlerWrapper("4", findParialOverlaps))
app.get("/day05/a", handlerWrapper("5", stackSuppliesCrateMover9000))
app.get("/day05/b", handlerWrapper("5", stackSuppliesCrateMover9001))

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
