import React from 'react'

import { CartTitle } from '../title'
import { CartClose } from '../close'

function CartHeader() {
   return (
      <section className='wps-cart-header container-fluid'>
         <div className='row'>
            <CartTitle />
            <CartClose />
         </div>
      </section>
   )
}

export { CartHeader }
