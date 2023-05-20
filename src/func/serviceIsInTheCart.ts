import { CartItem } from '../types/service'
import { ServicesKeys } from '../types/servicesKeys'

export const serviceIsInTheCart = (cart: CartItem[], serviceKey: ServicesKeys): boolean => {
  const isAdded = cart.some((item) => item.id === serviceKey)
  return isAdded
}
