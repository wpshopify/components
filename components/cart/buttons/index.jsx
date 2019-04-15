import React, { useContext, useRef, useEffect } from 'react'
import { CartButton } from './button'
import isEmpty from 'lodash/isEmpty'
import { CartContext } from '../context'

function CartButtons() {
   const { cartState } = useContext(CartContext)

   return (
      <>
         {isEmpty(cartState.buttons) && ''}

         {cartState.buttons.map(buttonOptions => (
            <CartButton key={buttonOptions.componentID} options={buttonOptions} />
         ))}
      </>
   )
}

export { CartButtons }
