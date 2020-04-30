import { ProductPriceSingle } from '../single'
import { ProductPricingRangeGroup } from './group'

function ProductPricingRange({
  firstPrice,
  lastPrice,
  isFirstAndLastSame,
  currencyCode,
  compareAt,
}) {
  return isFirstAndLastSame ? (
    <ProductPriceSingle price={firstPrice} currencyCode={currencyCode} compareAt={compareAt} />
  ) : (
    <ProductPricingRangeGroup
      firstPrice={firstPrice}
      lastPrice={lastPrice}
      currencyCode={currencyCode}
      compareAt={compareAt}
    />
  )
}

export { ProductPricingRange }
