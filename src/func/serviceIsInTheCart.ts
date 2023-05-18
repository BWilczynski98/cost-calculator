import type { CartStateProps } from '../store/cart-slice'
import type { ServicesKeys } from '../types/servicesKeys'

export const serviceIsInTheCart = (
  cart: CartStateProps[],
  requirementsArray: string[],
  expectedServiceKey: ServicesKeys
) => {
  const result = cart.some((item) => )

  return result
}
