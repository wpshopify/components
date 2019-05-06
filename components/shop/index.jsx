import React from 'react'
import { ShopProvider } from './_state/provider'
import { Bootstrap } from '../bootstrap'

function Shop({ options, children }) {
   return (
      <ShopProvider options={options}>
         <Bootstrap>{children}</Bootstrap>
      </ShopProvider>
   )
}

export { Shop }
