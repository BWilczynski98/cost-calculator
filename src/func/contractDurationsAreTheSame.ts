export const contractDurationsAreTheSame = (arr1: string[], arr2: string[] | undefined): boolean => {
  if (arr1?.length !== arr2?.length) {
    return false
  }

  return arr1.every((el) => arr2.includes(el))
}
