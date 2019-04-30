import React, { useContext } from 'react'
import { CartContext } from '../_state/context'

function CartTitle() {
   const [cartState] = useContext(CartContext)

   return (
      <div className='wps-col-8 wps-p-0'>
         <h2 className='wps-cart-title'>{cartState.title}</h2>
      </div>
   )
}

export { CartTitle }
