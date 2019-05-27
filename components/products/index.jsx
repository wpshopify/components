import React from 'react'
import { Product } from './product'
import { Pagination } from '../pagination'

function Products() {
   console.log('p r o d u c t s')
   return (
      <Pagination>
         <Product />
      </Pagination>
   )
}

export { Products }
