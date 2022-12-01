import axios from "axios"

export const runRequestWithInput = async (
  day: string,
  handler: (input: string) => string | number,
  cookie?: string,
): Promise<{ result: string | number }> => {
  if (!cookie) {
    throw Error("No cookie has been sent for getting the input")
  }
  const input = await getInput(day, cookie)
  return { result: handler(input) }
}

const getInput = async (day: string, cookie: string) => {
  const response = await axios.get(
    `https://adventofcode.com/2022/day/${day}/input`,
    {
      headers: {
        cookie,
      },
    },
  )

  const data: string = response.data
  return data.trim()
}
