import React, { useContext } from 'react'
import { CartProvider } from './_state/provider'
import { ShopContext } from '../shop/_state/context'
// import { CartWrapper } from './wrapper'

const CartWrapper = React.lazy(() => import('./wrapper'))

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
