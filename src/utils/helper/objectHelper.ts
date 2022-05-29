export function completeAssign<T>(...sources): T {
  const target = {}
  sources.forEach((item) => {
    Object.keys(item).reduce((prev, current) => {
      if (item[current] !== undefined) {
        prev[current] = item[current]
      }
      return prev
    }, target)
  })
  return target as T
}
