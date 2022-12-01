import Express from "express"

import { runRequestWithInput } from "./input-fetcher"
import { countCalories, countTopThreeCalories } from "./day01/day01"

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

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
