import React, { useContext, useRef, useEffect } from 'react'
import { CartHeader } from '../header'
import { CartContents } from '../contents'
import { CartFooter } from '../footer'
import { CartContext } from '../_state/context'

function CartBody() {
   const [cartState, cartDispatch] = useContext(CartContext)
   const cart = useRef()

   return (
      <section ref={cart} className='wps-cart'>
         <CartHeader />
         <CartContents isCartEmpty={cartState.isCartEmpty} checkoutCache={cartState.checkoutCache} />
         <CartFooter />
      </section>
   )
}

export { CartBody }
