export const zip = <In, Out>(as: In[], bs: In[], fn: (a: In, b: In) => Out) => {
  const res: Out[] = []
  for (let i = 0; i < as.length && i < bs.length; i++) {
    res.push(fn(as[i], bs[i]))
  }
  return res
}
