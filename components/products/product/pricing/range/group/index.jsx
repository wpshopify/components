import { ProductPriceSingle } from '../../single'
import { ProductPriceFrom } from '../../from'
import { ProductPricingSeparator } from '../../separator'

function ProductPricingRangeGroup({ firstPrice, lastPrice, currencyCode }) {
  return (
    <>
      {firstPrice !== lastPrice && <ProductPriceFrom />}
      <ProductPriceSingle price={firstPrice} currencyCode={currencyCode} />
      <ProductPricingSeparator />
      <ProductPriceSingle price={lastPrice} currencyCode={currencyCode} />
    </>
  )
}

export { ProductPricingRangeGroup }
