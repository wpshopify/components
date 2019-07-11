import React, { useContext } from 'react'
import { CartButton } from './button'
import { CartContext } from '../_state/context'
import uuidv4 from 'uuid/v4'

function CartButtons() {
   const [cartState] = useContext(CartContext)

   return (
      <>
         {cartState.buttons.map(buttonOptions => (
            <CartButton key={uuidv4()} options={buttonOptions} />
         ))}
      </>
   )
}

export default CartButtons
