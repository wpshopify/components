import React from 'react'
import { CartButtons } from './buttons'
import { CartBody } from './body'
import { CartProvider } from './_state/provider'

function Cart({ options }) {
   return (
      <>
         <CartProvider options={options}>
            <CartButtons />
            <CartBody />
         </CartProvider>
      </>
   )
}

export { Cart }
