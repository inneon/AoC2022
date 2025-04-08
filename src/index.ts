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
import {
  findStartOfPacket,
  findStartOfMessage,
} from "./day06/communication-tuner"
import {
  findSmallestFileToDelete,
  findSmallFileSystems,
} from "./day07/file-system-parser"
import {
  findMostScenicTree,
  findNumberOfVisibleTrees,
} from "./day08/forrest-mapper"
import {
  countLongTailVisitedSpaces,
  countTailVisitedSpaces,
} from "./day09/rope-simulator"
import {
  findMostActiveMonkies,
  findMostActiveMonkiesII,
} from "./day11/monkey-tracker"
import { drawScreen, simulateSystem } from "./day10/coms-system-simulator"
import { climbHill, steepestElevationSteps } from "./day12/hill-climber"
import {
  findDecoderKey,
  getCorrectlyOrderedMessages,
} from "./day13/code-descrambler"
import {
  getMaximumSandUnits,
  getMaximumSandUnitsWithFloor,
} from "./day14/reservoir-fillter"
import { findNonBeaconSpaces, getTuningFrequency } from "./day15/beacon-finder"
import { calculateMaxFlow } from "./day17/tunnel-valve-opener"

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
app.get("/day06/a", handlerWrapper("6", findStartOfPacket))
app.get("/day06/b", handlerWrapper("6", findStartOfMessage))
app.get("/day07/a", handlerWrapper("7", findSmallFileSystems))
app.get("/day07/b", handlerWrapper("7", findSmallestFileToDelete))
app.get("/day08/a", handlerWrapper("8", findNumberOfVisibleTrees))
app.get("/day08/b", handlerWrapper("8", findMostScenicTree))
app.get("/day09/a", handlerWrapper("9", countTailVisitedSpaces))
app.get("/day09/b", handlerWrapper("9", countLongTailVisitedSpaces))
app.get("/day10/a", handlerWrapper("10", simulateSystem))
app.get("/day10/b", handlerWrapper("10", drawScreen))
app.get("/day11/a", handlerWrapper("11", findMostActiveMonkies))
app.get("/day11/b", handlerWrapper("11", findMostActiveMonkiesII))
app.get("/day12/a", handlerWrapper("12", climbHill))
app.get("/day12/b", handlerWrapper("12", steepestElevationSteps))
app.get("/day13/a", handlerWrapper("13", getCorrectlyOrderedMessages))
app.get("/day13/b", handlerWrapper("13", findDecoderKey))
app.get("/day14/a", handlerWrapper("14", getMaximumSandUnits))
app.get("/day14/b", handlerWrapper("14", getMaximumSandUnitsWithFloor))
app.get("/day15/a", handlerWrapper("15", findNonBeaconSpaces(2000000)))
app.get("/day15/b", handlerWrapper("15", getTuningFrequency(4000000)))
app.get("/day16/a", handlerWrapper("16", calculateMaxFlow))

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))
