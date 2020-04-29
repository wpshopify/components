import { ProductQuantity } from './quantity'
import { ProductOptions } from './options'
import { ProductAddButton } from './add-button'
import { ProductBuyButtonTextNotice } from './notice'
import { ProductBuyButtonProvider } from './_state/provider'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { hasLink } from '../../../../common/settings'
import { findPortalElement, FilterHook, __t } from '../../../../common/utils'
import { getVariantInventoryManagement } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'

import to from 'await-to-js'
import find from 'lodash/find'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { Notice } = wp.components
const { useContext, useState, useEffect } = wp.element

function ProductBuyButton() {
  console.log('<ProductBuyButton> :: Render Start')

  const [status, setStatus] = useState('idle')
  const [quantityLeft, setQuantityLeft] = useState(false)
  const [variantInventory, setVariantInventory] = useState(false)
  const [itemsState] = useContext(ItemsContext)
  const [productState] = useContext(ProductContext)

  const buyButtonWrapperCSS = css`
    display: flex;
    flex-direction: column;
  `

  function getVariantIds(items) {
    if (!items.length) {
      return []
    }

    return items.map((item) => item.variants.map((v) => v.id)).flat()
  }

  function sanitizeInventoryResponse(response) {
    return response.data.map((variant) => {
      return {
        id: btoa(variant.id),
        tracked: variant.inventoryItem.tracked,
        inventoryLevels: variant.inventoryItem.inventoryLevels.edges,
        inventoryPolicy: variant.inventoryPolicy,
      }
    })
  }

  async function fetchVariantInventoryManagement() {
    const variantIs = getVariantIds(itemsState.payload)

    if (!variantIs.length) {
      console.warn('WP Shopify warning: No variant ids found for fetchVariantInventoryManagement')
      return
    }

    setStatus('pending')

    const [error, resp] = await to(getVariantInventoryManagement({ ids: variantIs }))

    if (error || resp.data.type === 'error') {
      setStatus('error')

      if (error) {
        console.error('WP Shopify error: ', error)
      }

      console.error('WP Shopify error: ', resp.data.message)

      return
    }

    var variantInventoryResp = sanitizeInventoryResponse(resp)

    setStatus('resolved')
    setVariantInventory(variantInventoryResp)
  }

  function findAvailableQuantityByLocations(variant) {
    if (variant.inventoryLevels.length === 1) {
      return variant.inventoryLevels[0].node.available
    }

    const varianttwo = variant.inventoryLevels.reduce((accumulator, currentValue) => {
      return accumulator.node.available + currentValue.node.available
    })

    return varianttwo
  }

  function findSelectedVariant(selectedVariantId) {
    return find(variantInventory, { id: selectedVariantId })
  }

  function onMouseEnter() {
    fetchVariantInventoryManagement()
  }

  function findInventoryFromVariantId(selectedVariantId, selectedVariant) {
    if (!variantInventory) {
      return false
    }

    let totalAvailableQuantity = findAvailableQuantityByLocations(selectedVariant)

    if (totalAvailableQuantity > 0 && totalAvailableQuantity < 10) {
      return totalAvailableQuantity
    } else {
      return false
    }
  }

  useEffect(() => {
    console.log('<ProductBuyButton> :: useEffect[productState.selectedVariant]')

    if (!productState.selectedVariant) {
      return
    }

    if (productState.selectedVariant.availableForSale) {
      let selectedVariant = findSelectedVariant(productState.selectedVariant.id)

      if (!selectedVariant) {
        console.warn('WP Shopify warning: could not find selectd variant within <ProductBuyButton>')
        return
      }

      if (!selectedVariant.tracked) {
        return
      }

      if (selectedVariant.inventoryPolicy === 'CONTINUE') {
        return
      }

      var totalAvailableQuantity = findInventoryFromVariantId(
        productState.selectedVariant.id,
        selectedVariant
      )

      if (!totalAvailableQuantity) {
        return
      }

      setQuantityLeft(totalAvailableQuantity)
    }
  }, [productState.selectedVariant])

  return usePortal(
    <div
      css={buyButtonWrapperCSS}
      className='wps-buy-button-wrapper'
      data-wps-component-order='0'
      onMouseEnter={status === 'idle' ? onMouseEnter : null}>
      <FilterHook name='before.product.buyButton' args={[productState]} />

      <ProductBuyButtonProvider productState={productState}>
        {productState.payload.availableForSale ? (
          <>
            {!itemsState.payloadSettings.hideQuantity && !hasLink(itemsState) && (
              <ProductQuantity />
            )}
            {productState.hasManyVariants && !hasLink(itemsState) && (
              <ProductOptions itemsState={itemsState} variants={productState.payload.variants} />
            )}

            <ProductAddButton />
          </>
        ) : (
          <FilterHook
            name='products.buyButton.unavailable.html'
            hasHTML={true}
            args={[productState]}>
            <Notice status='warning' isDismissible={false}>
              <FilterHook name='notice.unavailable.text'>{__t('Out of stock')}</FilterHook>
            </Notice>
          </FilterHook>
        )}

        {quantityLeft && <ProductBuyButtonTextNotice quantityLeft={quantityLeft} />}
      </ProductBuyButtonProvider>

      <FilterHook name='after.product.buyButton' args={[productState]} />
    </div>,
    findPortalElement(productState.element, itemsState.payloadSettings.dropzoneProductBuyButton)
  )
}

export { ProductBuyButton }
