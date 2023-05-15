type Props = {
  currency: string
  [year: number]: number
}

export const splitToYears = (objectToSplit: Props): string[] => {
  const years = Object.keys(objectToSplit)
    .filter((key) => key.startsWith('year'))
    .map((year) => year.slice(4))
  years.sort().join(",")
  return years
}
