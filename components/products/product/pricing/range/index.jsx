import React from 'react'
import { ProductPriceSingle } from '../single'
import { ProductPricingRangeGroup } from './group'

function ProductPricingRange({ firstPrice, lastPrice, isFirstAndLastSame }) {
   return isFirstAndLastSame ? <ProductPriceSingle price={firstPrice} /> : <ProductPricingRangeGroup firstPrice={firstPrice} lastPrice={lastPrice} />
}

export { ProductPricingRange }
