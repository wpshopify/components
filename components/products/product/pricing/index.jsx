import React, { useContext, useEffect, useState } from 'react'
import { getPrices } from '../../../../common/pricing/data'
import { ProductContext } from '../_state/context'
import { ProductsContext } from '../../_state/context'

import { ProductPrice } from './price'
import { usePortal } from '../../../../common/hooks'

function ProductPricing() {
   const { productsState } = useContext(ProductsContext)
   const { productState } = useContext(ProductContext)
   const [prices, setPrices] = useState([])
   const [showingRange, setShowingRange] = useState(isShowingRange(productState))
   const [showingCompareAt, setShowingCompareAt] = useState(isShowingCompareAt(productState))

   function isShowingCompareAt() {
      return productsState.componentOptions.showingCompareAt
   }

   function isShowingRange() {
      return productsState.componentOptions.showingPriceRange
   }

   useEffect(() => {
      setShowingRange(isShowingRange())
      setShowingCompareAt(isShowingCompareAt())

      if (isShowingRange()) {
         setPrices(getPrices(productState.payload, 'asc'))
      } else {
         setPrices(getPrices(productState.payload))
      }
   }, [])

   return usePortal(
      <>
         {showingCompareAt ? (
            <>
               <ProductPrice range={showingRange} compareAt={true} prices={prices} />
               <ProductPrice range={showingRange} compareAt={false} prices={prices} />
            </>
         ) : (
            <ProductPrice range={showingRange} compareAt={showingCompareAt} prices={prices} />
         )}
      </>,
      productState.element
   )
}

export { ProductPricing }
