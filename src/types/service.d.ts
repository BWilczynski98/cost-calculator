export type PriceType = {
  [key: string]: number
}

export type ServiceType = {
  id: number
  nameService: string
  prices: PriceType
  promotionOptions: {
    status: boolean
    description: string
  }
}
