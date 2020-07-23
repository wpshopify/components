/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import ProductQuantity from './quantity'
import ProductOptions from './options'
import ProductAddButton from './add-button'
import { ProductBuyButtonProvider } from './_state/provider'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { getButtonText } from '../../../../common/settings'
import { onlyAvailableOptionsFromVariants } from '../../../../common/variants'
import { findPortalElement, FilterHook } from '../../../../common/utils'

function ProductBuyButton() {
  const { Notice } = wp.components
  const { useContext } = wp.element
  const [itemsState] = useContext(ItemsContext)
  const [productState, productDispatch] = useContext(ProductContext)
  const isDirectCheckout =
    itemsState.payloadSettings.directCheckout || wpshopify.settings.general.directCheckout

  const buyButtonWrapperCSS = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  `

  function isHidingControls() {
    if (itemsState.payloadSettings.isSingular || isDirectCheckout) {
      return false
    }

    if (
      itemsState.payloadSettings.linkTo === 'shopify' ||
      itemsState.payloadSettings.linkTo === 'wordpress'
    ) {
      return true
    }

    return false
  }

  return usePortal(
    <div css={buyButtonWrapperCSS} className='wps-component-products-buy-button'>
      <FilterHook name='before.product.buyButton' hasHTML={true} args={[productState]} />

      <ProductBuyButtonProvider productState={productState}>
        {productState.payload.availableForSale ? (
          <>
            {itemsState.payloadSettings.hideQuantity === false && !isHidingControls() && (
              <ProductQuantity
                addedToCart={productState.addedToCart}
                minQuantity={itemsState.payloadSettings.minQuantity}
                maxQuantity={itemsState.payloadSettings.maxQuantity}
                showLabel={itemsState.payloadSettings.showQuantityLabel}
                labelText={itemsState.payloadSettings.quantityLabelText}
              />
            )}
            {productState.hasManyVariants && !isHidingControls() && (
              <ProductOptions
                variantStyle={itemsState.payloadSettings.variantStyle}
                availableOptions={onlyAvailableOptionsFromVariants(productState.payload.variants)}
              />
            )}
            <ProductAddButton
              addedToCart={productState.addedToCart}
              isTouched={productState.isTouched}
              hasLink={productState.hasLink}
              payload={productState.payload}
              linkTarget={itemsState.payloadSettings.linkTarget}
              linkTo={itemsState.payloadSettings.linkTo}
              addToCartButtonColor={itemsState.payloadSettings.addToCartButtonColor}
              isDirectCheckout={isDirectCheckout}
              hasManyVariants={productState.hasManyVariants}
              productDispatch={productDispatch}
              buttonText={getButtonText(itemsState.payloadSettings, isDirectCheckout)}
              selectedVariant={productState.selectedVariant}
            />
          </>
        ) : (
          <FilterHook
            name='products.buyButton.unavailable.html'
            hasHTML={true}
            args={[productState]}>
            <Notice status='warning' isDismissible={false}>
              <FilterHook name='notice.unavailable.text'>
                {wp.i18n.__('Out of stock', 'wpshopify')}
              </FilterHook>
            </Notice>
          </FilterHook>
        )}
      </ProductBuyButtonProvider>

      <FilterHook name='after.product.buyButton' hasHTML={true} args={[productState]} />
    </div>,
    findPortalElement(itemsState.payloadSettings.dropzoneProductBuyButton)
  )
}

export { ProductBuyButton }
