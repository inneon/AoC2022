const findStartMarker =
  (headerSize: number) =>
  (input: string): number => {
    for (let i = headerSize; i < input.length; i++) {
      const candidateHeader = input.slice(i - headerSize, i)
      const uniqueLetters = new Set(candidateHeader.split(""))
      if (uniqueLetters.size === headerSize) {
        return i
      }
    }
    return 0
  }

export const findStartOfPacket = findStartMarker(4)
export const findStartOfMessage = findStartMarker(14)
