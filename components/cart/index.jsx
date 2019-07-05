import React, { useContext } from 'react'
import { CartProvider } from './_state/provider'
import { CartWrapper } from './wrapper'
import { ShopContext } from '../shop/_state/context'

function Cart({ options }) {
   const [shopState, shopDispatch] = useContext(ShopContext)

   return (
      shopState.settings.cart.cartLoaded && (
         <CartProvider options={options}>
            <CartWrapper />
         </CartProvider>
      )
   )
}

export { Cart }
