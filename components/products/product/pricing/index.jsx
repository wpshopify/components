import React, { useContext, useEffect, useState } from 'react'
import { getPrices } from '../../../../common/pricing/data'
import { ProductContext } from '../context'
import { ProductPrice } from './price'
import { usePortal } from '../../../../common/hooks'

function ProductPricing() {
   const { productState } = useContext(ProductContext)
   const [prices, setPrices] = useState([])
   const [showingRange, setShowingRange] = useState(false)
   const [showingCompareAt, setShowingCompareAt] = useState(false)

   function isShowingCompareAt(state) {
      return state.pricing.showing_compare_at
   }

   function isShowingRange(state) {
      return state.pricing.showing_price_range
   }

   useEffect(() => {
      setShowingRange(isShowingRange(productState))
      setShowingCompareAt(isShowingCompareAt(productState))

      if (isShowingRange(productState)) {
         console.log('lllllllllllllll')

         setPrices(getPrices(productState.product, 'asc'))
      } else {
         console.log('ggggggggggggggggg')
         setPrices(getPrices(productState.product))
      }

      console.log(':::::::::: prices', prices)
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
      productState
   )
}

export { ProductPricing }
