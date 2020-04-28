import { ProductPriceSingle } from '../single'
import { ProductPricingRangeGroup } from './group'

function ProductPricingRange({ firstPrice, lastPrice, isFirstAndLastSame, currencyCode }) {
  return isFirstAndLastSame ? (
    <ProductPriceSingle price={firstPrice} currencyCode={currencyCode} />
  ) : (
    <ProductPricingRangeGroup
      firstPrice={firstPrice}
      lastPrice={lastPrice}
      currencyCode={currencyCode}
    />
  )
}

export { ProductPricingRange }
