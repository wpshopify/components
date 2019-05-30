import React, { useContext } from 'react'
import { ShopContext } from '../../shop/_state/context'

function CartClose() {
   const [shopState, shopDispatch] = useContext(ShopContext)

   function closeCart() {
      console.log('<CartClose> - closeCart')

      shopDispatch({ type: 'CLOSE_CART' })
   }

   return (
      <button className='wps-btn-close wps-modal-close-trigger' title='Close Cart' onClick={closeCart}>
         <span className='wps-modal-close-trigger'>×</span>
      </button>
   )
}

export { CartClose }
