export type PriceType = {
  [key: string]: number
}

export type ServiceType = {
  id: number
  nameService: string
  prices: PriceType
}

export type CartItem = Omit<ServiceType, 'prices'> & {
  price: number
  duration: string[]
}
