import React, { useContext } from 'react'
import { CartButton } from './button'
import { CartContext } from '../_state/context'
import uuidv4 from 'uuid/v4'

function CartButtons({ buttons }) {
   return (
      <>
         {buttons.map(buttonOptions => (
            <CartButton key={uuidv4()} options={buttonOptions} />
         ))}
      </>
   )
}

export default React.memo(CartButtons)
