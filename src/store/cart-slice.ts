import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ServiceType } from '../types/service'
import { RootState } from './store'

export type CartItem = ServiceType & { duration: string[] }

type ServiceIdType = { serviceId: number }

export type CartStateProps = {
  cart: CartItem[]
}

const initialState: CartStateProps = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<CartItem>) => {
      state.cart.push(payload)
    },
    deleteServiceFromCart: (state, { payload }: PayloadAction<ServiceIdType>) => {
      state.cart = state.cart.filter((service) => service.id !== payload.serviceId)
    },
  },
})

const getCart = (state: RootState) => state.cart

export const cartSelector = {
  selectCartItems: createSelector(getCart, (cart) => cart.cart),
}
export const cartActions = cartSlice.actions
