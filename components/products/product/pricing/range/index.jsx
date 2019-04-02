import React from 'react'
import { ProductPriceFrom } from '../from'
import { ProductPriceSingle } from '../single'
import { ProductPricingRangeGroup } from './group'

function ProductPricingRange({ firstPrice, lastPrice, isFirstAndLastSame }) {
   return (
      <>
         <ProductPriceFrom />

         {isFirstAndLastSame ? <ProductPriceSingle price={firstPrice} /> : <ProductPricingRangeGroup firstPrice={firstPrice} lastPrice={lastPrice} />}
      </>
   )
}

export { ProductPricingRange }
