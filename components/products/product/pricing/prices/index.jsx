import { ProductPricingContext } from '../_state/context'
import { ProductContext } from '../../_state/context'
import ProductPrice from '../price'

import ProductPricesCompareAt from '../compare-at'

const { useContext } = wp.element

function ProductPrices() {
  const [productPricingState] = useContext(ProductPricingContext)
  const [productState] = useContext(ProductContext)

  return !productState.selectedVariant ||
    (productState.selectedVariant.compareAtPriceV2 && productPricingState.showCompareAt) ? (
    <ProductPricesCompareAt
      selectedVariant={productState.selectedVariant}
      prices={productPricingState.prices}
      currencyCode={productPricingState.currencyCode}
      showPriceRange={productPricingState.showPriceRange}
      compareAt={productPricingState.showCompareAt}
    />
  ) : (
    <ProductPrice
      selectedVariant={productState.selectedVariant}
      compareAt={false}
      prices={productPricingState.prices}
      currencyCode={productPricingState.currencyCode}
      showPriceRange={productPricingState.showPriceRange}
    />
  )
}

export { ProductPrices }
