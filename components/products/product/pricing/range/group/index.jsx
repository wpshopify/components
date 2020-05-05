import ProductPriceSingle from '../../single'
import ProductPriceFrom from '../../from'
import { ProductPricingSeparator } from '../../separator'

function ProductPricingRangeGroup({
  firstPrice,
  lastPrice,
  currencyCode,
  compareAt,
  showPriceRange,
  selectedVariant,
}) {
  return (
    <>
      {firstPrice !== lastPrice && (
        <ProductPriceFrom
          compareAt={compareAt}
          showPriceRange={showPriceRange}
          selectedVariant={selectedVariant}
        />
      )}
      <ProductPriceSingle
        price={firstPrice}
        compareAt={compareAt}
        currencyCode={currencyCode}
        showPriceRange={showPriceRange}
      />
      <ProductPricingSeparator />
      <ProductPriceSingle
        price={lastPrice}
        compareAt={compareAt}
        currencyCode={currencyCode}
        showPriceRange={showPriceRange}
      />
    </>
  )
}

export default wp.element.memo(ProductPricingRangeGroup)
