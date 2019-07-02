import React, { useContext } from 'react'
import { Product } from './product'
import { Pagination } from '../pagination'
import { ShopContext } from '../shop/_state/context'

function Products() {
   const [shopState] = useContext(ShopContext)

   console.log('<Products> shopState', shopState)

   return (
      <Pagination shopSettings={shopState.settings}>
         <Product />
      </Pagination>
   )
}

export { Products }
