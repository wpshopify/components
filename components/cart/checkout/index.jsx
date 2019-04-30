import React, { useContext } from 'react'
import { ShopContext } from '../../shop/_state/context'
import { CartContext } from '../_state/context'

function CartCheckout() {
   const [shopState] = useContext(ShopContext)
   const [cartState] = useContext(CartContext)

   function handleCheckout() {}

   return (
      <>
         <button className='wps-btn wps-btn-checkout' onClick={handleCheckout} data-wps-is-ready={shopState.isShopReady}>
            {cartState.checkoutText}
         </button>
      </>
   )
}

export { CartCheckout }
