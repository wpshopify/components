import React, { useContext } from 'react'
import { Collection } from './collection'
import { Pagination } from '../pagination'
import { ShopContext } from '../shop/_state/context'

function Collections() {
   const [shopState] = useContext(ShopContext)

   return (
      <Pagination shopSettings={shopState.settings}>
         <Collection isShopReady={shopState.isShopReady} shopInfo={shopState.info} shopSettings={shopState.settings} />
      </Pagination>
   )
}

export { Collections }
