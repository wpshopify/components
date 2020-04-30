import { ProductPricingContext } from '../_state/context'
import { ProductContext } from '../../_state/context'
import { ProductPrice } from '../price'

const { useContext } = wp.element

function ProductPrices() {
  const [productPricingState] = useContext(ProductPricingContext)
  const [productState] = useContext(ProductContext)

  return productPricingState.showCompareAt && !productState.selectedVariant ? (
    <div className='wps-pricing-compare-at'>
      <ProductPrice compareAt={true} prices={productPricingState.prices} />
      <ProductPrice compareAt={false} prices={productPricingState.prices} />
    </div>
  ) : (
    <ProductPrice
      compareAt={productState.selectedVariant ? false : productPricingState.showCompareAt}
      prices={productPricingState.prices}
    />
  )
}

export { ProductPrices }
