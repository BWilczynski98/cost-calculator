export type ServiceType = {
  id: number
  nameService: string
  prices: {
    currency: string
    year2023: number
    year2024: number
    year2025: number
  }
  promotionOptions: {
    status: boolean
    description: string
  }
}
