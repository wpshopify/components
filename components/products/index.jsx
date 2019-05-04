import React from 'react'
import { Product } from './product'
import { Pagination } from '../pagination'
import { ProductsProvider } from './_state/provider'

function Products({ options }) {
   return (
      <ProductsProvider options={options}>
         <Pagination options={options}>
            <Product />
         </Pagination>
      </ProductsProvider>
   )
}

export { Products }
