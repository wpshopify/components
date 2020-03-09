import { ProductQuantity } from './quantity'
import { ProductOptions } from './options'
import { ProductAddButton } from './add-button'
import { ProductBuyButtonProvider } from './_state/provider'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement, FilterHook } from '../../../../common/utils'

const { Notice } = wp.components
const { useContext } = wp.element
const { __ } = wp.i18n

function ProductBuyButton() {
  const [shopState] = useContext(ShopContext)
  const [itemsState] = useContext(ItemsContext)
  const [productState] = useContext(ProductContext)

  return usePortal(
    <div
      className='wps-buy-button-wrapper'
      data-wps-is-ready={shopState.isCartReady ? '1' : '0'}
      data-wps-component-order='0'>
      <FilterHook
        name='product.buyButton.before'
        args={[productState]}
        isReady={shopState.isShopReady}
      />

      <ProductBuyButtonProvider productState={productState}>
        {productState.payload.availableForSale ? (
          <>
            {!itemsState.payloadSettings.hideQuantity && <ProductQuantity />}
            {productState.hasManyVariants && <ProductOptions />}

            <ProductAddButton />
          </>
        ) : (
          <FilterHook
            name='products.buyButton.unavailable.html'
            hasHTML={true}
            args={[productState]}>
            <Notice status='warning' isDismissible={false}>
              <FilterHook name='notice.unavailable.text'>
                {__('Out of stock', wpshopify.misc.textdomain)}
              </FilterHook>
            </Notice>
          </FilterHook>
        )}
      </ProductBuyButtonProvider>

      <FilterHook
        name='product.buyButton.after'
        args={[productState]}
        isReady={shopState.isShopReady}
      />
    </div>,
    findPortalElement(productState.element, itemsState.payloadSettings.dropzoneProductBuyButton)
  )
}

export default ProductBuyButton
