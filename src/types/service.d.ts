export type ServiceType = {
  id: number
  nameService: string
  prices: {
    currency: string
    [year: number]: number
  }
  promotionOptions: {
    status: boolean
    description: string
  }
}
