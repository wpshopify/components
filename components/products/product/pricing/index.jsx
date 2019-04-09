import React, { useContext, useEffect, useState } from 'react'
import { getPrices } from '../../../../common/pricing/data'
import { ProductContext } from '../context'
import { ProductPrice } from './price'
import { usePortal } from '../../../../common/hooks'

function isShowingCompareAt(state) {
   return state.componentOptions.showing_compare_at
}

function isShowingRange(state) {
   return state.componentOptions.showing_price_range
}

function ProductPricing() {
   const { productState } = useContext(ProductContext)
   const [prices, setPrices] = useState([])
   const [showingRange, setShowingRange] = useState(isShowingRange(productState))
   const [showingCompareAt, setShowingCompareAt] = useState(isShowingCompareAt(productState))

   useEffect(() => {
      setShowingRange(isShowingRange(productState))
      setShowingCompareAt(isShowingCompareAt(productState))

      if (isShowingRange(productState)) {
         setPrices(getPrices(productState.product, 'asc'))
      } else {
         setPrices(getPrices(productState.product))
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
