import ProductQuantity from './quantity'
import ProductOptions from './options'
import { ProductAddButton } from './add-button'

import { ProductBuyButtonProvider } from './_state/provider'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { hasLink, getButtonText } from '../../../../common/settings'
import { onlyAvailableOptionsFromVariants } from '../../../../common/variants'
import { findPortalElement, FilterHook } from '../../../../common/utils'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { Notice } = wp.components
const { useContext } = wp.element

function ProductBuyButton() {
  const [itemsState] = useContext(ItemsContext)
  const [productState, productDispatch] = useContext(ProductContext)

  const buyButtonWrapperCSS = css`
    display: flex;
    flex-direction: column;

    > .wps-component-products-add-button {
      margin-top: 20px;
    }
  `

  return usePortal(
    <div css={buyButtonWrapperCSS} className='wps-buy-button-wrapper'>
      <FilterHook name='before.product.buyButton' args={[productState]} />

      <ProductBuyButtonProvider productState={productState}>
        {productState.payload.availableForSale ? (
          <>
            {!itemsState.payloadSettings.hideQuantity && (
              <ProductQuantity
                addedToCart={productState.addedToCart}
                minQuantity={itemsState.payloadSettings.minQuantity}
                maxQuantity={itemsState.payloadSettings.maxQuantity}
                showLabel={itemsState.payloadSettings.showQuantityLabel}
                labelText={itemsState.payloadSettings.quantityLabelText}
              />
            )}
            {productState.hasManyVariants && (
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
              isDirectCheckout={
                itemsState.payloadSettings.directCheckout ||
                wpshopify.settings.general.directCheckout
              }
              hasManyVariants={productState.hasManyVariants}
              productDispatch={productDispatch}
              buttonText={getButtonText(itemsState)}
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

      <FilterHook name='after.product.buyButton' args={[productState]} />
    </div>,
    findPortalElement(productState.element, itemsState.payloadSettings.dropzoneProductBuyButton)
  )
}

export { ProductBuyButton }
