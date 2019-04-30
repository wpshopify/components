import React from 'react'

import { CartTitle } from '../title'
import { CartClose } from '../close'

function CartHeader() {
   return (
      <section className='wps-cart-header wps-container-fluid'>
         <div className='wps-row'>
            <CartTitle />
            <CartClose />
         </div>
      </section>
   )
}

export { CartHeader }
