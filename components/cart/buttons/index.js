import React, { useContext, useRef, useEffect } from 'react'
import { CartButton } from './button'
import isEmpty from 'lodash/isEmpty'

function CartButtons({ options }) {
   console.log('options;;', options)

   return (
      <>
         {isEmpty(options) && ''}

         {options.map(buttonOption => (
            <CartButton key={buttonOption.componentID} options={buttonOption} />
         ))}
      </>
   )
}

export { CartButtons }
