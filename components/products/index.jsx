import React from 'react'
import { Product } from './product'
import { ProductsProvider } from './_state/provider'

function Products({ options }) {
   return (
      <ProductsProvider options={options}>
         {console.log('options', options)}
         {options.payload.map(product => (
            <Product payload={product} />
         ))}
      </ProductsProvider>
   )
}

export { Products }
