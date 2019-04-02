import React from 'react'
import { ProductPriceSingle } from '../../single'
import { ProductPricingSeparator } from '../../separator'

function ProductPricingRangeGroup({ firstPrice, lastPrice }) {
   return (
      <>
         <ProductPriceSingle price={firstPrice} />
         <ProductPricingSeparator />
         <ProductPriceSingle price={lastPrice} />
      </>
   )
}

export { ProductPricingRangeGroup }
