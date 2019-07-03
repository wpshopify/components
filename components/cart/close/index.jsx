import React, { useContext } from 'react'
import { CartContext } from '../_state/context'
import { toggleCart } from '../../../common/cart'

function CartClose() {
   const [cartState, cartDispatch] = useContext(CartContext)

   function onClose(e) {
      // cartDispatch({ type: 'TOGGLE', payload: false })
      toggleCart(false)
   }

   return (
      <button className='wps-btn-close wps-modal-close-trigger' title='Close Cart' onClick={onClose}>
         <span className='wps-modal-close-trigger'>×</span>
      </button>
   )
}

export { CartClose }
