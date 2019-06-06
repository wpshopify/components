import React from 'react'
import { ProductPriceSingle } from '../../single'
import { ProductPriceFrom } from '../../from'
import { ProductPricingSeparator } from '../../separator'

function ProductPricingRangeGroup({ firstPrice, lastPrice }) {
   return (
      <>
         {firstPrice !== lastPrice && <ProductPriceFrom />}
         <ProductPriceSingle price={firstPrice} />
         <ProductPricingSeparator />
         <ProductPriceSingle price={lastPrice} />
      </>
   )
}

export { ProductPricingRangeGroup }
