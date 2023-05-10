import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ServiceType } from '../types/service'
import { RootState } from './store'

type CartItem = ServiceType & { duration: string[] }

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
    addToCart: (state, action) => {
      state.cart.push(action.payload)
    },
  },
})

const getCart = (state: RootState) => state.cart

export const cartSelector = {
  selectCartItems: createSelector(getCart, (cart) => cart.cart),
}
export const cartActions = cartSlice.actions
