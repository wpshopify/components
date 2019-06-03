import React, { useContext } from 'react'
import { ShopContext } from '../../shop/_state/context'

function CartNote() {
   const [shopState] = useContext(ShopContext)

   return (
      <section className='wps-cart-notes'>
         <label value='Checkout notes' htmlFor='wps-input-notes'>
            Notes:
         </label>
         <textarea placeholder={shopState.settings.cart.cartNotesPlaceholder} id='wps-input-notes' className='wps-input wps-input-textarea' />
      </section>
   )
}

export { CartNote }
