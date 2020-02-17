import { ProductBuyButtonContext } from '../_state/context'

import { ShopContext } from '../../../../shop/_state/context'
import { ItemsContext } from '../../../../items/_state/context'
import { ProductQuantityLabel } from './label'
import { ProductQuantityInput } from './input'

const { useContext } = wp.element

function ProductQuantity() {
  const [buyButtonState] = useContext(ProductBuyButtonContext)

  const [shopState] = useContext(ShopContext)
  const [itemsState] = useContext(ItemsContext)

  return (
    <div
      className='wps-component wps-component-products-quantity'
      data-wps-is-component-wrapper
      data-wps-product-id={buyButtonState.product.id}
      data-wps-post-id=''>
      <div className='wps-form-control row wps-product-quantity-wrapper m-0'>
        <ProductQuantityLabel
          showQuantityLabel={itemsState.payloadSettings.showQuantityLabel}
          isShopReady={shopState.isShopReady}
          label={itemsState.payloadSettings.quantityLabelText}
        />

        <ProductQuantityInput
          minQuantity={itemsState.payloadSettings.minQuantity}
          maxQuantity={itemsState.payloadSettings.maxQuantity}
          isShopReady={shopState.isShopReady}
        />
      </div>
    </div>
  )
}

export { ProductQuantity }
