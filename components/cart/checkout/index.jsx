import React, { useContext } from 'react'
import { ShopContext } from '../../shop/_state/context'

function CartCheckout() {
   const [shopState] = useContext(ShopContext)

   function handleCheckout() {}

   return (
      <>
         <button className='wps-btn wps-btn-checkout' onClick={handleCheckout} data-wps-is-ready={shopState.isShopReady}>
            Checkout
         </button>
      </>
   )
}

export { CartCheckout }
