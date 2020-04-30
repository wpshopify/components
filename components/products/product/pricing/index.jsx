import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { ProductPrices } from './prices'
import { ProductPricingProvider } from './_state/provider'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'

const { useContext } = wp.element

function ProductPricing() {
  console.log('<ProductPricing> :: Render Start')
  const [itemsState] = useContext(ItemsContext)
  const [productState] = useContext(ProductContext)

  return usePortal(
    <ProductPricingProvider productsState={itemsState} productState={productState}>
      <ProductPrices />
    </ProductPricingProvider>,
    findPortalElement(productState.element, itemsState.payloadSettings.dropzoneProductPricing)
  )
}

export { ProductPricing }
