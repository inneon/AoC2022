import { findStartOfPacket, findStartOfMessage } from "./communication-tuner"

describe("day 06", () => {
  it("finds the start of the packet", () => {
    const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"

    expect(findStartOfPacket(input)).toBe(7)
  })

  it("finds the start of the message", () => {
    const input = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"

    expect(findStartOfMessage(input)).toBe(19)
  })
})
