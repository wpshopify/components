import { ProductPriceSingle } from '../../single'
import { ProductPriceFrom } from '../../from'
import { ProductPricingSeparator } from '../../separator'

function ProductPricingRangeGroup({ firstPrice, lastPrice, currencyCode, compareAt }) {
  return (
    <>
      {firstPrice !== lastPrice && <ProductPriceFrom compareAt={compareAt} />}
      <ProductPriceSingle price={firstPrice} currencyCode={currencyCode} />
      <ProductPricingSeparator />
      <ProductPriceSingle price={lastPrice} currencyCode={currencyCode} />
    </>
  )
}

export { ProductPricingRangeGroup }
