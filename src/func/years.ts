import type { PriceType } from "../types/service"

export const splitToYears = (objectToSplit: PriceType): string[] => {
  const years = Object.keys(objectToSplit)
    .filter((key) => key.startsWith('year'))
    .map((year) => year.slice(4))
  years.sort().join(',')
  return years
}
