import React from 'react'
import { ShopProvider } from './_state/provider'
import { Bootstrap } from '../bootstrap'

function Shop(props) {
   return (
      <>
         <ShopProvider>
            <Bootstrap>{props.children}</Bootstrap>
         </ShopProvider>
      </>
   )
}

export { Shop }
